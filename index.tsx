<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>QR Pro Generator - Free QR Code Maker & Generator</title>
    <meta name="title" content="QR Pro Generator - Free QR Code Maker & Generator" />
    <meta name="description" content="Create free QR codes for URLs, text, WiFi, business cards and more. Download as PNG, SVG, or PDF. Bulk generation available. No registration required." />
    <meta name="keywords" content="QR code generator, free QR maker, QR code creator, bulk QR codes, custom QR codes, WiFi QR, vCard QR, business card QR" />
    <meta name="author" content="QR Pro Generator" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://your-domain.com/" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://your-domain.com/" />
    <meta property="og:title" content="QR Pro Generator - Free QR Code Maker" />
    <meta property="og:description" content="Create free QR codes for URLs, text, WiFi, business cards and more. Download as PNG, SVG, or PDF." />
    <meta property="og:image" content="https://your-domain.com/og-image.png" />
    <meta property="og:site_name" content="QR Pro Generator" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://your-domain.com/" />
    <meta property="twitter:title" content="QR Pro Generator - Free QR Code Maker" />
    <meta property="twitter:description" content="Create free QR codes for URLs, text, WiFi, business cards and more." />
    <meta property="twitter:image" content="https://your-domain.com/twitter-image.png" />
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://cdn.tailwindcss.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Critical CSS -->
    <style>
      /* Tailwind base styles */
      *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
      ::before, ::after { --tw-content: ''; }
      html { line-height: 1.5; -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-feature-settings: normal; font-variation-settings: normal; }
      body { margin: 0; line-height: inherit; }
      
      /* Loading screen */
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #0d6efd;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#0D6EFD',
              secondary: '#6C757D',
              light: '#F8F9FA',
              dark: '#212529',
            },
          },
        },
      }
    </script>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "QR Pro Generator",
      "description": "Free QR code generator for URLs, text, WiFi, business cards and more",
      "url": "https://your-domain.com",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "QR Pro Generator"
      }
    }
    </script>
  </head>
  
  <body class="bg-light">
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading QR Generator...</p>
      </div>
    </div>
    
    <div id="root"></div>
    
    <script>
      // Remove loading screen when app loads
      window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.remove();
          }, 300);
        }
      });
      
      // Error handling
      window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
      });
      
      // Service Worker Registration
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    </script>
    
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
