import React from 'react';

export const UseCases: React.FC = () => {
    const useCases = [
        { industry: "Restaurants", use: "Digital menus & reviews" },
        { industry: "Retail", use: "Product info & promotions" },
        { industry: "Events", use: "Check-ins & schedules" },
        { industry: "Education", use: "Learning resources" },
        { industry: "Real Estate", use: "Property listings" },
        { industry: "Healthcare", use: "Patient information" }
    ];

    return (
        <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">
                🚀 Popular Use Cases
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {useCases.map((useCase, index) => (
                    <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <h4 className="font-semibold text-primary text-sm">{useCase.industry}</h4>
                        <p className="text-secondary text-xs mt-1">{useCase.use}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
