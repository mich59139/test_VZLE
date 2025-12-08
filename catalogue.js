// Catalogue des Projets - Script principal
// Cette page transforme le jeu de données (vizilleData) en un tableau
// interactif avec filtres, recherche et tri. Un formulaire permet
// d'illustrer comment proposer des mises à jour (sans backend).

document.addEventListener('DOMContentLoaded', () => {
    if (typeof vizilleData === 'undefined') {
        console.error('Erreur : les données des projets (vizilleData) ne sont pas disponibles.');
        return;
    }

    const projects = vizilleData.slice(); // clone shallow
    const tableBody = document.querySelector('#projects-table tbody');
    const yearFilter = document.getElementById('year-filter');
    const themeFilter = document.getElementById('theme-filter');
    const searchInput = document.getElementById('search-input');
    const resetButton = document.getElementById('reset-filters');
    const projectCountElem = document.getElementById('project-count');

    // Populate filters
    function populateFilters() {
        // Années uniques
        const years = new Set();
        const themes = new Set();
        projects.forEach(proj => {
            if (proj.annee) years.add(proj.annee);
            if (proj.theme) themes.add(proj.theme);
        });
        // Tri des années décroissant
        const sortedYears = Array.from(years).sort((a, b) => b - a);
        // Tri des thèmes alphabétique
        const sortedThemes = Array.from(themes).sort((a, b) => a.localeCompare(b, 'fr'));
        // Ajouter options à yearFilter
        yearFilter.innerHTML = '<option value="">(toutes)</option>';
        sortedYears.forEach(annee => {
            const opt = document.createElement('option');
            opt.value = annee;
            opt.textContent = annee;
            yearFilter.appendChild(opt);
        });
        // Ajouter options à themeFilter
        themeFilter.innerHTML = '<option value="">(tous)</option>';
        sortedThemes.forEach(theme => {
            const opt = document.createElement('option');
            opt.value = theme;
            opt.textContent = theme;
            themeFilter.appendChild(opt);
        });
    }

    // Convertit un montant en chaîne formatée
    function formatMontant(montant) {
        return montant && montant > 0
            ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(montant)
            : 'Non chiffré';
    }

    // Render table rows from list of projects
    function renderTable(list) {
        tableBody.innerHTML = '';
        list.forEach(proj => {
            const row = document.createElement('tr');
            // Année
            const tdYear = document.createElement('td');
            tdYear.textContent = proj.annee || '';
            row.appendChild(tdYear);
            // Thème
            const tdTheme = document.createElement('td');
            tdTheme.textContent = proj.theme || '';
            row.appendChild(tdTheme);
            // Statut
            const tdStatut = document.createElement('td');
            const spanStatut = document.createElement('span');
            const status = proj.statut || '';
            spanStatut.textContent = status;
            // Ajout d'une classe en fonction du statut
            const statusNorm = status.toUpperCase();
            if (statusNorm === 'RÉALISÉ') {
                spanStatut.classList.add('statut', 'statut-realise');
            } else if (statusNorm === 'EN COURS') {
                spanStatut.classList.add('statut', 'statut-en-cours');
            } else if (statusNorm === 'PROJET') {
                spanStatut.classList.add('statut', 'statut-projet');
            } else {
                spanStatut.classList.add('statut');
            }
            tdStatut.appendChild(spanStatut);
            row.appendChild(tdStatut);
            // Titre
            const tdTitre = document.createElement('td');
            tdTitre.textContent = proj.titre || '';
            row.appendChild(tdTitre);
            // Description
            const tdDesc = document.createElement('td');
            tdDesc.textContent = proj.description || '';
            row.appendChild(tdDesc);
            // Montant
            const tdMontant = document.createElement('td');
            tdMontant.textContent = formatMontant(proj.montant);
            row.appendChild(tdMontant);
            tableBody.appendChild(row);
        });
        // Mettre à jour le nombre de projets
        projectCountElem.textContent = `${list.length} projets`;
    }

    // Filtre et trie la liste selon sélection
    let currentSort = { column: null, order: 'asc' };
    function applyFiltersAndSort() {
        const selectedYear = yearFilter.value;
        const selectedTheme = themeFilter.value;
        const searchTerm = searchInput.value.trim().toLowerCase();
        let filtered = projects.filter(proj => {
            const matchYear = !selectedYear || String(proj.annee) === selectedYear;
            const matchTheme = !selectedTheme || proj.theme === selectedTheme;
            let matchSearch = true;
            if (searchTerm) {
                const combined = `${proj.titre} ${proj.description} ${proj.theme} ${proj.statut}`.toLowerCase();
                matchSearch = combined.includes(searchTerm);
            }
            return matchYear && matchTheme && matchSearch;
        });
        // Appliquer le tri si défini
        if (currentSort.column) {
            filtered = sortList(filtered, currentSort.column, currentSort.order);
        }
        renderTable(filtered);
    }

    // Tri d'une liste selon la colonne et l'ordre
    function sortList(list, column, order) {
        const sorted = list.slice().sort((a, b) => {
            let valA = a[column];
            let valB = b[column];
            // normalisation pour les chaînes et valeurs nulles
            valA = valA === undefined || valA === null ? '' : valA;
            valB = valB === undefined || valB === null ? '' : valB;
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }

    // Gestion du tri lors du clic sur l'entête de colonne
    function handleSort(event) {
        const th = event.target.closest('th');
        if (!th || !th.dataset.sort) return;
        const sortColumn = th.dataset.sort;
        let sortOrder = 'asc';
        // détermine l'ordre en fonction de l'état actuel
        const alreadyAsc = th.classList.contains('sorted-asc');
        const alreadyDesc = th.classList.contains('sorted-desc');
        // Nettoyer les classes sur tous les en-têtes
        document.querySelectorAll('#projects-table th').forEach(header => {
            header.classList.remove('sorted-asc', 'sorted-desc');
        });
        if (alreadyAsc) {
            th.classList.add('sorted-desc');
            sortOrder = 'desc';
        } else {
            th.classList.add('sorted-asc');
            sortOrder = 'asc';
        }
        currentSort = { column: sortColumn, order: sortOrder };
        applyFiltersAndSort();
    }

    // Réinitialise tous les filtres
    function resetFilters() {
        yearFilter.value = '';
        themeFilter.value = '';
        searchInput.value = '';
        currentSort = { column: null, order: 'asc' };
        // Nettoyer les classes de tri
        document.querySelectorAll('#projects-table th').forEach(header => {
            header.classList.remove('sorted-asc', 'sorted-desc');
        });
        renderTable(projects);
    }

    // Le formulaire de mise à jour est désormais envoyé directement via Formspree.
    // Aucun traitement JavaScript supplémentaire n'est nécessaire ici.

    // Event listeners
    yearFilter.addEventListener('change', applyFiltersAndSort);
    themeFilter.addEventListener('change', applyFiltersAndSort);
    searchInput.addEventListener('input', () => {
        // Debounce léger
        clearTimeout(searchInput._timeout);
        searchInput._timeout = setTimeout(applyFiltersAndSort, 200);
    });
    resetButton.addEventListener('click', resetFilters);
    // Tri sur en-têtes
    document.querySelectorAll('#projects-table th').forEach(th => {
        th.addEventListener('click', handleSort);
    });

    // Initialisation
    populateFilters();
    renderTable(projects);
});