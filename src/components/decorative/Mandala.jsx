import React from 'react';

const Mandala = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="48" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="38" strokeOpacity="0.2" />
        <path d="M50 2 L50 98 M2 50 L98 50" strokeOpacity="0.2" />
        <path d="M16 16 L84 84 M16 84 L84 16" strokeOpacity="0.2" />
        <path d="M50 10 C 70 10, 70 30, 50 50 C 30 30, 30 10, 50 10" strokeOpacity="0.2" />
        <path d="M50 90 C 70 90, 70 70, 50 50 C 30 70, 30 90, 50 90" strokeOpacity="0.2" />
        <path d="M90 50 C 90 70, 70 70, 50 50 C 70 30, 90 30, 90 50" strokeOpacity="0.2" />
        <path d="M10 50 C 10 70, 30 70, 50 50 C 30 30, 10 30, 10 50" strokeOpacity="0.2" />
    </svg>
);

export default Mandala;