export const WEDDING_DATA = {
    couple: {
        bride: "Twinkle",
        groom: "Navjot Singh",
        hashtag: "#TwinkleWedsNavjot"
    },
    coverDate: "Feb 9th - 10th, 2026",
    coverLocation: "Mustafabad (YNR)",
    family: [
        { role: "Blessings from Grandparents", names: "Late Smt. Surjit Rani & Late Sh. Ratan Lal Salgotra" },
        { role: "Bride's Parents", names: "Smt. Meenu Rani & Sh. Sanjeev Kumar" },
        { role: "Groom's Parents", names: "Smt. Asha Rani & Sh. Sukhwinder Singh" },
        { role: "R.S.V.P.", names: "Rajinder Kumar, Narender Kumar, Darpan, Anmol, Aditya & Salgotra Family" },
        { role: "Contact", names: "Sh. Sanjeev Kumar: 7988387170" }
    ],
    events: [
        { id: 'welcome', type: 'intro', duration: 6000 },
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
        { id: 'outro', type: 'outro', duration: 9000 }
    ]
};