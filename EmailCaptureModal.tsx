
import React from 'react';
import { X, Mail } from 'lucide-react';

interface EmailCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative transform transition-all duration-300 scale-95 animate-scale-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark mb-2">Save Your QR Codes!</h3>
                    <p className="text-secondary mb-6">
                        Enter your email to save your QR code history and get access to exclusive marketing tips and new features.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="flex-grow p-3 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Sign Up Free
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4">We respect your privacy. No spam.</p>
                </div>
            </div>
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};
