import React, { useState, useEffect, useRef } from 'react';
import {
    Heart, MapPin, Sparkles,
    Users, Volume2, VolumeX, Clock, ExternalLink, Navigation, Play
} from 'lucide-react';

// ==========================================
// Data Section
// ==========================================
const WEDDING_DATA = {
    couple: {
        bride: "Twinkle",
        groom: "Navjot Singh",
        hashtag: "#TwinkleWedsNavjot"
    },
    // The date displayed on the front cover
    coverDate: "Feb 9th - 10th, 2026",
    coverLocation: "Mustafabad (YNR)",

    // Family details for the "With Love" page (Outro)
    family: [
        { role: "Blessings from Grandparents", names: "Late Smt. Surjit Rani & Late Sh. Ratan Lal Salgotra" },
        { role: "Bride's Parents", names: "Smt. Meenu Rani & Sh. Sanjeev Kumar" },
        { role: "Groom's Parents", names: "Smt. Asha Rani & Sh. Sukhwinder Singh" },
        { role: "R.S.V.P.", names: "Rajinder Kumar, Narender Kumar, Darpan, Anmol, Aditya & Salgotra Family" },
        { role: "Contact", names: "Sh. Sanjeev Kumar: 7988387170" }
    ],

    events: [
        {
            id: 'welcome',
            type: 'intro',
            duration: 6000
        },
        // --- 1. MEHENDI ---
        {
            id: 'mehendi',
            type: 'event',
            title: "Mehendi Ki Raat",
            description: "Hathan te sajau Mehendi, Naam likhau apne Maahi da.",
            date: "Feb 09, 2026",
            time: "4:00 PM",
            venue: "Residence, Saraswati Nagar",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Saraswati+Nagar+Mustafabad",
            theme: "mehendi",
            videoSrc: "/mehendi.mp4",
            duration: 6000
        },
        // --- 2. SANGEET ---
        {
            id: 'sangeet',
            type: 'event',
            title: "Ladies Sangeet (DJ Night)",
            description: "Join us for a night of music and dance at our residence.",
            date: "Feb 09, 2026",
            time: "8:00 PM",
            venue: "Residence, Saraswati Nagar",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Saraswati+Nagar+Mustafabad",
            theme: "sangeet",
            videoSrc: "/dance.mp4",
            duration: 6000
        },
        // --- 3. HALDI ---
        {
            id: 'haldi',
            type: 'event',
            title: "Maiyan & Haldi",
            description: "Shagna di Haldi, Rang Khushiyan da chadhya.",
            date: "Feb 10, 2026",
            time: "8:00 AM",
            venue: "Residence, Saraswati Nagar",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Saraswati+Nagar+Mustafabad",
            theme: "haldi",
            videoSrc: "/haldi.mp4",
            duration: 6000
        },
        // --- 4. WEDDING ---
        {
            id: 'wedding',
            type: 'event',
            title: "Wedding Ceremony",
            description: "Reception of Baraat: 10:00 AM | Lunch: 12:00 Noon | Doli: 4:00 PM",
            date: "Feb 10, 2026",
            time: "10:00 AM",
            venue: "The Royal Garden, Mustafabad",
            mapLink: "https://www.google.com/maps/search/?api=1&query=The+Royal+Garden+Mustafabad",
            theme: "wedding",
            videoSrc: "/varmala.mp4",
            duration: 6000
        },
        {
            id: 'outro',
            type: 'outro',
            duration: 9000
        }
    ]
};

// ==========================================
// 2. THEME CONFIGURATION
// ==========================================
const THEMES = {
    haldi: {
        bg: "bg-[#fffbe6]",
        text: "text-amber-900",
        accent: "text-amber-600",
        border: "border-amber-400",
        iconBg: "bg-amber-100",
    },
    mehendi: {
        bg: "bg-[#f1f8e9]",
        text: "text-emerald-900",
        accent: "text-emerald-700",
        border: "border-emerald-400",
        iconBg: "bg-emerald-100",
    },
    sangeet: {
        bg: "bg-[#f3e5f5]",
        text: "text-purple-900",
        accent: "text-purple-700",
        border: "border-purple-400",
        iconBg: "bg-purple-100",
    },
    wedding: {
        bg: "bg-[#fff0f5]",
        text: "text-rose-900",
        accent: "text-rose-700",
        border: "border-rose-400",
        iconBg: "bg-rose-100",
    },
};

// ==========================================
// 3. DECORATIVE COMPONENTS
// ==========================================
const PetalRain = () => (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
            <div
                key={i}
                className="absolute top-[-20px] text-[#d4af37]/40 animate-fall"
                style={{
                    left: `${Math.random() * 100}%`,
                    animation: `fall ${8 + Math.random() * 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    fontSize: `${Math.random() * 15 + 10}px`
                }}
            >
                ✿
            </div>
        ))}
    </div>
);

const CornerPattern = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5,5 L45,5 M5,5 L5,45" strokeOpacity="1" />
        <path d="M10,10 L40,10 M10,10 L10,40" strokeOpacity="0.6" />
        <circle cx="5" cy="5" r="2" fill="currentColor" />
        <path d="M45,5 Q65,5 65,25" strokeOpacity="0.8" />
        <path d="M5,45 Q5,65 25,65" strokeOpacity="0.8" />
    </svg>
);

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

// ==========================================
// 4. MAIN APPLICATION
// ==========================================
export default function App() {
    const [phase, setPhase] = useState('idle');
    const [countdown, setCountdown] = useState(3);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Transition State - Controls the Blur Effect
    const [isTransitioning, setIsTransitioning] = useState(false);

    // References
    const touchStartTime = useRef(0);
    const tickAudioRef = useRef(null);
    const musicAudioRef = useRef(null);
    const longPressTimer = useRef(null);

    // Timer Logic References
    const timerRef = useRef(null);
    const startTimestampRef = useRef(0);
    const remainingTimeRef = useRef(0);

    // --- TRANSITION HELPER ---
    const performTransition = (callback, delay = 800) => {
        // 1. Start Blur Out
        setIsTransitioning(true);

        // 2. Wait for Blur, then execute callback (change content)
        setTimeout(() => {
            callback();
            // 3. Start Blur In (Reveal)
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }, delay);
    };

    // --- TRANSITION LOGIC (Navigation) ---
    const changeSlide = (newIndex) => {
        if (isTransitioning) return;
        performTransition(() => setCurrentEventIndex(newIndex));
    };

    // --- HANDLER: START BUTTON TAP ---
    const handleStart = () => {
        // 1. Unlock Audio Context on Tap
        if (tickAudioRef.current) tickAudioRef.current.load();
        if (musicAudioRef.current) musicAudioRef.current.load();

        // 2. START AUDIO IMMEDIATELY for perfect sync
        if (tickAudioRef.current) {
            tickAudioRef.current.volume = 1.0;
            tickAudioRef.current.currentTime = 0;
            tickAudioRef.current.play().catch(e => console.log("Audio error", e));
        }

        // 3. QUICKLY SWITCH TO COUNTDOWN (200ms blur)
        setIsTransitioning(true);
        setTimeout(() => {
            setPhase('countdown');
            setIsTransitioning(false);
        }, 200);
    };

    // --- EFFECT: AUDIO PLAY/PAUSE SYNC ---
    useEffect(() => {
        if (!musicAudioRef.current) return;

        if (phase === 'playing') {
            if (isPaused) {
                musicAudioRef.current.pause();
            } else {
                if (!musicAudioRef.current.ended) {
                    const playPromise = musicAudioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => console.log("Playback prevented:", error));
                    }
                }
            }
        }
    }, [isPaused, phase]);

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
        if (phase === 'countdown') {
            if (countdown > 0) {
                // Set to exactly 1000ms (1 second) to match standard audio
                const timer = setTimeout(() => {
                    setCountdown(prev => prev - 1);
                }, 1000);
                return () => clearTimeout(timer);
            }
            // Countdown Finished (0)
            else {
                if (tickAudioRef.current) {
                    tickAudioRef.current.pause();
                    tickAudioRef.current.currentTime = 0;
                }

                performTransition(() => {
                    setPhase('playing');
                    if (musicAudioRef.current) {
                        musicAudioRef.current.volume = 0.8;
                        // Loop false for main song to play ONCE
                        musicAudioRef.current.loop = false;
                        musicAudioRef.current.play().catch(e => console.log("Music Error", e));
                    }
                }, 800);
            }
        }
    }, [phase, countdown]);

    useEffect(() => {
        const duration = WEDDING_DATA.events[currentEventIndex].duration || 10000;
        remainingTimeRef.current = duration;
    }, [currentEventIndex]);

    // Run the timer
    useEffect(() => {
        if (phase === 'playing' && !isPaused && !isTransitioning) {
            startTimestampRef.current = Date.now();

            timerRef.current = setTimeout(() => {
                if (currentEventIndex < WEDDING_DATA.events.length - 1) {
                    changeSlide(currentEventIndex + 1);
                }
            }, remainingTimeRef.current);
        }

        return () => {
            // Cleanup: If we pause or unmount, calculate elapsed time
            if (timerRef.current) clearTimeout(timerRef.current);

            if (phase === 'playing' && !isPaused && !isTransitioning) {
                const elapsed = Date.now() - startTimestampRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
            }
        };
    }, [phase, isPaused, isTransitioning, currentEventIndex]);


    // --- OTHER HANDLERS ---
    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
        if (musicAudioRef.current) musicAudioRef.current.muted = !isMuted;
        if (tickAudioRef.current) tickAudioRef.current.muted = !isMuted;
    };

    // "HOLD TO PAUSE" LOGIC (With Debounce)
    const handlePointerDown = () => {
        if (phase !== 'playing') return;
        touchStartTime.current = Date.now();


        longPressTimer.current = setTimeout(() => {
            setIsPaused(true);
        }, 300);
    };

    const handlePointerUp = (e) => {
        if (phase !== 'playing') return;

        // Clear the long press timer immediately
        if (longPressTimer.current) clearTimeout(longPressTimer.current);

        // If we were paused (held long enough), just resume
        if (isPaused) {
            setIsPaused(false);
            return;
        }

        // If we weren't paused yet, it was a quick tap. Handle navigation.
        const touchDuration = Date.now() - touchStartTime.current;
        if (touchDuration < 250 && !isTransitioning) {
            const screenWidth = window.innerWidth;
            const clickX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);

            if (clickX > screenWidth / 2) {
                if (currentEventIndex < WEDDING_DATA.events.length - 1) changeSlide(currentEventIndex + 1);
            } else {
                if (currentEventIndex > 0) changeSlide(currentEventIndex - 1);
            }
        }
    };

    // --- RENDER CONTENT ---
    const renderSlideContent = () => {
        const data = WEDDING_DATA.events[currentEventIndex];

        // 1. INTRO / WELCOME (Updated to match other slides layout)
        if (data.type === 'intro') {
            return (
                <div key={data.id} className="w-full h-full relative flex flex-col bg-[#fffcf5]">
                    {/* Top Video Section - Reduced height slightly to fit more content */}
                    <div className="relative w-full flex-shrink-0 h-[38vh] bg-black group overflow-hidden">
                        <video
                            autoPlay muted playsInline
                            className="w-full h-full object-cover opacity-90"
                            src="/intro.mp4"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fffcf5] to-transparent"></div>
                    </div>

                    {/* Bottom Card Section */}
                    <div className="flex-grow flex flex-col w-full relative z-10 -mt-10">
                        <div className="bg-white/90 backdrop-blur-xl w-full h-full rounded-t-[2.5rem] shadow-lg border-t border-white/60 p-5 flex flex-col items-center text-center">

                            <div className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide pb-safe">
                                {/* Religious Header */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff8e1] text-[#d4af37] text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm">
                                    <Sparkles size={12} /> || ॐ श्री गणेशाय नमः ||
                                </div>

                                {/* Compact Content */}
                                <div className="space-y-3 flex-1 flex flex-col justify-center w-full">
                                    {/* Grandparents */}
                                    <div className="space-y-0.5">
                                        <p className="font-script text-[#d4af37] text-base">With blessings of grandparents</p>
                                        <p className="font-heading text-[#5c4033] text-xs leading-relaxed">
                                            Late Smt. Surjit Rani & Late Sh. Ratan Lal Salgotra
                                        </p>
                                    </div>

                                    {/* Parents */}
                                    <div className="space-y-1 bg-[#fffcf5] p-2 rounded-xl border border-[#d4af37]/20">
                                        <h2 className="font-heading text-base text-[#800020] leading-tight">
                                            Smt. Meenu Rani & Sh. Sanjeev Kumar
                                        </h2>
                                        <p className="font-body text-[#5c4033] text-[9px] uppercase tracking-wider leading-relaxed opacity-80 mt-0.5">
                                            Request the pleasure of your presence at the marriage of their daughter
                                        </p>
                                    </div>

                                    {/* Couple */}
                                    <div className="space-y-1 py-1">
                                        <h1 className="font-heading text-3xl text-[#800020]">Twinkle</h1>
                                        <div className="flex items-center justify-center gap-2 opacity-60">
                                            <div className="h-[1px] w-6 bg-[#d4af37]"></div>
                                            <p className="font-script text-[#d4af37] text-lg">weds</p>
                                            <div className="h-[1px] w-6 bg-[#d4af37]"></div>
                                        </div>
                                        <h1 className="font-heading text-3xl text-[#800020]">Navjot Singh</h1>
                                    </div>

                                    {/* Date */}
                                    <div className="border-t border-dashed border-[#d4af37]/30 pt-2">
                                        <p className="font-heading text-lg text-[#800020]">{WEDDING_DATA.coverDate}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-[#5c4033]">{WEDDING_DATA.coverLocation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // 2. EVENT SLIDES
        if (data.type === 'event') {
            const theme = THEMES[data.theme];
            return (
                <div key={data.id} className={`w-full h-full relative flex flex-col ${theme.bg}`}>
                    <div className="relative w-full flex-shrink-0 h-[50vh] bg-black group overflow-hidden">
                        <video
                            autoPlay loop muted playsInline
                            className="w-full h-full object-cover opacity-90"
                            src={data.videoSrc}
                            key={data.id}
                        />
                        <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[${theme.bg}] to-transparent`}></div>

                        <div className="absolute top-16 right-6 bg-white/90 backdrop-blur-md shadow-xl px-4 py-3 rounded-xl text-center border border-white/50 animate-pop-in z-20">
                            <p className={`text-[10px] font-bold uppercase ${theme.accent} tracking-widest`}>{data.date.split(' ')[0]}</p>
                            <p className={`text-xl font-heading ${theme.text}`}>{data.date.split(' ')[1].replace(',','')}</p>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col w-full relative z-10 -mt-10">
                        <div className="bg-white/90 backdrop-blur-xl w-full h-full rounded-t-[2.5rem] shadow-lg border-t border-white/60 p-6 flex flex-col items-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.iconBg} ${theme.accent} text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm`}>
                                <Sparkles size={12} /> Celebration
                            </div>
                            <h2 className={`font-heading text-3xl mb-3 ${theme.text} leading-tight text-center`}>{data.title}</h2>
                            <p className="font-body text-slate-600 text-xs italic mb-4 leading-relaxed max-w-sm text-center line-clamp-3">{data.description}</p>

                            <div className="w-full space-y-2 max-w-sm mx-auto mt-auto pb-safe">
                                {/* TIME SECTION */}
                                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className={`p-2.5 rounded-full ${theme.iconBg} ${theme.accent}`}><Clock size={18} /></div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase opacity-60 font-bold">Time</p>
                                        <p className={`font-medium text-sm ${theme.text}`}>{data.time}</p>
                                    </div>
                                </div>

                                {/* LOCATION SECTION */}
                                <a href={data.mapLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                                    <div className={`p-2.5 rounded-full ${theme.iconBg} ${theme.accent}`}><MapPin size={18} /></div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="text-[10px] uppercase opacity-60 font-bold flex items-center gap-1">Venue <ExternalLink size={10}/></p>
                                        <p className={`font-medium text-sm ${theme.text} truncate`}>{data.venue}</p>
                                    </div>
                                    <div className={`${theme.accent} opacity-50`}><Navigation size={16} /></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // 3. OUTRO SLIDE
        if (data.type === 'outro') {
            return (
                <div key="outro" className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#f3e5b5] to-[#ebd8a0] text-center p-6">
                    <PetalRain />

                    <div className="relative z-10 w-full max-w-md border border-[#800020]/20 p-8 rounded-3xl bg-white/60 backdrop-blur-md shadow-2xl flex flex-col items-center transform transition-transform hover:scale-[1.01]">
                        <div className="w-16 h-16 rounded-full bg-[#800020] flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                            <Users className="w-8 h-8 text-[#f3e5b5]" />
                        </div>

                        <h2 className="font-heading text-4xl text-[#800020] mb-2 drop-shadow-sm">With Love</h2>
                        <div className="w-12 h-1 bg-[#800020] mb-6 rounded-full"></div>

                        <div className="space-y-4 text-sm font-body w-full overflow-y-auto max-h-[50vh] pr-1 scrollbar-hide">
                            {WEDDING_DATA.family.map((fam, i) => (
                                <div key={i} className="bg-[#fffcf5] p-3 rounded-xl border border-[#d4af37]/30 shadow-sm flex flex-col items-center mb-2">
                                    <p className="text-[#b8860b] text-[9px] uppercase tracking-widest font-bold mb-1">{fam.role}</p>
                                    <p className="text-base font-heading text-[#5c4033] text-center leading-tight">{fam.names}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={(e) => { e.stopPropagation(); window.location.reload(); }}
                                className="px-10 py-3 bg-[#800020] text-white font-bold rounded-full uppercase text-xs tracking-widest shadow-xl hover:bg-[#5c0011] transition-all hover:scale-105"
                            >
                                Replay Invitation
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    // --- MAIN WRAPPER WITH TRANSITION STYLES ---
    const containerClasses = `w-full h-full relative transition-all duration-[900ms] ease-in-out ${
        isTransitioning
            ? 'opacity-0 blur-sm scale-102'
            : 'opacity-100 blur-0 scale-100'
    }`;

    return (
        <div
            className="fixed inset-0 bg-[#fffcf5] font-serif overflow-hidden select-none touch-none w-full h-[100dvh]"
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
        .gold-glow { text-shadow: 0 0 15px rgba(212,175,55,0.2); }
        .animate-spin-slow { animation: spin 60s linear infinite; }
        
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { will-change: transform; }
        .animate-float-up { animation: floatUp 1s ease-out forwards; }
        @keyframes floatUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .progress-bar { transition: width 0.1s linear; }
        .progress-bar.paused { animation-play-state: paused; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* --- AUDIOS --- */}
            <audio ref={tickAudioRef} src="/count.wav" preload="auto" />
            <audio ref={musicAudioRef} src="/main_intro.mp3" preload="auto" />

            {/* --- BACKGROUND OVERLAYS --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                {/* Gold Vignette */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#d4af37]/10 mix-blend-multiply"></div>
            </div>

            {/* --- MUTE TOGGLE --- */}
            {phase !== 'idle' && (
                <button
                    onPointerUp={toggleMute}
                    className="fixed top-safe right-4 z-50 p-3 bg-white/40 backdrop-blur-md rounded-full text-[#800020] border border-white/20 shadow-lg cursor-pointer active:scale-95 transition-transform mt-4"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            )}

            {/* --- MAIN CONTENT CONTAINER WITH BLUR TRANSITION --- */}
            <div className={containerClasses}>

                {/* --- PHASE 1: FRONT PAGE --- */}
                {phase === 'idle' && (
                    <div
                        onClick={handleStart}
                        className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer"
                    >
                        <div className="relative z-10 w-full max-w-md h-[80vh] flex flex-col items-center justify-center border-[1.5px] border-[#d4af37]/40 p-1 m-6">
                            <div className="absolute inset-2 border border-[#d4af37]/20"></div>

                            {/* Corners */}
                            <CornerPattern className="absolute top-0 left-0 w-20 h-20 text-[#d4af37]" />
                            <CornerPattern className="absolute top-0 right-0 w-20 h-20 text-[#d4af37] transform scale-x-[-1]" />
                            <CornerPattern className="absolute bottom-0 left-0 w-20 h-20 text-[#d4af37] transform scale-y-[-1]" />
                            <CornerPattern className="absolute bottom-0 right-0 w-20 h-20 text-[#d4af37] transform scale-[-1]" />

                            <div className="absolute top-12 text-[#b8860b] text-base animate-pulse opacity-80 uppercase tracking-widest">!! राधे राधे !!</div>

                            <div className="space-y-6 z-20 text-center">
                                <h1 className="font-heading text-6xl md:text-7xl text-[#800020] gold-glow drop-shadow-sm tracking-wide">{WEDDING_DATA.couple.bride}</h1>
                                <div className="flex items-center justify-center gap-4 opacity-80">
                                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                                    <Heart size={20} className="text-[#d4af37] fill-current animate-pulse" />
                                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                                </div>
                                <h1 className="font-heading text-6xl md:text-7xl text-[#800020] gold-glow drop-shadow-sm tracking-wide">{WEDDING_DATA.couple.groom.split(' ')[0]}</h1>
                            </div>

                            <div className="mt-12 text-[#b8860b] space-y-2 uppercase tracking-[0.2em] text-xs font-bold opacity-80 text-center">
                                <p>{WEDDING_DATA.coverDate}</p>
                                <p>{WEDDING_DATA.coverLocation}</p>
                            </div>

                            <div className="absolute bottom-16 flex flex-col items-center gap-3 animate-bounce">
                                <p className="text-[#800020] text-[10px] uppercase tracking-[0.3em] opacity-60">Tap to Open</p>
                                <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#d4af37]/10 backdrop-blur-sm">
                                    <Play className="text-[#d4af37] w-5 h-5 fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PHASE 2: COUNTDOWN --- */}
                {phase === 'countdown' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                        <PetalRain />

                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <Mandala className="w-[120vw] h-[120vw] text-[#d4af37] animate-[spin_10s_linear_infinite]" />
                        </div>

                        <div className="relative z-10 text-center space-y-12 animate-float-up px-6">
                            <h2 className="font-heading text-3xl md:text-4xl leading-normal text-[#800020] drop-shadow-sm">
                                "Get Ready"
                            </h2>

                            <div className="relative flex justify-center items-center">
                                <div className="absolute w-40 h-40 border-2 border-[#d4af37]/30 rounded-full animate-ping"></div>
                                <div className="text-[8rem] font-heading font-bold text-[#b8860b] leading-none drop-shadow-sm">
                                    {countdown}
                                </div>
                            </div>
                            <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
                        </div>
                    </div>
                )}

                {/* --- PHASE 3: PLAYING --- */}
                {phase === 'playing' && (
                    <div className="w-full h-full relative overflow-hidden flex flex-col">
                        <div className="flex-grow relative">
                            {renderSlideContent()}
                        </div>

                        {isPaused && (
                            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/10 pointer-events-none">
                                <div className="bg-white/80 p-4 rounded-full backdrop-blur-sm shadow-xl">
                                    <div className="w-4 h-8 border-l-4 border-r-4 border-[#800020] mx-auto" />
                                </div>
                            </div>
                        )}

                        <div className="absolute top-0 left-0 w-full pt-safe px-2 pb-2 flex gap-1 z-50 bg-gradient-to-b from-white/80 to-transparent">
                            {WEDDING_DATA.events.map((evt, idx) => {
                                const isPast = idx < currentEventIndex;
                                const isCurrent = idx === currentEventIndex;
                                return (
                                    <div key={idx} className="h-1 bg-[#d4af37]/20 rounded-full flex-1 overflow-hidden">
                                        <div
                                            className={`h-full bg-[#800020] shadow-sm progress-bar ${isPaused ? 'paused' : ''}`}
                                            style={{
                                                width: isPast ? '100%' : isCurrent ? '100%' : '0%',
                                                transition: isPast ? 'none' : 'none',
                                                animation: isCurrent && !isTransitioning ? `progress ${evt.duration}ms linear forwards` : 'none',
                                                animationPlayState: isPaused ? 'paused' : 'running'
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}