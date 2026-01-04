import React from 'react';
import { Sparkles, Clock, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { THEMES } from '../../data/theme-config';

export default function EventSlide({ data, onMapClick }) {
    const theme = THEMES[data.theme];
    const shimmerClass = `shimmer-${data.theme === 'wedding' ? 'gold' : data.theme}-subtle`;

    const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

    return (
        <div className={`w-full h-full relative flex flex-col ${theme.bg}`}>

            {/* VIDEO SECTION */}
            <div className="relative w-full flex-shrink-0 h-[45vh] bg-black group overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" src={data.videoSrc} key={data.id} />
                <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[${theme.bg}] to-transparent`}></div>

                {/* DATE BADGE */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md shadow-xl px-3 py-2 rounded-xl text-center border border-white/50 z-20"
                >
                    <p className={`text-[10px] font-bold uppercase ${shimmerClass} tracking-widest`}>{data.date.split(' ')[0]}</p>
                    <p className={`text-lg font-heading ${shimmerClass} font-bold`}>{data.date.split(' ')[1].replace(',', '')}</p>
                </motion.div>
            </div>

            {/* CARD SECTION */}
            <div className="flex-grow flex flex-col w-full relative z-10 -mt-12 overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="bg-white/95 backdrop-blur-xl w-full h-full rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-white/60 flex flex-col"
                >
                    {/* SCROLL CONTAINER */}
                    <div className="w-full h-full overflow-y-auto scrollbar-hide">
                        {/* CHANGED: 'justify-evenly' spreads items nicely to fill gaps.
                           'min-h-full' forces it to use the full height available.
                        */}
                        <div className="min-h-full flex flex-col items-center justify-evenly p-6 pb-20">

                            {/* TOP GROUP: Badge + Title + Desc */}
                            <div className="flex flex-col items-center space-y-4 w-full">
                                {/* BADGE */}
                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.iconBg} ${shimmerClass} text-[10px] font-bold tracking-widest uppercase shadow-sm`}>
                                    <Sparkles size={12} /> Celebration
                                </div>

                                {/* TITLE */}
                                <h2 className={`font-heading text-3xl ${shimmerClass} leading-tight text-center font-bold`}>{data.title}</h2>

                                {/* DESCRIPTION */}
                                <p className={`font-body ${shimmerClass} text-sm italic leading-relaxed max-w-xs text-center opacity-90`}>
                                    {data.description}
                                </p>
                            </div>

                            {/* DECORATIVE DIVIDER */}
                            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent my-2 opacity-50"></div>

                            {/* BOTTOM GROUP: Details (Increased padding to p-4 to look chunkier/fuller) */}
                            <div className="w-full space-y-4 max-w-sm mx-auto">
                                {/* TIME */}
                                <div className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className={`p-2.5 rounded-full ${theme.iconBg} ${shimmerClass}`}><Clock size={20} /></div>
                                    <div className="text-left">
                                        <p className={`text-[10px] uppercase ${shimmerClass} opacity-60 font-bold`}>Time</p>
                                        <p className={`font-medium text-base ${shimmerClass} font-bold`}>{data.time}</p>
                                    </div>
                                </div>

                                {/* VENUE */}
                                <div onClick={(e) => onMapClick(e, data.mapLink)} className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform cursor-pointer">
                                    <div className={`p-2.5 rounded-full ${theme.iconBg} ${shimmerClass}`}><MapPin size={20} /></div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className={`text-[10px] uppercase ${shimmerClass} opacity-60 font-bold flex items-center gap-1`}>Venue <ExternalLink size={10} /></p>
                                        <p className={`font-medium text-base ${shimmerClass} truncate font-bold`}>{data.venue}</p>
                                    </div>
                                    <div className={`${shimmerClass} opacity-50`}><Navigation size={18} /></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}