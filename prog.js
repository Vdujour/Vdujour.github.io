const API_KEY = "eccf8200898239c01b81626293da9f1d";

// Coordonnées des villes
const villes = {
    "niort": { lat: 46.3167, lon: -0.4667 },
    "saint-brieuc": { lat: 48.5167, lon: -2.7833 },
    "marseille": { lat: 43.2965, lon: 5.3698 },
};

// Fonction pour récupérer la météo
async function infoVille(city) {
    const { lat, lon } = villes[city];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données météo.");
        const data = await response.json();
        return {
            temperature: data.main.temp,
            description: data.weather[0].description,
            country: data.sys.country,
        };
    } catch (error) {
        console.error("Erreur :", error);
        return null;
    }
}

// Fonction pour afficher la météo
async function afficheVille() {
    const selectedCity = document.getElementById("lst").value;

    for (const city in villes) {
        const cityContainer = document.getElementById(city);
        if (city === selectedCity) {
            const weatherData = await infoVille(city);
            if (weatherData) {
                document.getElementById(`${city}-temp`).textContent = `Température : ${weatherData.temperature}°C`;
                document.getElementById(`${city}-description`).textContent = `Description : ${weatherData.description}`;
                cityContainer.style.display = "block";
            }
        } else {
            cityContainer.style.display = "none";
        }
    }
}

// Ajouter l'événement sur le menu déroulant
document.getElementById("lst").addEventListener("change", afficheVille);

// Charger la météo au démarrage
window.onload = afficheVille;
