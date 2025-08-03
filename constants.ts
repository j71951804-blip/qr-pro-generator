
import { QrCodeOptions, QrCodeType } from './types';

export const DEFAULT_QR_CODE_OPTIONS: QrCodeOptions = {
  value: 'https://pro.com',
  type: QrCodeType.URL,
  size: 300,
  fgColor: '#000000',
  bgColor: '#ffffff',
  level: 'M',
};

export const AFFILIATE_TOOLS = [
  {
    name: 'Pro Web Hosting',
    description: 'Blazing fast hosting for your business website.',
    link: '#',
    logoUrl: 'https://picsum.photos/seed/hosting/40/40'
  },
  {
    name: 'Vistaprint',
    description: 'Professional business cards and marketing materials.',
    link: '#',
    logoUrl: 'https://picsum.photos/seed/vistaprint/40/40'
  },
  {
    name: 'Canva Pro',
    description: 'Create stunning designs for any project.',
    link: '#',
    logoUrl: 'https://picsum.photos/seed/canva/40/40'
  },
  {
    name: 'Mailchimp',
    description: 'Grow your audience with powerful email marketing.',
    link: '#',
    logoUrl: 'https://picsum.photos/seed/mailchimp/40/40'
  }
];
