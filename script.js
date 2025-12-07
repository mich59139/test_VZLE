// script.js : Gère l'affichage dynamique, le filtrage ET L'ANIMATION

document.addEventListener('DOMContentLoaded', () => {
    // VÉRIFICATION CRITIQUE : Si vizilleData n'est pas trouvé, RIEN ne s'affiche.
    if (typeof vizilleData === 'undefined') {
        const resultsContainer = document.getElementById('results-container');
        // Affiche un message d'erreur ÉNORME et ROUGE si le fichier data.js n'est pas chargé
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red; font-weight: bold; padding: 50px; font-size: 1.5em;">ERREUR : Le fichier **data.js** n\'a pas pu être chargé. VEUILLEZ VÉRIFIER L\'ORTHOGRAPHE DU NOM DE FICHIER et son chemin d\'accès dans index.html.</p>';
        return; // Arrête l'exécution du script.
    }

    const resultsContainer = document.getElementById('results-container');
    const themeFilter = document.getElementById('theme-filter');
    const anneeFilter = document.getElementById('annee-filter');
    const countsElement = document.getElementById('counts');
    const statusButtons = document.querySelectorAll('#status-navigation .status-btn');

    let currentStatusFilter = 'all'; 

    // --- LOGIQUE DE FILTRAGE PAR STATUT (BOUTONS) ---
    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStatusFilter = button.dataset.status;
            statusButtons.forEach(btn => btn.classList.remove('active-status-btn'));
            button.classList.add('active-status-btn');
            renderResults();
        });
    });

    // --- PEUPLEMENT DES FILTRES SECONDAIRES ---
    function populateFilters() {
        const themes = [...new Set(vizilleData.map(item => item.theme))].sort();
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

    // --- FONCTION PRINCIPALE DE RENDU ---
    function renderResults() {
        const selectedTheme = themeFilter.value;
        const selectedAnnee = anneeFilter.value;

        let filteredData = vizilleData;
        
        // 0. Filtrer par Statut principal (boutons)
        if (currentStatusFilter !== 'all') {
            filteredData = filteredData.filter(item => item.statut === currentStatusFilter);
        }

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
        
        // 3. Trier les résultats (du plus récent à l'ancien)
        filteredData.sort((a, b) => b.annee - a.annee); 

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            // La classe CSS utilise le statut pour la couleur de la bordure
            card.className = `project-card status-${item.statut.replace(/\s/g, '-')}`; 
            
            // Formatage monétaire
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
            
            // Animation d'apparition séquentielle
            setTimeout(() => {
                card.style.animation = `fadeInSlide 0.5s ease forwards`;
            }, index * 50); 
        });
    }

    // Attacher les écouteurs d'événements aux filtres secondaires
    themeFilter.addEventListener('change', renderResults);
    anneeFilter.addEventListener('change', renderResults);

    // Initialiser la page au chargement
    populateFilters();
    // Déclenche le premier rendu des cartes
    document.querySelector('.status-btn[data-status="all"]').click(); 
});
