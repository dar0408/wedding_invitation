import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../data/wedding-data';

export default function IntroSlide() {
    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <div className="w-full h-full relative flex flex-col bg-[#fffcf5]">
            <div className="relative w-full flex-shrink-0 h-[38vh] bg-black group overflow-hidden">
                <video autoPlay muted playsInline className="w-full h-full object-cover opacity-90" src="/intro.mp4" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fffcf5] to-transparent"></div>
            </div>

            <div className="flex-grow flex flex-col w-full relative z-10 -mt-10">
                <div className="bg-white/90 backdrop-blur-xl w-full h-full rounded-t-[2.5rem] shadow-lg border-t border-white/60 p-5 flex flex-col items-center text-center">
                    <div className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide pb-safe">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff8e1] shimmer-gold text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm">
                            <Sparkles size={12} /> || ॐ श्री गणेशाय नमः ||
                        </div>

                        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 flex-1 flex flex-col justify-center w-full">
                            {/* Grandparents */}
                            <motion.div variants={item} className="space-y-0.5">
                                <p className="font-script shimmer-gold text-base opacity-80">With blessings of grandparents</p>
                                <p className="font-heading shimmer-gold text-xs leading-relaxed font-bold">Late Smt. Surjit Rani & Late Sh. Ratan Lal Salgotra</p>
                            </motion.div>

                            {/* Parents */}
                            <motion.div variants={item} className="space-y-1 bg-[#fffcf5] p-2 rounded-xl border border-[#d4af37]/20 shadow-sm">
                                <h2 className="font-heading text-base shimmer-gold leading-tight font-bold">Smt. Meenu Rani & Sh. Sanjeev Kumar</h2>
                                <p className="font-body shimmer-gold text-[9px] uppercase tracking-wider leading-relaxed opacity-70 mt-0.5">Request the pleasure of your presence at the marriage of their daughter</p>
                            </motion.div>

                            {/* Couple */}
                            <motion.div variants={item} className="space-y-1 py-1">
                                <h1 className="font-heading text-4xl shimmer-gold">{WEDDING_DATA.couple.bride}</h1>
                                <div className="flex items-center justify-center gap-2 opacity-60">
                                    <div className="h-[1px] w-6 bg-[#d4af37]"></div>
                                    <p className="font-script shimmer-gold text-lg">weds</p>
                                    <div className="h-[1px] w-6 bg-[#d4af37]"></div>
                                </div>
                                <h1 className="font-heading text-4xl shimmer-gold">{WEDDING_DATA.couple.groom}</h1>
                            </motion.div>

                            {/* Date */}
                            <motion.div variants={item} className="border-t border-dashed border-[#d4af37]/30 pt-2">
                                <p className="font-heading text-lg shimmer-gold font-bold">{WEDDING_DATA.coverDate}</p>
                                <p className="text-[10px] uppercase tracking-widest shimmer-gold opacity-80">{WEDDING_DATA.coverLocation}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}