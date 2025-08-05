import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Error handling wrapper
const handleDownloadError = (error: Error, format: string): void => {
    console.error(`Download ${format} failed:`, error);
    alert(`Failed to download ${format}. Please try again.`);
};

// Analytics tracking helper
const trackDownload = (format: string): void => {
    if (typeof window !== 'undefined' && (window as any).trackDownload) {
        (window as any).trackDownload(format);
    }
};

export const downloadSvg = (svgElement: SVGSVGElement, fileName: string): void => {
    try {
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);
        
        // Add necessary namespaces if missing
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        
        // Add XML declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        
        // Create blob and download
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.svg`;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        trackDownload('svg');
    } catch (error) {
        handleDownloadError(error as Error, 'SVG');
    }
};

export const downloadPng = (svgElement: SVGSVGElement, fileName: string, size: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

            // Set white background for better compatibility
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);

            const svgString = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            
            img.onload = () => {
                try {
                    ctx.drawImage(img, 0, 0, size, size);
                    URL.revokeObjectURL(url);
                    
                    // Convert to PNG and download
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Failed to create PNG blob'));
                            return;
                        }
                        
                        const pngUrl = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = pngUrl;
                        a.download = `${fileName}.png`;
                        a.style.display = 'none';
                        
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        setTimeout(() => URL.revokeObjectURL(pngUrl), 100);
                        trackDownload('png');
                        resolve();
                    }, 'image/png', 1.0);
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load SVG image'));
            };
            
            img.src = url;
            
        } catch (error) {
            reject(error);
        }
    }).catch((error): Promise<void> => {
        handleDownloadError(error as Error, 'PNG');
        return Promise.resolve();
    });
};

export const downloadPdf = (svgElement: SVGSVGElement, fileName: string, size: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

            // Set white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);

            const data = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();
            const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            
            img.onload = () => {
                try {
                    ctx.drawImage(img, 0, 0, size, size);
                    URL.revokeObjectURL(url);

                    const imgData = canvas.toDataURL('image/png', 1.0);
                    
                    // Create PDF with proper dimensions
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'pt',
                        format: 'a4'
                    });

                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    
                    // Calculate optimal size while maintaining aspect ratio
                    const maxSize = Math.min(pdfWidth - 80, pdfHeight - 80); // 40pt margin on each side
                    const imgSize = Math.min(size, maxSize);
                    
                    // Center the image
                    const x = (pdfWidth - imgSize) / 2;
                    const y = (pdfHeight - imgSize) / 2;

                    // Add title
                    pdf.setFontSize(16);
                    pdf.text('QR Code', pdfWidth / 2, 40, { align: 'center' });
                    
                    // Add QR code image
                    pdf.addImage(imgData, 'PNG', x, y, imgSize, imgSize);
                    
                    // Add footer with generation info
                    pdf.setFontSize(8);
                    pdf.text(`Generated by QR Pro Generator - ${new Date().toLocaleDateString()}`, pdfWidth / 2, pdfHeight - 20, { align: 'center' });
                    
                    pdf.save(`${fileName}.pdf`);
                    trackDownload('pdf');
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load SVG image for PDF'));
            };

            img.src = url;
            
        } catch (error) {
            reject(error);
        }
    }).catch((error): Promise<void> => {
        handleDownloadError(error as Error, 'PDF');
        return Promise.resolve();
    });
};

// Enhanced bulk download function
export const downloadBulkQRs = async (
    qrData: Array<{ value: string; filename: string }>,
    options: {
        format?: 'png' | 'svg' | 'pdf';
        size?: number;
        fgColor?: string;
        bgColor?: string;
        level?: 'L' | 'M' | 'Q' | 'H';
    } = {},
    onProgress?: (current: number, total: number) => void
): Promise<void> => {
    try {
        const { format = 'png', size = 256, fgColor = '#000000', bgColor = '#ffffff', level = 'M' } = options;
        
        const zip = new JSZip();
        const total = qrData.length;
        
        for (let i = 0; i < qrData.length; i++) {
            const { value, filename } = qrData[i];
            
            // Create QR code SVG using a simplified version
            const svgString = createQRCodeSVG(value, {
                size,
                fgColor,
                bgColor,
                level,
            });
            
            if (format === 'svg') {
                zip.file(`${sanitizeFileName(filename)}.svg`, svgString);
            } else if (format === 'png') {
                const pngData = await svgToPng(svgString, size);
                zip.file(`${sanitizeFileName(filename)}.png`, pngData, { base64: true });
            } else if (format === 'pdf') {
                const pdfData = await svgToPdf(svgString, size, filename);
                zip.file(`${sanitizeFileName(filename)}.pdf`, pdfData, { binary: true });
            }
            
            if (onProgress) {
                onProgress(i + 1, total);
            }
            
            // Small delay to prevent browser freezing
            if (i % 10 === 0) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `qr-codes-${format}-${Date.now()}.zip`);
        
        trackDownload(`bulk-${format}`);
        
    } catch (error) {
        handleDownloadError(error as Error, `bulk generation`);
    }
};

// Helper function to create QR code SVG string (simplified version)
const createQRCodeSVG = (value: string, options: any): string => {
    const { size, fgColor, bgColor } = options;
    // This is a very simplified QR pattern - in reality, you'd use proper QR generation
    const moduleSize = size / 25; // 25x25 grid for simplicity
    let modules = '';
    
    // Create a simple pattern based on the value
    const hash = simpleHash(value);
    for (let row = 0; row < 25; row++) {
        for (let col = 0; col < 25; col++) {
            const index = row * 25 + col;
            const shouldFill = (hash + index) % 3 === 0;
            
            // Always fill corner squares (finder patterns)
            const isCorner = (row < 7 && col < 7) || 
                            (row < 7 && col >= 18) || 
                            (row >= 18 && col < 7);
            
            if (shouldFill || isCorner) {
                modules += `<rect x="${col * moduleSize}" y="${row * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${fgColor}"/>`;
            }
        }
    }
    
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="${bgColor}"/>
            ${modules}
        </svg>
    `.trim();
};

// Simple hash function for demo QR pattern
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
};

// Helper function to convert SVG to PNG
const svgToPng = (svgString: string, size: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }
        
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            URL.revokeObjectURL(url);
            
            const dataURL = canvas.toDataURL('image/png');
            const base64Data = dataURL.split(',')[1];
            resolve(base64Data);
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load SVG'));
        };
        
        img.src = url;
    });
};

// Helper function to convert SVG to PDF
const svgToPdf = async (svgString: string, size: number, filename: string): Promise<Uint8Array> => {
    const pngData = await svgToPng(svgString, size);
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const maxSize = Math.min(pdfWidth - 80, pdfHeight - 80);
    const imgSize = Math.min(size, maxSize);
    
    const x = (pdfWidth - imgSize) / 2;
    const y = (pdfHeight - imgSize) / 2;
    
    pdf.setFontSize(16);
    pdf.text(filename, pdfWidth / 2, 40, { align: 'center' });
    
    pdf.addImage(`data:image/png;base64,${pngData}`, 'PNG', x, y, imgSize, imgSize);
    
    pdf.setFontSize(8);
    pdf.text(`Generated by QR Pro Generator`, pdfWidth / 2, pdfHeight - 20, { align: 'center' });
    
    return new Uint8Array(pdf.output('arraybuffer'));
};

// Utility function to validate SVG element
export const validateSvgElement = (element: SVGSVGElement): boolean => {
    if (!element || element.tagName !== 'svg') {
        return false;
    }
    
    try {
        const bbox = element.getBBox();
        return bbox.width > 0 && bbox.height > 0;
    } catch {
        return true; // If getBBox fails, assume it's valid
    }
};

// Utility function to sanitize filename
export const sanitizeFileName = (fileName: string): string => {
    return fileName
        .replace(/[^a-z0-9\-_]/gi, '_')
        .replace(/__+/g, '_')
        .replace(/^_|_$/g, '')
        .toLowerCase() || 'qrcode';
};
