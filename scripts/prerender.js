// scripts/prerender.js - Generate static HTML for important routes
import fs from 'fs';
import path from 'path';

const routes = [
  {
    path: '/',
    title: 'Free QR Code Generator - Create WiFi, vCard, Business Card QR Codes | QR Pro Generator',
    description: 'Generate unlimited free QR codes for URLs, WiFi, business cards, restaurants & more. Customize colors, add logos, download PNG/SVG/PDF. No registration required - 1M+ codes created!',
  },
  {
    path: '/wifi-qr-generator',
    title: 'Free WiFi QR Code Generator - Share WiFi Passwords Instantly | QR Pro Generator',
    description: 'Create free WiFi QR codes to share network passwords instantly. Secure, easy setup for restaurants, offices, homes. No app required - works on all devices.',
  },
  {
    path: '/business-card-qr-generator',
    title: 'Free Business Card QR Code Generator - vCard QR Codes | QR Pro Generator',
    description: 'Create free vCard QR codes for digital business cards. Share contact info instantly - name, phone, email, company. Professional networking made easy.',
  },
  {
    path: '/restaurant-menu-qr',
    title: 'Free Restaurant Menu QR Code Generator - Contactless Dining | QR Pro Generator',
    description: 'Create free restaurant menu QR codes for contactless dining. Perfect for cafes, restaurants, bars. Safe, hygienic, and modern dining experience.',
  },
  {
    path: '/bulk-qr-generator',
    title: 'Free Bulk QR Code Generator - Generate Hundreds from CSV | QR Pro Generator',
    description: 'Generate hundreds of QR codes at once from CSV files. Perfect for inventory, events, marketing campaigns. Free bulk QR code generator for businesses.',
  }
];

function generateHTML(route) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="https://qr-pro-generator.com${route.path}" />
    
    <!-- Your other meta tags here -->
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="https://qr-pro-generator.com${route.path}" />
    
    <!-- Include your CSS and other head content -->
</head>
<body>
    <div id="root">
        <!-- Static content for bots -->
        <div style="text-align: center; padding: 50px;">
            <h1>${route.title.split(' - ')[0]}</h1>
            <p>${route.description}</p>
            <p>Loading interactive QR code generator...</p>
        </div>
    </div>
    <!-- Your React app script -->
    <script type="module" src="/main.tsx"></script>
</body>
</html>`;
}

// Generate HTML files for each route
routes.forEach(route => {
  const dir = route.path === '/' ? 'dist' : `dist${route.path}`;
  const filePath = route.path === '/' ? 'dist/index.html' : `${dir}/index.html`;
  
  if (route.path !== '/') {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, generateHTML(route));
  console.log(`Generated: ${filePath}`);
});

console.log('Prerendering complete!');
