// script.js - Logique de l'application
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Initialisation des éléments du DOM
    // ----------------------------------------------------
    const cardsContainer = document.getElementById('cards-container');
    const filterStatut = document.getElementById('filter-statut');
    const filterTheme = document.getElementById('filter-theme');
    const filterAnnee = document.getElementById('filter-annee');
    const compteurElement = document.getElementById('compteur');
    const montantTotalElement = document.getElementById('montant-total');
    
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
     * @param {HTMLElement} selectElement - L'élément <select> à remplir.
     * @param {string[]} values - Le tableau des valeurs uniques à ajouter.
     */
    function populateFilter(selectElement, values) {
        // Ajoute l'option "Tous" par défaut
        selectElement.innerHTML = '<option value="">Tous</option>';
        
        // Trie les valeurs (les années en ordre décroissant, les thèmes alphabétiquement)
        const sortedValues = Array.from(values).sort((a, b) => {
            if (selectElement.id === 'filter-annee') {
                return b - a; // Tri décroissant pour les années
            }
            return a.localeCompare(b); // Tri alphabétique pour les autres
        });

        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            // Met le texte en majuscule pour les thèmes pour uniformité
            option.textContent = value.toUpperCase();
            selectElement.appendChild(option);
        });
    }
    
    /**
     * Retourne la classe CSS de couleur en fonction du statut.
     * @param {string} statut - Le statut du projet (Achevé, En cours, Prévu).
     * @returns {string} La classe CSS correspondante.
     */
    function getStatutClass(statut) {
        switch (statut) {
            case 'Achevé':
            case 'RÉALISÉ': // Inclut le statut du CSV
                return 'statut-acheve';
            case 'En cours':
            case 'EN COURS': // Inclut le statut du CSV
                return 'statut-en-cours';
            case 'Prévu':
            case 'PROJET': // Inclut le statut du CSV
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
     * @param {object[]} projets - Le tableau des projets à afficher.
     */
    function renderProjets(projets) {
        cardsContainer.innerHTML = ''; // Vide le conteneur existant
        let montantTotal = 0;

        if (projets.length === 0) {
            cardsContainer.innerHTML = '<p class="no-results">Aucun projet ne correspond à votre sélection de filtres.</p>';
        } else {
            projets.forEach(projet => {
                // Création de la carte
                const card = document.createElement('div');
                card.classList.add('card', getStatutClass(projet.statut));
                
                // Mettre en forme le montant
                const montantFormatte = (projet.montant > 0) 
                    ? `Montant : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(projet.montant)}`
                    : 'Montant : (Non chiffré)';
                
                // Calcul du montant total pour l'affichage général
                montantTotal += projet.montant || 0;

                // Contenu HTML de la carte
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
        
        // Mise à jour des compteurs
        compteurElement.textContent = `${projets.length} projets affichés`;
        montantTotalElement.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(montantTotal);
    }
    
    // ----------------------------------------------------
    // 4. Logique de Filtrage
    // ----------------------------------------------------

    /**
     * Applique les filtres sélectionnés et lance le rendu des projets.
     */
    function filterProjets() {
        const statut = filterStatut.value;
        const theme = filterTheme.value;
        const annee = filterAnnee.value;

        const projetsFiltres = vizilleData.filter(projet => {
            const statutMatch = !statut || projet.statut === statut;
            const themeMatch = !theme || projet.theme.toUpperCase() === theme.toUpperCase();
            const anneeMatch = !annee || projet.annee.toString() === annee;
            
            return statutMatch && themeMatch && anneeMatch;
        });

        renderProjets(projetsFiltres);
    }

    // ----------------------------------------------------
    // 5. Initialisation de l'application
    // ----------------------------------------------------

    /**
     * Lance les fonctions nécessaires au démarrage de l'application.
     */
    function initApp() {
        // 5a. Collecte des valeurs uniques pour remplir les filtres
        const uniqueStatuts = new Set(vizilleData.map(p => p.statut).filter(s => s));
        const uniqueThemes = new Set(vizilleData.map(p => p.theme).filter(t => t));
        const uniqueAnnees = new Set(vizilleData.map(p => p.annee).filter(a => a));
        
        // 5b. Remplissage des filtres
        populateFilter(filterStatut, uniqueStatuts);
        populateFilter(filterTheme, uniqueThemes);
        populateFilter(filterAnnee, uniqueAnnees);

        // 5c. Ajout des écouteurs d'événements
        filterStatut.addEventListener('change', filterProjets);
        filterTheme.addEventListener('change', filterProjets);
        filterAnnee.addEventListener('change', filterProjets);

        // 5d. Affichage initial de tous les projets
        renderProjets(vizilleData);
    }

    // Lancement de l'initialisation
    initApp();
});
