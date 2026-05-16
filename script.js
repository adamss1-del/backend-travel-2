
const API_URL = "http://localhost:5000/api";

function runDiscovery() {
    const country = document.getElementById('countrySelect').value;
    if (!country) return alert("Please select a destination");

    fetch(`${API_URL}/destinations`)
        .then(res => res.json())
        .then(data => {
            const selected = data.find(d => d.id === country);

            if (!selected) {
                alert("Destination not found in database");
                return;
            }

            document.getElementById('resultImg').src = selected.img;
            document.getElementById('resultTitle').innerText = selected.title;
            document.getElementById('resultDesc').innerText = selected.desc;
            document.getElementById('resultTag').innerText = selected.weather;
            document.getElementById('resDining').innerText = selected.dining;
            document.getElementById('resSeason').innerText = selected.season;

            document.getElementById('resultsArea').style.display = 'block';
        })
        .catch(err => console.error(err));
}

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
