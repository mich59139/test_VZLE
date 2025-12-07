// 1. Initialisation de la carte Leaflet
// Centrage sur Vizille (coordonnées de la Mairie)
const map = L.map('map').setView([45.0792, 5.7667], 14); 

// Ajout des tuiles (fond de carte) - ici, OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fonction pour définir l'icône du marqueur en fonction du statut
function getMarkerColor(statut) {
    let color;
    switch (statut) {
        case 'Achevé':
        case 'Acquise':
        case 'Ouverte':
        case 'Lancée':
        case 'Obtenu':
            color = 'green'; // Vert pour les réalisations terminées
            break;
        case 'En cours':
            color = 'gold'; // Jaune/Or pour les projets en cours
            break;
        case 'Prévu':
            color = 'blue'; // Bleu pour les projets à venir (Planification)
            break;
        default:
            color = 'red'; // Rouge par défaut
    }
    
    // Utilisation des icônes Leaflet par défaut avec la couleur personnalisée
    return new L.DivIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [15, 15],
        iconAnchor: [7, 7]
    });
}

// Fonction pour charger et traiter le fichier CSV
async function loadData() {
    // Le nom de votre fichier CSV
    const csvFile = 'vizille_en_mouvement_geoloc.csv'; 

    try {
        const response = await fetch(csvFile);
        if (!response.ok) {
            throw new Error(`Erreur de chargement du CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        
        // Séparer les lignes et gérer l'en-tête (séparateur : ;)
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(';');
        const dataLines = lines.slice(1);

        dataLines.forEach(line => {
            const values = line.split(';');
            
            // Créer un objet JSON pour la réalisation
            const item = headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
                return obj;
            }, {});

            const lat = parseFloat(item.latitude);
            const lon = parseFloat(item.longitude);

            // Vérifier que les coordonnées sont valides
            if (isNaN(lat) || isNaN(lon)) {
                console.warn(`Coordonnées invalides pour l'item : ${item.titre_court}`);
                return;
            }

            // Définir la classe CSS pour le statut
            let statusClass = '';
            if (item.statut === 'Achevé' || item.statut === 'Acquise' || item.statut === 'Ouverte' || item.statut === 'Lancée' || item.statut === 'Obtenu') {
                statusClass = 'status-acheve';
            } else if (item.statut === 'En cours') {
                statusClass = 'status-en-cours';
            } else if (item.statut === 'Prévu') {
                statusClass = 'status-prévu';
            }

            // Création du contenu du popup
            const popupContent = `
                <div class="popup-content">
                    <h3>${item.titre_court}</h3>
                    <p><strong>Thème :</strong> ${item.theme}</p>
                    <p><strong>Statut :</strong> <span class="${statusClass}">${item.statut}</span></p>
                    <p>${item.description_longue}</p>
                    <p><strong>Coût (Approximatif) :</strong> ${item.montant_total !== '0' ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.montant_total) : 'Non spécifié'}</p>
                    <p><strong>Source :</strong> ${item.source_revue}</p>
                </div>
            `;
            
            // Ajout du marqueur sur la carte
            const marker = L.marker([lat, lon], {
                 // L'icône par défaut sera utilisée car l'icône DIV est complexe
            }).addTo(map);

            // Ouvrir le popup par défaut pour les projets "En cours" ou "Achevé"
            marker.bindPopup(popupContent);
        });

    } catch (error) {
        console.error("Erreur fatale lors du chargement des données de la carte :", error);
    }
}

// Démarrer le processus
loadData();
