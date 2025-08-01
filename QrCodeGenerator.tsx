import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCodeType, VCardData, WifiData, EmailData, SmsData } from '../../types';
import { DEFAULT_QR_CODE_OPTIONS } from '../../constants';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, User, Settings, Download, Twitter, Facebook, Linkedin } from 'lucide-react';
import { downloadSvg, downloadPng, downloadPdf } from '../../services/downloadService';
import * as Papa from 'papaparse';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { AdPlaceholder } from '../layout/AdPlaceholder';


const QrCodeTypeSelector: React.FC<{ selected: QrCodeType; onSelect: (type: QrCodeType) => void }> = ({ selected, onSelect }) => {
    const types = [
        { id: QrCodeType.URL, icon: Link, label: 'URL' },
        { id: QrCodeType.TEXT, icon: Type, label: 'Text' },
        { id: QrCodeType.EMAIL, icon: Mail, label: 'Email' },
        { id: QrCodeType.PHONE, icon: Phone, label: 'Phone' },
        { id: QrCodeType.SMS, icon: MessageSquare, label: 'SMS' },
        { id: QrCodeType.WIFI, icon: Wifi, label: 'WiFi' },
        { id: QrCodeType.VCARD, icon: User, label: 'VCard' },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {types.map(type => (
                <button
                    key={type.id}
                    onClick={() => onSelect(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${selected === type.id ? 'bg-primary text-white' : 'bg-gray-200 text-secondary hover:bg-gray-300'}`}
                >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                </button>
            ))}
        </div>
    );
};


const QrCodeInput: React.FC<{ type: QrCodeType; onChange: (value: string) => void }> = ({ type, onChange }) => {
    const [vCard, setVCard] = useState<VCardData>({ firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' });
    const [wifi, setWifi] = useState<WifiData>({ ssid: '', encryption: 'WPA', password: '' });
    const [email, setEmail] = useState<EmailData>({ to: '', subject: '', body: '' });
    const [sms, setSms] = useState<SmsData>({ phone: '', message: '' });

    const handleVCardChange = (field: keyof VCardData, value: string) => {
        const newVCard = { ...vCard, [field]: value };
        setVCard(newVCard);
        const vCardString = `BEGIN:VCARD\nVERSION:3.0\nN:${newVCard.lastName};${newVCard.firstName}\nFN:${newVCard.firstName} ${newVCard.lastName}\nORG:${newVCard.company}\nTITLE:${newVCard.title}\nTEL;TYPE=WORK,VOICE:${newVCard.phone}\nEMAIL:${newVCard.email}\nURL:${newVCard.website}\nEND:VCARD`;
        onChange(vCardString);
    };

    const handleWifiChange = (field: keyof WifiData, value: string) => {
        const newWifi = { ...wifi, [field]: value };
        setWifi(newWifi);
        const wifiString = `WIFI:T:${newWifi.encryption};S:${newWifi.ssid};P:${newWifi.password};;`;
        onChange(wifiString);
    };
    
    const handleEmailChange = (field: keyof EmailData, value: string) => {
        const newEmail = { ...email, [field]: value };
        setEmail(newEmail);
        onChange(`mailto:${newEmail.to}?subject=${encodeURIComponent(newEmail.subject)}&body=${encodeURIComponent(newEmail.body)}`);
    };
    
    const handleSmsChange = (field: keyof SmsData, value: string) => {
        const newSms = { ...sms, [field]: value };
        setSms(newSms);
        onChange(`smsto:${newSms.phone}:${encodeURIComponent(newSms.message)}`);
    };

    const inputClasses = "w-full p-3 border rounded-md focus:ring-primary focus:border-primary";

    switch (type) {
        case QrCodeType.URL: return <input type="url" defaultValue="https://pro.com" placeholder="https://example.com" className={inputClasses} onChange={e => onChange(e.target.value)} />;
        case QrCodeType.TEXT: return <textarea placeholder="Enter your text" className={inputClasses} onChange={e => onChange(e.target.value)} />;
        case QrCodeType.PHONE: return <input type="tel" placeholder="Enter phone number" className={inputClasses} onChange={e => onChange(`tel:${e.target.value}`)} />;
        
        case QrCodeType.EMAIL:
            return <div className="space-y-2">
                <input type="email" placeholder="To Email" className={inputClasses} onChange={e => handleEmailChange('to', e.target.value)} />
                <input type="text" placeholder="Subject" className={inputClasses} onChange={e => handleEmailChange('subject', e.target.value)} />
                <textarea placeholder="Message" className={inputClasses} onChange={e => handleEmailChange('body', e.target.value)} />
            </div>;
            
        case QrCodeType.SMS:
            return <div className="space-y-2">
                <input type="tel" placeholder="Phone Number" className={inputClasses} onChange={e => handleSmsChange('phone', e.target.value)} />
                <textarea placeholder="Message" className={inputClasses} onChange={e => handleSmsChange('message', e.target.value)} />
            </div>;

        case QrCodeType.WIFI:
            return <div className="space-y-2">
                <input placeholder="Network Name (SSID)" className={inputClasses} onChange={e => handleWifiChange('ssid', e.target.value)} />
                <select className={inputClasses} value={wifi.encryption} onChange={e => handleWifiChange('encryption', e.target.value as WifiData['encryption'])}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Encryption</option>
                </select>
                <input type="password" placeholder="Password" className={inputClasses} onChange={e => handleWifiChange('password', e.target.value)} />
            </div>;

        case QrCodeType.VCARD:
            return <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input placeholder="First Name" className={inputClasses} onChange={e => handleVCardChange('firstName', e.target.value)} />
                <input placeholder="Last Name" className={inputClasses} onChange={e => handleVCardChange('lastName', e.target.value)} />
                <input type="tel" placeholder="Phone" className={inputClasses + " md:col-span-2"} onChange={e => handleVCardChange('phone', e.target.value)} />
                <input type="email" placeholder="Email" className={inputClasses + " md:col-span-2"} onChange={e => handleVCardChange('email', e.target.value)} />
                <input placeholder="Company" className={inputClasses} onChange={e => handleVCardChange('company', e.target.value)} />
                <input placeholder="Job Title" className={inputClasses} onChange={e => handleVCardChange('title', e.target.value)} />
                <input type="url" placeholder="Website" className={inputClasses + " md:col-span-2"} onChange={e => handleVCardChange('website', e.target.value)} />
            </div>;
            
        default: return <input type="text" placeholder="Enter data" className={inputClasses} onChange={e => onChange(e.target.value)} />;
    }
};

const CustomizationPanel: React.FC<{ options: Omit<any, 'value' | 'type'>, setOptions: (options: any) => void }> = ({ options, setOptions }) => {
    return (
        <details className="mt-4 border-t pt-4">
            <summary className="font-semibold text-dark cursor-pointer flex items-center gap-2"><Settings className="w-5 h-5"/> Customize Design</summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-sm font-medium text-secondary">Dot Color</label>
                    <input type="color" value={options.fgColor} onChange={e => setOptions({ ...options, fgColor: e.target.value })} className="w-full h-10 p-1 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary">Background Color</label>
                    <input type="color" value={options.bgColor === 'transparent' ? '#ffffff' : options.bgColor} onChange={e => setOptions({ ...options, bgColor: e.target.value })} className="w-full h-10 p-1 border rounded-md" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary">Size: {options.size}px</label>
                    <input type="range" min="100" max="1000" step="10" value={options.size} onChange={e => setOptions({ ...options, size: parseInt(e.target.value) })} className="w-full" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary">Error Correction</label>
                    <select value={options.level} onChange={e => setOptions({ ...options, level: e.target.value })} className="w-full p-2 border rounded-md">
                        <option value="L">Low (7%)</option>
                        <option value="M">Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                    </select>
                </div>
            </div>
        </details>
    );
};

export const QrCodeGenerator: React.FC = () => {
    const [options, setOptions] = useState(DEFAULT_QR_CODE_OPTIONS);
    const [bulkData, setBulkData] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const qrContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTypeChange = (type: QrCodeType) => {
        const value = type === QrCodeType.URL ? 'https://pro.com' : '';
        setOptions(prev => ({ ...prev, type, value }));
    };

    const handleDataChange = useCallback((value: string) => {
        setOptions(prev => ({ ...prev, value }));
    }, []);

    const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
        const svgElement = qrContainerRef.current?.querySelector('svg');
        if (!svgElement) return;

        const fileName = `qrcode-${options.type}`;
        if (format === 'svg') downloadSvg(svgElement, fileName);
        if (format === 'png') downloadPng(svgElement, fileName, options.size);
        if (format === 'pdf') downloadPdf(svgElement, fileName, options.size);
    };
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setBulkData(results.data);
                }
            });
        }
    };

    const generateBulkQRs = async () => {
        if (bulkData.length === 0) return;
        setIsProcessing(true);
        const zip = new JSZip();

        for (const [index, row] of bulkData.entries()) {
            const svgElement = document.getElementById(`bulk-qr-${index}`);
            if (svgElement) {
                const svgString = new XMLSerializer().serializeToString(svgElement);
                zip.file(`${row.filename || `qrcode_${index}`}.svg`, svgString);
            }
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'qr-codes.zip');
        setIsProcessing(false);
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Panel: Inputs & Customization */}
                <div>
                    <QrCodeTypeSelector selected={options.type} onSelect={handleTypeChange} />
                    <QrCodeInput type={options.type} onChange={handleDataChange} />
                    <CustomizationPanel options={options} setOptions={setOptions} />
                    <details className="mt-4 border-t pt-4">
                      <summary className="font-semibold text-dark cursor-pointer flex items-center gap-2"><Download className="w-5 h-5"/> Bulk Generation</summary>
                       <div className="mt-4 space-y-4">
                           <p className="text-sm text-secondary">Upload a CSV file with columns 'filename' and 'value' to generate multiple QR codes at once.</p>
                           <input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                           {bulkData.length > 0 && <p className="text-sm">{bulkData.length} rows loaded. Ready to generate.</p>}
                           <button onClick={generateBulkQRs} disabled={bulkData.length === 0 || isProcessing} className="w-full bg-secondary text-white py-2 rounded-md font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-400">
                               {isProcessing ? 'Processing...' : `Generate & Download ${bulkData.length} QR Codes`}
                           </button>
                           {isProcessing && <div className="hidden">{bulkData.map((row, index) => <QRCodeSVG key={index} id={`bulk-qr-${index}`} value={row.value || JSON.stringify(row)} size={256} />)}</div>}
                       </div>
                    </details>
                </div>

                {/* Right Panel: Preview & Download */}
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                    <div ref={qrContainerRef} className="p-4 bg-white shadow-lg rounded-lg">
                         <QRCodeSVG
                            value={options.value}
                            size={Math.min(options.size, 320)} // Cap preview size
                            fgColor={options.fgColor}
                            bgColor={options.bgColor}
                            level={options.level}
                            includeMargin={true}
                        />
                    </div>
                     <div className="my-4 w-full flex justify-center">
                        <AdPlaceholder width={300} height={100} text="Ad - 300x100" />
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                       <div className="flex space-x-2">
                           <button onClick={() => handleDownload('png')} className="flex-1 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-colors">PNG</button>
                           <button onClick={() => handleDownload('svg')} className="flex-1 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">SVG</button>
                           <button onClick={() => handleDownload('pdf')} className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors">PDF</button>
                       </div>
                    </div>
                    <div className="mt-6 w-full max-w-xs">
                        <p className="text-center text-sm font-semibold text-secondary mb-2">Share this tool!</p>
                        <div className="flex justify-center space-x-3">
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check%20out%20this%20free%20QR%20Code%20Generator!`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                                <Twitter className="w-5 h-5 text-secondary" />
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                                <Facebook className="w-5 h-5 text-secondary" />
                            </a>
                             <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=Free%20QR%20Code%20Generator&summary=Create%20custom%20QR%20codes%20for%20free!`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                                <Linkedin className="w-5 h-5 text-secondary" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};