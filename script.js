const API_URL = "http://localhost:5000/api";

// MAIN FUNCTION
function runDiscovery() {
    const country = document.getElementById('countrySelect').value;
    const monthInput = document.querySelector('input[type="month"]').value;

    if (!country || !monthInput) {
        return alert("Please select country and month");
    }

    const month = monthInput.split("-")[1];

    fetch(`${API_URL}/discover?country=${country}&month=${month}`)
        .then(res => {
            if (!res.ok) throw new Error("No data found for this destination/month.");
            return res.json();
        })
        .then(data => {
            document.getElementById('resultImg').src = data.img || 'default.jpg';
            document.getElementById('resultTitle').innerText = data.title;
            document.getElementById('resultDesc').innerText = data.desc;
            document.getElementById('resultTag').innerText = `${data.weather} ${data.temperature}`;
            document.getElementById('resDining').innerText = data.dining;
            document.getElementById('resSeason').innerText = data.season;
            document.getElementById('resActivities').innerText = data.activities ? data.activities.join(", ") : "";
            document.getElementById('resPlaces').innerText = data.bestPlaces ? data.bestPlaces.join(", ") : "";

            const area = document.getElementById('resultsArea');
            area.style.display = 'block';
            area.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(err => {
            console.error(err);
            alert(err.message);
        });
}

// MODAL
function toggleModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

// LOGIN
function handleLogin() {
    const email = document.getElementById('userEmail').value;

    if (email.includes('@')) {
        document.getElementById('navActions').innerHTML =
            `<span class='text-sm font-bold text-[#c5a36c]'>Premium Member: ${email.split('@')[0]}</span>`;
        toggleModal();
    } else {
        alert("Please enter a valid email");
    }
}        })
        .catch(err => console.error(err));
}

// MODAL
function toggleModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

// LOGIN
function handleLogin() {
    const email = document.getElementById('userEmail').value;

    if (email.includes('@')) {
        document.getElementById('navActions').innerHTML =
            `<span class='text-sm font-bold text-[#c5a36c]'>Premium Member: ${email.split('@')[0]}</span>`;
        toggleModal();
    } else {
        alert("Please enter a valid email");
    }
}        })
        .catch(err => console.error(err));
}

// MODAL
function toggleModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

// LOGIN
function handleLogin() {
    const email = document.getElementById('userEmail').value;

    if (email.includes('@')) {
        document.getElementById('navActions').innerHTML =
            `<span class='text-sm font-bold text-[#c5a36c]'>Premium Member: ${email.split('@')[0]}</span>`;
        toggleModal();
    } else {
        alert("Please enter a valid email");
    }
}
