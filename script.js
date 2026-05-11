
const destinationData = {
    egypt: {
        title: "The Eternal Nile",
        desc: "Experience the pyramids at sunrise. Our curated list includes private balcony views and expert-led female solo travel tours to Giza and Luxor.",
        img: "egypt.jpg",
        weather: "Sunny 29°C",
        dining: "139 Pavilion",
        season: "Oct - April"
    },
    italy: {
        title: "Amalfi Serenity",
        desc: "Cruise the coastline on a vintage scooter. Perfect for travelers seeking slow food, hidden coves, and the legendary Mediterranean sun.",
        img: "mediterranean.jpg",
        weather: "Breezy 24°C",
        dining: "Da Paolino",
        season: "May - Sept"
    },
    bali: {
        title: "Ubud Wellness",
        desc: "A sanctuary for the soul. Focus on yoga, local temple ceremonies, and jungle retreats designed for ultimate peace and safety.",
        img: "bali.webp",
        weather: "Humid 30°C",
        dining: "Locavore",
        season: "April - Oct"
    },
    greece: {
        title: "Santorini Dreams",
        desc: "Watch the world's most famous sunset from Oia. We recommend our partner villas with private caldera-view pools.",
        img: "santorini.jpg",
        weather: "Clear 26°C",
        dining: "Ambrosia",
        season: "June - Sept"
    },
    safari: {
        title: "Kenya Wilds",
        desc: "Luxury glamping in the heart of the Mara. Witness the Great Migration from your tent with 24/7 private concierge support.",
        img: "safari.webp",
        weather: "Cool 21°C",
        dining: "The Carnivore",
        season: "July - Oct"
    }
};

function toggleModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

function handleLogin() {
    const email = document.getElementById('userEmail').value;
    if(email.includes('@')) {
        document.getElementById('navActions').innerHTML = `<span class='text-sm font-bold text-[#c5a36c]'>Premium Member: ${email.split('@')[0]}</span>`;
        toggleModal();
    } else {
        alert("Please enter a valid email for the Premium experience.");
    }
}

function runDiscovery() {
    const country = document.getElementById('countrySelect').value;
    if(!country) return alert("Please select a destination");

    const data = destinationData[country];
    const area = document.getElementById('resultsArea');
    
    document.getElementById('resultImg').src = data.img;
    document.getElementById('resultTitle').innerText = data.title;
    document.getElementById('resultDesc').innerText = data.desc;
    document.getElementById('resultTag').innerText = data.weather;
    document.getElementById('resDining').innerText = data.dining;
    document.getElementById('resSeason').innerText = data.season;

    area.style.display = 'block';
    area.scrollIntoView({ behavior: 'smooth' });
}
