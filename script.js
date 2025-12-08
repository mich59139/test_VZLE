// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer  = document.getElementById('results-container'); 
    const filterStatut    = document.getElementById('status-navigation'); 
    const filterTheme     = document.getElementById('theme-filter');       
    const filterAnnee     = document.getElementById('annee-filter');       
    const countsContainer = document.getElementById('counts'); 
    
    // Vérification de la disponibilité des données
    if (typeof vizilleData === 'undefined') {
        console.error("ERREUR CRITIQUE: 'vizilleData' n'est pas défini. Vérifiez le chargement de data.js et l'ordre des <script> dans index.html.");
        return;
    }

    // --- Helpers ---

    function populateFilter(selectElement, values) {
        selectElement.innerHTML = '<option value="">Tous</option>';
        const sortedValues = Array.from(values).sort((a, b) => {
            if (selectElement.id === 'annee-filter') { 
                return b - a; // années décroissantes
            }
            return String(a).localeCompare(String(b), 'fr');
        });
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = String(value).toUpperCase(); // OK pour texte + nombres
            selectElement.appendChild(option);
        });
    }
    
    function getStatutClass(statut) {
        switch (statut) {
            case 'Achevé':
            case 'RÉALISÉ':
                return 'statut-acheve';
            case 'En cours':
            case 'EN COURS':
                return 'statut-en-cours';
            case 'Prévu':
            case 'PROJET':
            case 'À FAIRE':
                return 'statut-prevu';
            default:
                return 'statut-inconnu';
        }
    }

    // Map entre les boutons et les valeurs réelles dans les données
    const statutFilterMap = {
        'all'     : null,        // pas de filtre
        'realise' : 'RÉALISÉ',
        'en-cours': 'EN COURS',
        'projet'  : 'PROJET'
    };

    // --- Rendu des cartes ---

    function renderProjets(projets) {
        cardsContainer.innerHTML = ''; 
        let montantTotal = 0;

        if (projets.length === 0) {
            cardsContainer.innerHTML = '<p class="no-results">Aucun projet ne correspond à votre sélection de filtres.</p>';
        } else {
            projets.forEach(projet => {
                const card = document.createElement('div');
                card.classList.add('card', getStatutClass(projet.statut));
                
                const montantFormatte = (projet.montant && projet.montant > 0) 
                    ? `Montant : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(projet.montant)}`
                    : 'Montant : (Non chiffré)';
                
                montantTotal += projet.montant || 0;

                card.innerHTML = `
                    <div class="card-header">
                        <span class="card-theme">${projet.theme.toUpperCase()}</span>
                        <span class="card-annee">${projet.annee || ''}</span>
                    </div>
                    <h3 class="card-title">${projet.titre}</h3>
                    <p class="card-description">${projet.description}</p>
                    <div class="card-footer">
                        <span class="card-statut ${getStatutClass(projet.statut)}">${projet.statut.toUpperCase()}</span>
                        <span class="card-montant">${montantFormatte}</span>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        }
        
        countsContainer.innerHTML = `
            <p>Projets affichés : <span class="count-value">${projets.length}</span></p>
            <p>Montant total : <span class="count-value">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(montantTotal)}</span></p>
        `;
    }
    
    // --- Logique de filtrage ---

    function filterProjets() {
        const selectedTheme = filterTheme.value;
        const selectedAnnee = filterAnnee.value;
        const activeStatusButton = document.querySelector('#status-navigation .status-btn.active-status-btn');
        const selectedStatutKey = activeStatusButton ? activeStatusButton.dataset.status : 'all';
        const statutFilterValue = statutFilterMap[selectedStatutKey]; // ex: "RÉALISÉ"

        const projetsFiltres = vizilleData.filter(projet => {
            const statutMatch = !statutFilterValue || projet.statut === statutFilterValue;
            const themeMatch  = !selectedTheme || projet.theme === selectedTheme;
            const anneeMatch  = !selectedAnnee || projet.annee.toString() === selectedAnnee;
            return statutMatch && themeMatch && anneeMatch;
        });

        renderProjets(projetsFiltres);
    }
    
    // --- Boutons de statut ---

    filterStatut.addEventListener('click', (event) => {
        if (event.target.classList.contains('status-btn')) {
            document.querySelectorAll('#status-navigation .status-btn').forEach(btn => {
                btn.classList.remove('active-status-btn');
            });
            event.target.classList.add('active-status-btn');
            filterProjets();
        }
    });

    // --- Initialisation ---

    function initApp() {
        const uniqueThemes = new Set(vizilleData.map(p => p.theme).filter(Boolean));
        const uniqueAnnees = new Set(vizilleData.map(p => p.annee).filter(a => a)); // ignore 0 ou null
        
        populateFilter(filterTheme, uniqueThemes);
        populateFilter(filterAnnee, uniqueAnnees);

        filterTheme.addEventListener('change', filterProjets);
        filterAnnee.addEventListener('change', filterProjets);

        // affichage initial : tout
        renderProjets(vizilleData);
    }

    initApp();
});
