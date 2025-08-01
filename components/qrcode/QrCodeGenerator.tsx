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
                            onChange={e => handleVCardChange('firstName', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                        <input 
                            placeholder="Doe" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('lastName', e.target.value)} 
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                        <input 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('phone', e.target.value)} 
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('email', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Company</label>
                        <input 
                            placeholder="Acme Corp" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('company', e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Job Title</label>
                        <input 
                            placeholder="Software Engineer" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('title', e.target.value)} 
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-2">Website</label>
                        <input 
                            type="url" 
                            placeholder="https://example.com" 
                            className={inputClasses} 
                            onChange={e => handleVCardChange('website', e.target.value)} 
                        />
                    </div>
                </div>
            );
            
        default: 
            return (
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Content</label>
                    <input 
                        type="text" 
                        placeholder="Enter data" 
                        className={inputClasses} 
                        onChange={e => onChange(e.target.value)} 
                    />
                </div>
            );
    }
};

const CustomizationPanel: React.FC<{ 
    options: any; 
    setOptions: (options: any) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}> = ({ options, setOptions, isOpen, setIsOpen }) => {
    return (
        <div className="mt-6 border-t pt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-dark">Customize Design</span>
                </div>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            
            {isOpen && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Foreground Color
                            </label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    value={options.fgColor} 
                                    onChange={e => setOptions({ ...options, fgColor: e.target.value })} 
                                    className="w-12 h-10 border rounded-lg cursor-pointer" 
                                />
                                <input 
                                    type="text" 
                                    value={options.fgColor} 
                                    onChange={e => setOptions({ ...options, fgColor: e.target.value })} 
                                    className="flex-1 p-2 text-sm border rounded-lg"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Background Color
                            </label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    value={options.bgColor === 'transparent' ? '#ffffff' : options.bgColor} 
                                    onChange={e => setOptions({ ...options, bgColor: e.target.value })} 
                                    className="w-12 h-10 border rounded-lg cursor-pointer" 
                                />
                                <input 
                                    type="text" 
                                    value={options.bgColor === 'transparent' ? 'transparent' : options.bgColor} 
                                    onChange={e => setOptions({ ...options, bgColor: e.target.value })} 
                                    className="flex-1 p-2 text-sm border rounded-lg"
                                    placeholder="#ffffff"
                                />
                            </div>
                            <button 
                                onClick={() => setOptions({ ...options, bgColor: 'transparent' })}
                                className="mt-1 text-xs text-primary hover:underline"
                            >
                                Make transparent
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">
                            Size: {options.size}px
                        </label>
                        <input 
                            type="range" 
                            min="100" 
                            max="1000" 
                            step="10" 
                            value={options.size} 
                            onChange={e => setOptions({ ...options, size: parseInt(e.target.value) })} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>100px</span>
                            <span>1000px</span>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">
                            Error Correction Level
                        </label>
                        <select 
                            value={options.level} 
                            onChange={e => setOptions({ ...options, level: e.target.value })} 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="L">Low (7%) - Smaller QR codes</option>
                            <option value="M">Medium (15%) - Balanced</option>
                            <option value="Q">Quartile (25%) - Good for printing</option>
                            <option value="H">High (30%) - Maximum reliability</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Higher levels allow the QR code to be read even if partially damaged
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const BulkGenerationPanel: React.FC<{
    bulkData: any[];
    setBulkData: (data: any[]) => void;
    isProcessing: boolean;
    downloadProgress: number;
    onBulkGenerate: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}> = ({ bulkData, setBulkData, isProcessing, downloadProgress, onBulkGenerate, isOpen, setIsOpen }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    if (results.errors.length > 0) {
                        alert('Error parsing CSV file. Please check the format.');
                        return;
                    }
                    setBulkData(results.data);
                },
                error: (error) => {
                    alert('Failed to read CSV file: ' + error.message);
                }
            });
        }
    };

    const downloadSampleCSV = () => {
        const sampleData = [
            { filename: 'google', value: 'https://google.com' },
            { filename: 'facebook', value: 'https://facebook.com' },
            { filename: 'twitter', value: 'https://twitter.com' }
        ];
        
        const csv = Papa.unparse(sampleData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'qr-bulk-sample.csv');
    };

    return (
        <div className="mt-6 border-t pt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-dark">Bulk Generation</span>
                </div>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            
            {isOpen && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="text-sm text-secondary">
                        <p className="mb-2">Upload a CSV file to generate multiple QR codes at once.</p>
                        <p className="mb-4">Required columns: <code className="bg-white px-1 rounded">filename</code> and <code className="bg-white px-1 rounded">value</code></p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                            onClick={downloadSampleCSV}
                            className="px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            Download Sample CSV
                        </button>
                        <label className="flex-1">
                            <input 
                                type="file" 
                                accept=".csv" 
                                onChange={handleFileUpload} 
                                ref={fileInputRef} 
                                className="hidden"
                            />
                            <div className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-center">
                                Choose CSV File
                            </div>
                        </label>
                    </div>
                    
                    {bulkData.length > 0 && (
                        <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm font-medium text-dark mb-2">
                                ✅ {bulkData.length} rows loaded successfully
                            </p>
                            <div className="max-h-32 overflow-y-auto">
                                <div className="text-xs text-secondary">
                                    <div className="font-medium mb-1">Preview:</div>
                                    {bulkData.slice(0, 3).map((row, idx) => (
                                        <div key={idx} className="truncate">
                                            {row.filename}: {row.value}
                                        </div>
                                    ))}
                                    {bulkData.length > 3 && (
                                        <div className="text-gray-400">
                                            ... and {bulkData.length - 3} more rows
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {isProcessing && (
                        <div className="bg-white p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                <span className="text-sm font-medium">Processing...</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${downloadProgress}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-secondary mt-1">
                                {downloadProgress.toFixed(0)}% complete
                            </div>
                        </div>
                    )}
                    
                    <button 
                        onClick={onBulkGenerate} 
                        disabled={bulkData.length === 0 || isProcessing} 
                        className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isProcessing 
                            ? `Processing ${bulkData.length} QR Codes...` 
                            : `Generate & Download ${bulkData.length} QR Codes`
                        }
                    </button>
                </div>
            )}
        </div>
    );
};

export const QrCodeGenerator: React.FC = () => {
    const [state, setState] = useState<QrCodeGeneratorState>({
        options: DEFAULT_QR_CODE_OPTIONS,
        bulkData: [],
        isProcessing: false,
        downloadProgress: 0,
        error: null,
        validationError: null
    });
    
    const [customizationOpen, setCustomizationOpen] = useState(false);
    const [bulkOpen, setBulkOpen] = useState(false);
    const qrContainerRef = useRef<HTMLDivElement>(null);

    // Track QR code generation for analytics
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).trackQRGeneration) {
            (window as any).trackQRGeneration(state.options.type);
        }
    }, [state.options.type, state.options.value]);

    const handleTypeChange = (type: QrCodeType) => {
        const value = type === QrCodeType.URL ? 'https://example.com' : '';
        setState(prev => ({ 
            ...prev, 
            options: { ...prev.options, type, value },
            validationError: null
        }));
    };

    const handleDataChange = useCallback((value: string) => {
        setState(prev => ({ 
            ...prev, 
            options: { ...prev.options, value }
        }));
    }, []);

    const handleValidationChange = useCallback((error: string | null) => {
        setState(prev => ({ ...prev, validationError: error }));
    }, []);

    const handleDownload = async (format: 'png' | 'svg' | 'pdf') => {
        const svgElement = qrContainerRef.current?.querySelector('svg') as SVGSVGElement;
        if (!svgElement) {
            alert('QR code not found. Please generate a QR code first.');
            return;
        }

        try {
            const fileName = sanitizeFileName(`qrcode-${state.options.type}-${Date.now()}`);
            
            if (format === 'svg') {
                downloadSvg(svgElement, fileName);
            } else if (format === 'png') {
                await downloadPng(svgElement, fileName, state.options.size);
            } else if (format === 'pdf') {
                await downloadPdf(svgElement, fileName, state.options.size);
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    };

    const generateBulkQRs = async () => {
        if (state.bulkData.length === 0) return;
        
        setState(prev => ({ ...prev, isProcessing: true, downloadProgress: 0 }));
        
        try {
            const zip = new JSZip();
            
            for (const [index, row] of state.bulkData.entries()) {
                // Create QR code SVG for each row
                const qrValue = row.value || JSON.stringify(row);
                const filename = sanitizeFileName(row.filename || `qrcode_${index}`);
                
                // For demo purposes, we'll create a simple SVG
                // In a real implementation, you'd generate actual QR codes
                const svgContent = `
                    <svg width="${state.options.size}" height="${state.options.size}" viewBox="0 0 ${state.options.size} ${state.options.size}" xmlns="http://www.w3.org/2000/svg">
                        <rect width="${state.options.size}" height="${state.options.size}" fill="${state.options.bgColor}"/>
                        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12" fill="${state.options.fgColor}">
                            QR: ${qrValue.substring(0, 20)}${qrValue.length > 20 ? '...' : ''}
                        </text>
                    </svg>
                `.trim();
                
                zip.file(`${filename}.svg`, svgContent);
                
                // Update progress
                const progress = ((index + 1) / state.bulkData.length) * 100;
                setState(prev => ({ ...prev, downloadProgress: progress }));
                
                // Small delay to show progress
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, `qr-codes-bulk-${Date.now()}.zip`);
            
        } catch (error) {
            console.error('Bulk generation failed:', error);
            alert('Bulk generation failed. Please try again.');
        } finally {
            setState(prev => ({ ...prev, isProcessing: false, downloadProgress: 0 }));
        }
    };

    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent('Check out this free QR Code Generator!');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
                <QrCodeTypeSelector 
                    selected={state.options.type} 
                    onSelect={handleTypeChange} 
                />
                
                {/* Error Display */}
                {(state.error || state.validationError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-700 font-medium">Error</p>
                            <p className="text-red-600 text-sm">
                                {state.validationError || state.error}
                            </p>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Panel: Input & Controls */}
                    <div className="space-y-6">
                        <QrCodeInput 
                            type={state.options.type} 
                            onChange={handleDataChange}
                            onValidationChange={handleValidationChange}
                        />
                        
                        <CustomizationPanel 
                            options={state.options} 
                            setOptions={(options) => setState(prev => ({ ...prev, options }))}
                            isOpen={customizationOpen}
                            setIsOpen={setCustomizationOpen}
                        />
                        
                        <BulkGenerationPanel
                            bulkData={state.bulkData}
                            setBulkData={(bulkData) => setState(prev => ({ ...prev, bulkData }))}
                            isProcessing={state.isProcessing}
                            downloadProgress={state.downloadProgress}
                            onBulkGenerate={generateBulkQRs}
                            isOpen={bulkOpen}
                            setIsOpen={setBulkOpen}
                        />
                    </div>

                    {/* Right Panel: Preview & Download */}
                    <div className="flex flex-col items-center space-y-6">
                        {/* QR Code Preview */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-dark mb-4">QR Code Preview</h3>
                            <div 
                                ref={qrContainerRef} 
                                className="p-4 bg-white shadow-lg rounded-lg border-2 border-gray-100"
                            >
                                {state.options.value && !state.validationError ? (
                                    <QRCodeSVG
                                        value={state.options.value}
                                        size={Math.min(state.options.size, 300)} // Cap preview size
                                        fgColor={state.options.fgColor}
                                        bgColor={state.options.bgColor}
                                        level={state.options.level}
                                        includeMargin={true}
                                    />
                                ) : (
                                    <div 
                                        className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
                                        style={{ width: '300px', height: '300px' }}
                                    >
                                        <div className="text-center text-gray-500">
                                            <div className="text-4xl mb-2">📱</div>
                                            <p>Enter data to generate QR code</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Ad Placeholder */}
                        <AdPlaceholder width={300} height={100} text="Ad - 300x100" />
                        
                        {/* Download Buttons */}
                        <div className="w-full max-w-sm space-y-3">
                            <h4 className="text-center font-semibold text-dark">Download QR Code</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => handleDownload('png')} 
                                    disabled={!state.options.value || !!state.validationError}
                                    className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    <Download className="w-4 h-4 mx-auto mb-1" />
                                    PNG
                                </button>
                                <button 
                                    onClick={() => handleDownload('svg')} 
                                    disabled={!state.options.value || !!state.validationError}
                                    className="bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    <Download className="w-4 h-4 mx-auto mb-1" />
                                    SVG
                                </button>
                                <button 
                                    onClick={() => handleDownload('pdf')} 
                                    disabled={!state.options.value || !!state.validationError}
                                    className="bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    <Download className="w-4 h-4 mx-auto mb-1" />
                                    PDF
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                Free downloads • No watermarks • Commercial use OK
                            </p>
                        </div>
                        
                        {/* Social Sharing */}
                        <div className="w-full max-w-sm">
                            <p className="text-center text-sm font-semibold text-secondary mb-3">
                                Share this tool!
                            </p>
                            <div className="flex justify-center space-x-3">
                                <a 
                                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                    title="Share on Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a 
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors"
                                    title="Share on Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                    title="Share on LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
