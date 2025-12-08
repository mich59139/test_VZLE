// script.js : logique de filtrage et d'affichage

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer  = document.getElementById('results-container');
    const filterStatut    = document.getElementById('status-navigation');
    const filterTheme     = document.getElementById('theme-filter');
    const filterAnnee     = document.getElementById('annee-filter');
    const countsContainer = document.getElementById('counts');
    const resetButton     = document.getElementById('reset-filters');

    if (typeof vizilleData === 'undefined') {
        console.error("ERREUR CRITIQUE : 'vizilleData' n'est pas défini. Vérifiez le chargement de data.js.");
        return;
    }

    // Remplit les menus déroulants avec les valeurs uniques
    function populateFilter(selectElement, values) {
        selectElement.innerHTML = '<option value="">Tous</option>';
        const sortedValues = Array.from(values).sort((a, b) => {
            if (selectElement.id === 'annee-filter') {
                return b - a;
            }
            return String(a).localeCompare(String(b), 'fr');
        });
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = String(value).toUpperCase();
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

    const statutFilterMap = {
        'all'     : null,
        'realise' : 'RÉALISÉ',
        'en-cours': 'EN COURS',
        'projet'  : 'PROJET'
    };

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

    function filterProjets() {
        const selectedTheme = filterTheme.value;
        const selectedAnnee = filterAnnee.value;
        const activeStatusBtn = document.querySelector('#status-navigation .status-btn.active-status-btn');
        const selectedKey = activeStatusBtn ? activeStatusBtn.dataset.status : 'all';
        const statutFilterValue = statutFilterMap[selectedKey];
        const projetsFiltres = vizilleData.filter(projet => {
            const statutMatch = !statutFilterValue || projet.statut === statutFilterValue;
            const themeMatch  = !selectedTheme || projet.theme === selectedTheme;
            const anneeMatch  = !selectedAnnee || projet.annee.toString() === selectedAnnee;
            return statutMatch && themeMatch && anneeMatch;
        });
        renderProjets(projetsFiltres);
    }

    function resetFilters() {
        filterTheme.value = '';
        filterAnnee.value = '';
        document.querySelectorAll('#status-navigation .status-btn').forEach(btn => btn.classList.remove('active-status-btn'));
        document.querySelector('#status-navigation .status-btn[data-status="all"]').classList.add('active-status-btn');
        renderProjets(vizilleData);
    }

    filterStatut.addEventListener('click', event => {
        if (event.target.classList.contains('status-btn')) {
            document.querySelectorAll('#status-navigation .status-btn').forEach(btn => btn.classList.remove('active-status-btn'));
            event.target.classList.add('active-status-btn');
            filterProjets();
        }
    });
    filterTheme.addEventListener('change', filterProjets);
    filterAnnee.addEventListener('change', filterProjets);
    resetButton.addEventListener('click', resetFilters);

    function initApp() {
        const themes = new Set(vizilleData.map(p => p.theme).filter(Boolean));
        const annees = new Set(vizilleData.map(p => p.annee).filter(a => a));
        populateFilter(filterTheme, themes);
        populateFilter(filterAnnee, annees);
        renderProjets(vizilleData);
    }
    initApp();
});
