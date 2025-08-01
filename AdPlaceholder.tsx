
import React from 'react';

interface AdPlaceholderProps {
    width: number;
    height: number;
    text: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ width, height, text }) => {
    return (
        <div 
            className="bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center rounded-md"
            style={{ width: '100%', maxWidth: `${width}px`, height: `${height}px` }}
        >
            <span className="text-gray-500 text-sm">{text}</span>
        </div>
    );
};
