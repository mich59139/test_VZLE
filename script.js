// script.js : Gère l'affichage dynamique et le filtrage

document.addEventListener('DOMContentLoaded', () => {
    // Le tableau vizilleData est défini dans data.js
    if (typeof vizilleData === 'undefined') {
        console.error("Erreur: data.js n'a pas été chargé.");
        return;
    }

    const resultsContainer = document.getElementById('results-container');
    const themeFilter = document.getElementById('theme-filter');
    const anneeFilter = document.getElementById('annee-filter');
    const countsElement = document.getElementById('counts');

    // Fonction pour peupler les listes déroulantes (Thèmes et Années)
    function populateFilters() {
        // Récupérer et trier les thèmes
        const themes = [...new Set(vizilleData.map(item => item.theme))].sort();
        // Récupérer et trier les années (du plus récent au plus ancien)
        const annees = [...new Set(vizilleData.map(item => item.annee))].sort((a, b) => b - a);

        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            themeFilter.appendChild(option);
        });

        annees.forEach(annee => {
            const option = document.createElement('option');
            option.value = annee;
            option.textContent = annee;
            anneeFilter.appendChild(option);
        });
    }

    // Fonction principale de filtrage et d'affichage
    function renderResults() {
        const selectedTheme = themeFilter.value;
        const selectedAnnee = anneeFilter.value;

        let filteredData = vizilleData;

        // 1. Filtrer par Thème
        if (selectedTheme !== 'all') {
            filteredData = filteredData.filter(item => item.theme === selectedTheme);
        }

        // 2. Filtrer par Année
        if (selectedAnnee !== 'all') {
            filteredData = filteredData.filter(item => item.annee.toString() === selectedAnnee);
        }

        resultsContainer.innerHTML = '';
        countsElement.textContent = `${filteredData.length} projets affichés`;

        if (filteredData.length === 0) {
            resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 30px;">Aucun projet ne correspond à ces critères de filtrage.</p>';
            return;
        }
        
        // 3. Trier les résultats (ex: du plus récent à l'ancien)
        filteredData.sort((a, b) => b.annee - a.annee); 

        filteredData.forEach(item => {
            const card = document.createElement('div');
            // Utiliser la classe CSS par statut (ex: status-Achevé) pour la couleur de la bordure
            card.className = `project-card status-${item.statut.replace(/\s/g, '-')}`; 
            
            // Formatage du montant en Euros (sans décimales)
            const montantFormatte = item.montant > 0 
                ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(item.montant) 
                : 'Non spécifié / Non chiffré';
            
            card.innerHTML = `
                <h3>${item.titre}</h3>
                <p class="description">${item.description}</p>
                <div class="meta">
                    <p><strong>Thème :</strong> ${item.theme}</p>
                    <p><strong>Statut :</strong> <span class="status-badge">${item.statut}</span></p>
                    <p><strong>Année :</strong> ${item.annee}</p>
                    <p><strong>Coût estimé :</strong> <span class="montant">${montantFormatte}</span></p>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // Attacher les écouteurs d'événements aux filtres pour déclencher le rendu
    themeFilter.addEventListener('change', renderResults);
    anneeFilter.addEventListener('change', renderResults);

    // Initialiser la page au chargement
    populateFilters();
    renderResults();
});
