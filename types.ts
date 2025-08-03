
export enum QrCodeType {
  URL = 'url',
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  SMS = 'sms',
  WIFI = 'wifi',
  VCARD = 'vcard',
}

export interface QrCodeOptions {
  value: string;
  type: QrCodeType;
  size: number;
  fgColor: string;
  bgColor: 'transparent' | string;
  level: 'L' | 'M' | 'Q' | 'H';
}

export interface VCardData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    title: string;
    website: string;
}

export interface WifiData {
    ssid: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    password: string;
}

export interface EmailData {
    to: string;
    subject: string;
    body: string;
}

export interface SmsData {
    phone: string;
    message: string;
}
