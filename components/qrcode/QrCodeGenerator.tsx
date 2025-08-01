import React, { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCodeType, VCardData, WifiData, EmailData, SmsData } from '../../types';
import { DEFAULT_QR_CODE_OPTIONS } from '../../constants';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, User, Settings, Download, Twitter, Facebook, Linkedin, AlertCircle } from 'lucide-react';
import { downloadSvg, downloadPng, downloadPdf, sanitizeFileName } from '../../services/downloadService';
import * as Papa from 'papaparse';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { AdPlaceholder } from '../layout/AdPlaceholder';

interface QrCodeGeneratorState {
    options: typeof DEFAULT_QR_CODE_OPTIONS;
    bulkData: any[];
    isProcessing: boolean;
    downloadProgress: number;
    error: string | null;
    validationError: string | null;
}

const QrCodeTypeSelector: React.FC<{ selected: QrCodeType; onSelect: (type: QrCodeType) => void }> = ({ selected, onSelect }) => {
    const types = [
        { id: QrCodeType.URL, icon: Link, label: 'URL', description: 'Website links' },
        { id: QrCodeType.TEXT, icon: Type, label: 'Text', description: 'Plain text' },
        { id: QrCodeType.EMAIL, icon: Mail, label: 'Email', description: 'Email compose' },
        { id: QrCodeType.PHONE, icon: Phone, label: 'Phone', description: 'Phone calls' },
        { id: QrCodeType.SMS, icon: MessageSquare, label: 'SMS', description: 'Text messages' },
        { id: QrCodeType.WIFI, icon: Wifi, label: 'WiFi', description: 'WiFi credentials' },
        { id: QrCodeType.VCARD, icon: User, label: 'vCard', description: 'Contact info' },
    ];

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-3">Choose QR Code Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {types.map(type => (
                    <button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className={`flex flex-col items-center p-3 text-sm font-medium rounded-lg transition-all hover:scale-105 ${
                            selected === type.id 
                                ? 'bg-primary text-white shadow-lg' 
                                : 'bg-gray-100 text-secondary hover:bg-gray-200'
                        }`}
                        title={type.description}
                    >
                        <type.icon className="w-6 h-6 mb-1" />
                        <span>{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const QrCodeInput: React.FC<{ 
    type: QrCodeType; 
    onChange: (value: string) => void;
    onValidationChange: (error: string | null) => void;
}> = ({ type, onChange, onValidationChange }) => {
    const [vCard, setVCard] = useState<VCardData>({ 
        firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' 
    });
    const [wifi, setWifi] = useState<WifiData>({ ssid: '', encryption: 'WPA', password: '' });
    const [email, setEmail] = useState<EmailData>({ to: '', subject: '', body: '' });
    const [sms, setSms] = useState<SmsData>({ phone: '', message: '' });

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,19}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    };

    const handleVCardChange = (field: keyof VCardData, value: string) => {
        const newVCard = { ...vCard, [field]: value };
        setVCard(newVCard);
        
        // Validation
        if (field === 'email' && value && !validateEmail(value)) {
            onValidationChange('Please enter a valid email address');
            return;
        }
        if (field === 'website' && value && !validateUrl(value)) {
            onValidationChange('Please enter a valid website URL (include http:// or https://)');
            return;
        }
        if (field === 'phone' && value && !validatePhone(value)) {
            onValidationChange('Please enter a valid phone number');
            return;
        }
        
        onValidationChange(null);
        
        const vCardString = `BEGIN:VCARD\nVERSION:3.0\nN:${newVCard.lastName};${newVCard.firstName}\nFN:${newVCard.firstName} ${newVCard.lastName}\nORG:${newVCard.company}\nTITLE:${newVCard.title}\nTEL;TYPE=WORK,VOICE:${newVCard.phone}\nEMAIL:${newVCard.email}\nURL:${newVCard.website}\nEND:VCARD`;
        onChange(vCardString);
    };

    const handleWifiChange = (field: keyof WifiData, value: string) => {
        const newWifi = { ...wifi, [field]: value };
        setWifi(newWifi);
        
        // Validation
        if (field === 'ssid' && !value.trim()) {
            onValidationChange('WiFi network name (SSID) is required');
            return;
        }
        
        onValidationChange(null);
        
        const wifiString = `WIFI:T:${newWifi.encryption};S:${newWifi.ssid};P:${newWifi.password};;`;
        onChange(wifiString);
    };
    
    const handleEmailChange = (field: keyof EmailData, value: string) => {
        const newEmail = { ...email, [field]: value };
        setEmail(newEmail);
        
        // Validation
        if (field === 'to' && value && !validateEmail(value)) {
            onValidationChange('Please enter a valid email address');
            return;
        }
        
        onValidationChange(null);
        
        onChange(`mailto:${newEmail.to}?subject=${encodeURIComponent(newEmail.subject)}&body=${encodeURIComponent(newEmail.body)}`);
    };
    
    const handleSmsChange = (field: keyof SmsData, value: string) => {
        const newSms = { ...sms, [field]: value };
        setSms(newSms);
        
        // Validation
        if (field === 'phone' && value && !validatePhone(value)) {
            onValidationChange('Please enter a valid phone number');
            return;
        }
        
        onValidationChange(null);
        
        onChange(`smsto:${newSms.phone}:${encodeURIComponent(newSms.message)}`);
    };

    const handleUrlChange = (value: string) => {
        if (value && !validateUrl(value)) {
            onValidationChange('Please enter a valid URL (include http:// or https://)');
        } else {
            onValidationChange(null);
        }
        onChange(value);
    };

    const handlePhoneChange = (value: string) => {
        if (value && !validatePhone(value)) {
            onValidationChange('Please enter a valid phone number');
        } else {
            onValidationChange(null);
        }
        onChange(`tel:${value}`);
    };

    const inputClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors";

    switch (type) {
        case QrCodeType.URL: 
            return (
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Website URL</label>
                    <input 
                        type="url" 
                        defaultValue="https://example.com" 
                        placeholder="https://example.com" 
                        className={inputClasses} 
                        onChange={e => handleUrlChange(e.target.value)} 
                    />
                    <p className="text-xs text-gray-500 mt-1">Include http:// or https://</p>
                </div>
            );
            
        case QrCodeType.TEXT: 
            return (
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Text Content</label>
                    <textarea 
                        placeholder="Enter your text message here..." 
                        className={inputClasses + " min-h-[100px]"} 
                        onChange={e => onChange(e.target.value)} 
                    />
                    <p className="text-xs text-gray-500 mt-1">Any text up to 2000 characters</p>
                </div>
            );
            
        case QrCodeType.PHONE: 
            return (
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                    <input 
                        type="tel" 
                        placeholder="+1 (555) 123-4567" 
                        className={inputClasses} 
                        onChange={e => handlePhoneChange(e.target.value)} 
                    />
                    <p className="text-xs text-gray-500 mt-1">Include country code for international numbers</p>
                </div>
            );
        
        case QrCodeType.EMAIL:
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Recipient Email</label>
                        <input 
                            type="email" 
                            placeholder="recipient@example.com" 
                            className={inputClasses} 
                            onChange={e => handleEmailChange('to', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Subject (Optional)</label>
                        <input 
                            type="text" 
                            placeholder="Email subject" 
                            className={inputClasses} 
                            onChange={e => handleEmailChange('subject', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Message (Optional)</label>
                        <textarea 
                            placeholder="Email message" 
                            className={inputClasses + " min-h-[80px]"} 
                            onChange={e => handleEmailChange('body', e.target.value)} 
                        />
                    </div>
                </div>
            );
            
        case QrCodeType.SMS:
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                        <input 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            className={inputClasses} 
                            onChange={e => handleSmsChange('phone', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Message (Optional)</label>
                        <textarea 
                            placeholder="Text message" 
                            className={inputClasses + " min-h-[80px]"} 
                            onChange={e => handleSmsChange('message', e.target.value)} 
                        />
                    </div>
                </div>
            );

        case QrCodeType.WIFI:
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Network Name (SSID)</label>
                        <input 
                            placeholder="MyWiFiNetwork" 
                            className={inputClasses} 
                            onChange={e => handleWifiChange('ssid', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Security Type</label>
                        <select 
                            className={inputClasses} 
                            value={wifi.encryption} 
                            onChange={e => handleWifiChange('encryption', e.target.value as WifiData['encryption'])}
                        >
                            <option value="WPA">WPA/WPA2 (Recommended)</option>
                            <option value="WEP">WEP (Legacy)</option>
                            <option value="nopass">No Password</option>
                        </select>
                    </div>
                    {wifi.encryption !== 'nopass' && (
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">Password</label>
                            <input 
                                type="password" 
                                placeholder="WiFi password" 
                                className={inputClasses} 
                                onChange={e => handleWifiChange('password', e.target.value)} 
                            />
                        </div>
                    )}
                </div>
            );

        case QrCodeType.VCARD:
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                        <input 
                            placeholder="John" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('firstName', e.target.value
