// script.js - Logique de l'application (Version corrigée des ID)
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Initialisation des éléments du DOM
    // ----------------------------------------------------
    // Les ID sont maintenant alignés sur votre HTML (index.html)
    const cardsContainer = document.getElementById('results-container'); 
    const filterStatut = document.getElementById('status-navigation'); 
    const filterTheme = document.getElementById('theme-filter');       
    const filterAnnee = document.getElementById('annee-filter');       
    
    // Le script va injecter les compteurs (compteur et montant total) dans la div 'counts'
    const countsContainer = document.getElementById('counts'); 
    
    // Déclaration de vizilleData pour être sûr qu'elle existe (elle est chargée via data.js)
    if (typeof vizilleData === 'undefined') {
        console.error("ERREUR: Le tableau 'vizilleData' n'est pas défini. Vérifiez le chargement de data.js.");
        return;
    }

    // ----------------------------------------------------
    // 2. Fonctions d'aide (Helpers)
    // ----------------------------------------------------

    /**
     * Crée les options pour un filtre (select) à partir d'un ensemble de valeurs uniques.
     */
    function populateFilter(selectElement, values) {
        selectElement.innerHTML = '<option value="">Tous</option>';
        
        const sortedValues = Array.from(values).sort((a, b) => {
            if (selectElement.id === 'annee-filter') {
                return b - a; 
            }
            return a.localeCompare(b); 
        });

        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value.toUpperCase();
            selectElement.appendChild(option);
        });
    }
    
    /**
     * Retourne la classe CSS de couleur en fonction du statut.
     */
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

    // ----------------------------------------------------
    // 3. Rendu des cartes et Mise à jour des compteurs
    // ----------------------------------------------------

    /**
     * Affiche les projets filtrés et met à jour les indicateurs.
     */
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
        
        // Mise à jour des compteurs (Injecté dans la div 'counts')
        countsContainer.innerHTML = `
            <p>Projets Affichés : <span class="count-value">${projets.length}</span></p>
            <p>Montant Total : <span class="count-value">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(montantTotal)}</span></p>
        `;
    }
    
    // ----------------------------------------------------
    // 4. Logique de Filtrage
    // ----------------------------------------------------

    /**
     * Applique les filtres sélectionnés et lance le rendu des projets.
     */
    function filterProjets() {
        // Logique de filtrage par <select> (Thème et Année)
        const selectedTheme = filterTheme.value;
        const selectedAnnee = filterAnnee.value;
        
        // Trouver le statut actif du bouton de navigation (pour les filtres de statut)
        const activeStatusButton = document.querySelector('#status-navigation .status-btn.active-status-btn');
        const selectedStatut = activeStatusButton ? activeStatusButton.dataset.status : 'all';

        const projetsFiltres = vizilleData.filter(projet => {
            // Filtrage par Statut (boutons)
            const statutMatch = selectedStatut === 'all' || getStatutClass(projet.statut).includes(selectedStatut.toLowerCase().replace(' ', '-'));
            
            // Filtrage par Thème (select)
            const themeMatch = !selectedTheme || projet.theme.toUpperCase() === selectedTheme.toUpperCase();
            
            // Filtrage par Année (select)
            const anneeMatch = !selectedAnnee || projet.annee.toString() === selectedAnnee;
            
            return statutMatch && themeMatch && anneeMatch;
        });

        renderProjets(projetsFiltres);
    }
    
    // ----------------------------------------------------
    // 5. Gestion des Boutons de Statut
    // ----------------------------------------------------
    
    filterStatut.addEventListener('click', (event) => {
        if (event.target.classList.contains('status-btn')) {
            // Retirer la classe 'active' de tous les boutons
            document.querySelectorAll('#status-navigation .status-btn').forEach(btn => {
                btn.classList.remove('active-status-btn');
            });
            // Ajouter la classe 'active' au bouton cliqué
            event.target.classList.add('active-status-btn');
            
            // Relancer le filtrage
            filterProjets();
        }
    });


    // ----------------------------------------------------
    // 6. Initialisation de l'application
    // ----------------------------------------------------

    /**
     * Lance les fonctions nécessaires au démarrage de l'application.
     */
    function initApp() {
        // Collecte des valeurs uniques pour remplir les filtres
        const uniqueStatuts = new Set(vizilleData.map(p => p.statut).filter(s => s));
        const uniqueThemes = new Set(vizilleData.map(p => p.theme).filter(t => t));
        const uniqueAnnees = new Set(vizilleData.map(p => p.annee).filter(a => a));
        
        // Remplissage des filtres <select>
        populateFilter(filterTheme, uniqueThemes);
        populateFilter(filterAnnee, uniqueAnnees);

        // Ajout des écouteurs d'événements pour les <select>
        filterTheme.addEventListener('change', filterProjets);
        filterAnnee.addEventListener('change', filterProjets);
        // Note: L'écouteur pour les boutons de statut est déjà ajouté au point 5.

        // Affichage initial de tous les projets
        renderProjets(vizilleData);
    }

    // Lancement de l'initialisation
    initApp();
});
