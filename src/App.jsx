import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, VolumeX, ChevronUp, Play } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import confetti from 'canvas-confetti'; // <--- NEW: High Perf Canvas Library

// Data & Components
import { WEDDING_DATA } from './data/wedding-data';
import Mandala from './components/decorative/Mandala';
import CornerPattern from './components/decorative/CornerPattern';

import IntroSlide from './components/slides/IntroSlide';
import EventSlide from './components/slides/EventSlide';
import OutroSlide from './components/slides/OutroSlide';

export default function App() {
    // --- STATE ---
    const [phase, setPhase] = useState('idle');
    const [countdown, setCountdown] = useState(3);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isPageVisible, setIsPageVisible] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // --- REFS ---
    const tickAudioRef = useRef(null);
    const musicAudioRef = useRef(null);
    const timerRef = useRef(null);
    const startTimestampRef = useRef(0);
    const remainingTimeRef = useRef(0);
    const longPressTimer = useRef(null);
    const touchStartTime = useRef(0);

    // --- MOBILE GESTURE VISUALS ---
    const dragY = useMotionValue(0);
    const dragOpacity = useTransform(dragY, [0, -100], [1, 0]);

    // --- HELPERS ---
    const triggerHaptic = () => { if (navigator.vibrate) navigator.vibrate(10); };

    // --- NEW: HIGH PERFORMANCE CONFETTI ---
    const triggerConfetti = () => {
        const themeColor = getCurrentThemeColor();

        // Fire a "Cannon" of confetti from the bottom
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 }, // Start from bottom
            colors: themeColor, // Theme specific colors
            disableForReducedMotion: true,
            zIndex: 9999, // On top of everything
        });
    };

    const getCurrentThemeColor = () => {
        // Return colors based on current slide theme
        const currentTheme = WEDDING_DATA.events[currentEventIndex]?.theme;
        if (currentTheme === 'haldi') return ['#FFD700', '#FFA500']; // Yellow/Orange
        if (currentTheme === 'mehendi') return ['#2E8B57', '#90EE90']; // Greens
        if (currentTheme === 'sangeet') return ['#FF00FF', '#800080']; // Purples
        return ['#d4af37', '#800020']; // Default Gold/Red
    };

    const performTransition = (callback, delay = 500) => {
        setIsTransitioning(true);
        setTimeout(() => {
            callback();
            setTimeout(() => { setIsTransitioning(false); }, 100);
        }, delay);
    };

    // --- NAVIGATION ---
    const goNext = () => {
        if (currentEventIndex < WEDDING_DATA.events.length - 1) {
            triggerHaptic();
            performTransition(() => setCurrentEventIndex(prev => prev + 1));
        }
    };

    const goPrev = () => {
        if (currentEventIndex > 0) {
            triggerHaptic();
            performTransition(() => setCurrentEventIndex(prev => prev - 1));
        }
    };

    const handleStart = () => {
        triggerHaptic();
        triggerConfetti(); // Celebration burst on start!

        if (tickAudioRef.current) { tickAudioRef.current.volume = 1.0; tickAudioRef.current.play().catch(() => {}); }
        if (musicAudioRef.current) musicAudioRef.current.load();

        setIsTransitioning(true);
        setTimeout(() => {
            setPhase('countdown');
            setIsTransitioning(false);
        }, 200);
    };

    const handleDragEnd = (_, info) => {
        if (info.offset.y < -80) {
            handleStart();
        } else {
            animate(dragY, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
    };

    // --- TOUCH LOGIC ---
    const handlePointerDown = () => {
        if (phase !== 'playing') return;
        const isOutro = WEDDING_DATA.events[currentEventIndex].type === 'outro';
        if (isOutro) return;

        touchStartTime.current = Date.now();
        longPressTimer.current = setTimeout(() => {
            setIsPaused(true);
            triggerHaptic();
        }, 200);
    };

    const handlePointerUp = (e) => {
        if (phase !== 'playing') return;
        if (longPressTimer.current) clearTimeout(longPressTimer.current);
        if (isPaused) { setIsPaused(false); return; }

        const touchDuration = Date.now() - touchStartTime.current;
        if (touchDuration < 200 && !isTransitioning) {
            const screenWidth = window.innerWidth;
            const clickX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX);
            if (clickX < screenWidth * 0.3) goPrev();
            else goNext();
        }
    };

    const handleMapClick = (e, link) => {
        e.stopPropagation();
        triggerHaptic();
        window.open(link, '_blank');
    };

    // --- AUDIO & VISIBILITY ---
    useEffect(() => {
        const handleVisibility = () => setIsPageVisible(!document.hidden);
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    useEffect(() => {
        if (!musicAudioRef.current) return;
        if (musicAudioRef.current.ended) return;

        const shouldPlay = phase === 'playing' && !isPaused && isPageVisible;
        if (shouldPlay) {
            const playPromise = musicAudioRef.current.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
        } else {
            musicAudioRef.current.pause();
        }
    }, [phase, isPaused, isPageVisible]);

    // --- COUNTDOWN ---
    useEffect(() => {
        if (phase === 'countdown') {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                if (tickAudioRef.current) tickAudioRef.current.pause();
                performTransition(() => {
                    setPhase('playing');
                    if (musicAudioRef.current) {
                        musicAudioRef.current.volume = 0.8;
                        musicAudioRef.current.loop = false;
                        musicAudioRef.current.play().catch(() => {});
                    }
                }, 800);
            }
        }
    }, [phase, countdown]);

    // --- AUTO TIMER ---
    useEffect(() => {
        const duration = WEDDING_DATA.events[currentEventIndex].duration || 10000;
        remainingTimeRef.current = duration;
    }, [currentEventIndex]);

    useEffect(() => {
        const isOutro = WEDDING_DATA.events[currentEventIndex]?.type === 'outro';
        const shouldRun = phase === 'playing' && !isPaused && isPageVisible && !isTransitioning && !isOutro;

        if (shouldRun) {
            startTimestampRef.current = Date.now();
            timerRef.current = setTimeout(() => {
                goNext();
            }, remainingTimeRef.current);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (shouldRun) {
                const elapsed = Date.now() - startTimestampRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
            }
        };
    }, [phase, isPaused, isPageVisible, isTransitioning, currentEventIndex]);


    // --- RENDER ---
    const renderSlideContent = () => {
        const data = WEDDING_DATA.events[currentEventIndex];
        if (data.type === 'intro') return <IntroSlide />;
        if (data.type === 'event') return <EventSlide data={data} onMapClick={handleMapClick} />;
        if (data.type === 'outro') return <OutroSlide />;
        return null;
    };

    const containerClasses = `w-full h-full relative transition-all duration-[500ms] ease-in-out ${
        isTransitioning ? 'opacity-0 blur-sm scale-105' : 'opacity-100 blur-0 scale-100'
    }`;

    const isOutro = WEDDING_DATA.events[currentEventIndex]?.type === 'outro';

    return (
        <div
            className="fixed inset-0 bg-[#fdfbf7] font-serif overflow-hidden select-none touch-none w-full h-[100dvh]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onContextMenu={(e) => e.preventDefault()}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Montserrat:wght@300;400;500;600&family=Great+Vibes&display=swap');
                .font-heading { family: 'Rozha One', serif; }
                .font-body { family: 'Montserrat', sans-serif; }
                .font-script { family: 'Great Vibes', cursive; }
                .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
                .pt-safe { padding-top: env(safe-area-inset-top, 20px); }

                @keyframes shimmer-gold { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
                .shimmer-gold { background: linear-gradient(to right, #800020 20%, #d4af37 50%, #800020 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-gold 3s linear infinite; }

                .shimmer-gold-subtle { background: linear-gradient(to right, #800020 0%, #b8860b 50%, #800020 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-gold 4s linear infinite; }
                .shimmer-mehendi-subtle { background: linear-gradient(to right, #064e3b 0%, #047857 50%, #064e3b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-gold 4s linear infinite; }
                .shimmer-haldi-subtle { background: linear-gradient(to right, #78350f 0%, #d97706 50%, #78350f 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-gold 4s linear infinite; }
                .shimmer-sangeet-subtle { background: linear-gradient(to right, #4c1d95 0%, #7c3aed 50%, #4c1d95 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-gold 4s linear infinite; }
            `}</style>

            <audio ref={tickAudioRef} src="/count.wav" preload="auto" />
            <audio ref={musicAudioRef} src="/main_intro.mp3" preload="auto" />

            {phase !== 'playing' && (
                <div className="absolute inset-0 z-0 pointer-events-none bg-[#fdfbf7]">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(212,175,55,0.15)_100%)]"></div>
                </div>
            )}

            {/* --- MUTE CONTROL --- */}
            {phase !== 'idle' && !isOutro && (
                <div className="fixed bottom-safe left-6 z-50 pointer-events-auto">
                    <button
                        onPointerUp={(e) => { e.stopPropagation(); setIsMuted(!isMuted); if(musicAudioRef.current) musicAudioRef.current.muted = !isMuted; }}
                        className="p-3 bg-white/30 backdrop-blur-md rounded-full shimmer-gold border border-[#d4af37]/40 shadow-xl active:scale-95 transition-transform"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>
            )}

            {/* --- NEW: FLOWER SHOWER BUTTON (Clean & High Perf) --- */}
            {phase === 'playing' && !isOutro && (
                <div className="fixed bottom-safe right-6 z-50 pointer-events-auto">
                    <button
                        onPointerUp={(e) => { e.stopPropagation(); triggerHaptic(); triggerConfetti(); }}
                        className="p-3 bg-[#800020] backdrop-blur-md rounded-full text-[#d4af37] border border-[#d4af37] shadow-xl active:scale-95 transition-transform"
                    >
                        {/* Simple Star/Sparkle Icon instead of Flower */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </button>
                </div>
            )}

            <div className={containerClasses}>
                {phase === 'idle' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-6">
                        <Tilt
                            gyroscope={true} tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1.02}
                            glareEnable={true} glareMaxOpacity={0.4} glareColor="#ffffff" glarePosition="all"
                            className="w-full max-w-md relative z-10"
                        >
                            <div className="w-full bg-white/70 backdrop-blur-sm border-[1.5px] border-[#d4af37] p-1 shadow-2xl rounded-sm">
                                <div className="border border-[#d4af37]/30 p-8 flex flex-col items-center justify-center relative h-[70vh] bg-[#fffcf5]">
                                    <CornerPattern className="absolute top-2 left-2 w-16 h-16 text-[#d4af37]" />
                                    <CornerPattern className="absolute top-2 right-2 w-16 h-16 text-[#d4af37] transform scale-x-[-1]" />
                                    <CornerPattern className="absolute bottom-2 left-2 w-16 h-16 text-[#d4af37] transform scale-y-[-1]" />
                                    <CornerPattern className="absolute bottom-2 right-2 w-16 h-16 text-[#d4af37] transform scale-[-1]" />
                                    <div className="text-sm animate-pulse opacity-90 uppercase tracking-widest font-bold mb-8 shimmer-gold">!! राधे राधे !!</div>
                                    <div className="space-y-6 z-20 text-center">
                                        <h1 className="font-heading text-5xl md:text-7xl shimmer-gold drop-shadow-sm tracking-wide leading-tight">{WEDDING_DATA.couple.bride}</h1>
                                        <div className="flex items-center justify-center gap-4 opacity-80">
                                            <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                                            <Heart size={24} className="text-[#800020] fill-current animate-pulse" />
                                            <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                                        </div>
                                        <h1 className="font-heading text-5xl md:text-7xl shimmer-gold drop-shadow-sm tracking-wide leading-tight">{WEDDING_DATA.couple.groom.split(' ')[0]}</h1>
                                    </div>
                                    <div className="mt-12 space-y-2 uppercase tracking-[0.2em] text-xs font-bold text-center shimmer-gold opacity-80">
                                        <p>{WEDDING_DATA.coverDate}</p>
                                        <p>{WEDDING_DATA.coverLocation}</p>
                                    </div>
                                </div>
                            </div>
                        </Tilt>

                        <motion.div
                            className="absolute bottom-10 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing z-30"
                            style={{ y: dragY, opacity: dragOpacity }}
                            drag="y" dragConstraints={{ top: -250, bottom: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd}
                            onClick={(e) => { e.stopPropagation(); handleStart(); }}
                        >
                            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center opacity-70">
                                <ChevronUp className="shimmer-gold w-6 h-6" />
                                <p className="shimmer-gold text-[10px] uppercase tracking-[0.2em] font-bold">Slide Up or Tap</p>
                            </motion.div>
                            <div className="w-16 h-16 mt-2 rounded-full bg-[#800020] border-4 border-[#d4af37] shadow-xl flex items-center justify-center relative cursor-pointer active:scale-90 transition-transform">
                                <Play className="text-[#d4af37] fill-current ml-1" size={24} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {phase === 'countdown' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#fdfbf7]">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <Mandala className="w-[120vw] h-[120vw] text-[#d4af37] animate-[spin_10s_linear_infinite]" />
                        </div>
                        <div className="relative z-10 text-center space-y-12 px-6">
                            <h2 className="font-heading text-3xl md:text-4xl leading-normal shimmer-gold drop-shadow-sm">"Get Ready"</h2>
                            <div className="relative flex justify-center items-center">
                                <div className="absolute w-40 h-40 border-2 border-[#d4af37]/30 rounded-full animate-ping"></div>
                                <div className="text-[8rem] font-heading font-bold shimmer-gold leading-none drop-shadow-sm">{countdown}</div>
                            </div>
                        </div>
                    </div>
                )}

                {phase === 'playing' && (
                    <div className="w-full h-full relative overflow-hidden flex flex-col bg-[#fdfbf7]">
                        <div className="flex-grow relative">
                            {renderSlideContent()}
                        </div>

                        {/* PAUSE OVERLAY */}
                        {isPaused && !isOutro && (
                            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/20 backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-[#fdfbf7] px-8 py-3 rounded-full shadow-2xl border border-[#d4af37]/50 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#800020] rounded-full"></div>
                                    <div className="w-2 h-8 bg-[#800020] rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}