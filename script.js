// script.js - Logique de l'application (Version finale et corrigée des ID)
document.addEventListener('DOMContentLoaded', () => {
    
    const cardsContainer = document.getElementById('results-container'); 
    const filterStatut = document.getElementById('status-navigation'); 
    const filterTheme = document.getElementById('theme-filter');       
    const filterAnnee = document.getElementById('annee-filter');       
    const countsContainer = document.getElementById('counts'); 
    
    // VÉRIFICATION DE LA DISPONIBILITÉ DE LA VARIABLE DE DONNÉES
    if (typeof vizilleData === 'undefined') {
        // C'est ce message que vous avez vu. Si le problème persiste, 
        // cela confirme que data.js n'a pas réussi à définir vizilleData.
        console.error("ERREUR CRITIQUE: Le tableau 'vizilleData' n'est pas défini. Vérifiez la structure et le chargement de data.js.");
        return;
    }

    // --- Fonctions d'aide (Helpers) ---

    function populateFilter(selectElement, values) {
        selectElement.innerHTML = '<option value="">Tous</option>';
        const sortedValues = Array.from(values).sort((a, b) => {
            if (selectElement.id === 'annee-filter') { return b - a; }
            return a.localeCompare(b);
        });
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value.toUpperCase();
            selectElement.appendChild(option);
        });
    }
    
    function getStatutClass(statut) {
        switch (statut) {
            case 'Achevé': case 'RÉALISÉ': return 'statut-acheve';
            case 'En cours': case 'EN COURS': return 'statut-en-cours';
            case 'Prévu': case 'PROJET': case 'À FAIRE': return 'statut-prevu';
            default: return 'statut-inconnu';
        }
    }

    // --- Rendu des cartes et Mise à jour des compteurs ---

    function renderProjets(projets) {
        cardsContainer.innerHTML = ''; 
        let montantTotal = 0;

        if (projets.length === 0) {
            cardsContainer.innerHTML = '<p class="no-results">Aucun projet ne correspond à votre sélection de filtres.</p>';
        } else {
            projets.forEach(projet => {
                const card = document.createElement('div');
                card.classList.add('card', getStatutClass(projet.statut));
                
                const montantFormatte = (projet.montant > 0) 
                    ? `Montant : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(projet.montant)}`
                    : 'Montant : (Non chiffré)';
                
                montantTotal += projet.montant || 0;

                card.innerHTML = `
                    <div class="card-header">
                        <span class="card-theme">${projet.theme.toUpperCase()}</span>
                        <span class="card-annee">${projet.annee}</span>
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
            <p>Projets Affichés : <span class="count-value">${projets.length}</span></p>
            <p>Montant Total : <span class="count-value">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(montantTotal)}</span></p>
        `;
    }
    
    // --- Logique de Filtrage ---

    function filterProjets() {
        const selectedTheme = filterTheme.value;
        const selectedAnnee = filterAnnee.value;
        const activeStatusButton = document.querySelector('#status-navigation .status-btn.active-status-btn');
        const selectedStatut = activeStatusButton ? activeStatusButton.dataset.status : 'all';

        const projetsFiltres = vizilleData.filter(projet => {
            const statutMatch = selectedStatut === 'all' || getStatutClass(projet.statut).includes(selectedStatut.toLowerCase().replace(' ', '-'));
            const themeMatch = !selectedTheme || projet.theme.toUpperCase() === selectedTheme.toUpperCase();
            const anneeMatch = !selectedAnnee || projet.annee.toString() === selectedAnnee;
            
            return statutMatch && themeMatch && anneeMatch;
        });

        renderProjets(projetsFiltres);
    }
    
    // --- Gestion des Boutons de Statut ---
    
    filterStatut.addEventListener('click', (event) => {
        if (event.target.classList.contains('status-btn')) {
            document.querySelectorAll('#status-navigation .status-btn').forEach(btn => {
                btn.classList.remove('active-status-btn');
            });
            event.target.classList.add('active-status-btn');
            filterProjets();
        }
    });

    // --- Initialisation de l'application ---

    function initApp() {
        const uniqueThemes = new Set(vizilleData.map(p => p.theme).filter(t => t));
        const uniqueAnnees = new Set(vizilleData.map(p => p.annee).filter(a => a));
        
        populateFilter(filterTheme, uniqueThemes);
        populateFilter(filterAnnee, uniqueAnnees);

        filterTheme.addEventListener('change', filterProjets);
        filterAnnee.addEventListener('change', filterProjets);

        renderProjets(vizilleData);
    }

    initApp();
});
