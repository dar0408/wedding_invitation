import React from 'react';
import { Users } from 'lucide-react';
import { WEDDING_DATA } from '../../data/wedding-data';

export default function OutroSlide() {
    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#fffcf5] text-center p-6">
            <div className="relative z-10 w-full max-w-md border border-[#800020]/20 p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl flex flex-col items-center transform transition-transform hover:scale-[1.01]">
                <div className="w-16 h-16 rounded-full bg-[#800020] flex items-center justify-center mb-6 border-4 border-[#d4af37] shadow-lg">
                    <Users className="w-8 h-8 text-[#d4af37]" />
                </div>

                {/* Using subtle shimmer here */}
                <h2 className="font-heading text-4xl shimmer-gold-subtle mb-2 drop-shadow-sm font-bold">With Love</h2>
                <div className="w-12 h-1 bg-[#d4af37] mb-6 rounded-full"></div>

                <div className="space-y-4 text-sm font-body w-full overflow-y-auto max-h-[50vh] pr-1 scrollbar-hide">
                    {WEDDING_DATA.family.map((fam, i) => (
                        <div key={i} className="bg-[#fffcf5]/80 p-3 rounded-xl border border-[#d4af37]/30 shadow-sm flex flex-col items-center mb-2">
                            <p className="shimmer-gold-subtle text-[9px] uppercase tracking-widest font-bold mb-1 opacity-80">{fam.role}</p>
                            <p className="text-base font-heading shimmer-gold-subtle text-center leading-tight font-bold">{fam.names}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button
                        onClick={(e) => { e.stopPropagation(); window.location.reload(); }}
                        className="px-10 py-3 bg-[#800020] text-[#d4af37] font-bold rounded-full uppercase text-xs tracking-widest shadow-xl border border-[#d4af37] active:scale-95 transition-transform"
                    >
                        Replay Invitation
                    </button>
                </div>
            </div>
        </div>
    );
}