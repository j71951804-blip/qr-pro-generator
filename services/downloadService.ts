import { jsPDF } from 'jspdf';

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
    return new Promise((resolve, reject) => {
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
    }).catch((error) => {
        handleDownloadError(error as Error, 'PNG');
    });
};

export const downloadPdf = (svgElement: SVGSVGElement, fileName: string, size: number): Promise<void> => {
    return new Promise((resolve, reject) => {
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
    }).catch((error) => {
        handleDownloadError(error as Error, 'PDF');
    });
};

// Bulk download helper
export const downloadBulkQRs = async (
    qrData: Array<{ value: string; filename: string }>,
    format: 'png' | 'svg' | 'pdf' = 'png',
    size: number = 256,
    onProgress?: (current: number, total: number) => void
): Promise<void> => {
    try {
        const JSZip = (await import('jszip')).default;
        const { saveAs } = await import('file-saver');
        
        const zip = new JSZip();
        
        for (let i = 0; i < qrData.length; i++) {
            const { value, filename } = qrData[i];
            
            // Create temporary SVG element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                    <!-- QR code would be generated here -->
                    <rect width="${size}" height="${size}" fill="white"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12">
                        QR: ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}
                    </text>
                </svg>
            `;
            
            const svgElement = tempDiv.querySelector('svg') as SVGSVGElement;
            
            if (svgElement) {
                if (format === 'svg') {
                    const svgString = new XMLSerializer().serializeToString(svgElement);
                    zip.file(`${filename}.svg`, svgString);
                } else if (format === 'png') {
                    // Convert to PNG
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    
                    if (ctx) {
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, size, size);
                        
                        const pngData = canvas.toDataURL('image/png').split(',')[1];
                        zip.file(`${filename}.png`, pngData, { base64: true });
                    }
                }
            }
            
            if (onProgress) {
                onProgress(i + 1, qrData.length);
            }
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `qr-codes-${format}.zip`);
        
        trackDownload(`bulk-${format}`);
        
    } catch (error) {
        handleDownloadError(error as Error, `bulk ${format}`);
    }
};

// Utility function to validate SVG element
export const validateSvgElement = (element: SVGSVGElement): boolean => {
    if (!element || element.tagName !== 'svg') {
        return false;
    }
    
    const bbox = element.getBBox();
    return bbox.width > 0 && bbox.height > 0;
};

// Utility function to sanitize filename
export const sanitizeFileName = (fileName: string): string => {
    return fileName
        .replace(/[^a-z0-9]/gi, '_')
        .replace(/__+/g, '_')
        .replace(/^_|_$/g, '')
        .toLowerCase();
};
