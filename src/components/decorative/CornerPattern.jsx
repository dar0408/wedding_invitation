import React from 'react';

const CornerPattern = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5,5 L45,5 M5,5 L5,45" strokeOpacity="1" />
        <path d="M10,10 L40,10 M10,10 L10,40" strokeOpacity="0.6" />
        <circle cx="5" cy="5" r="2" fill="currentColor" />
        <path d="M45,5 Q65,5 65,25" strokeOpacity="0.8" />
        <path d="M5,45 Q5,65 25,65" strokeOpacity="0.8" />
    </svg>
);

export default CornerPattern;