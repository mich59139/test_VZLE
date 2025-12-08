/*
 * script.js
 *
 * This script powers the Vizille en Mouvement dashboard. It builds an
 * interactive interface from the dataset defined in data.js: summary
 * statistics, filters (status, theme, year and search), an accordion
 * grouping projects by theme, and dynamic updates when filters are
 * applied. Each project is presented as a card with colour-coded
 * accents based on its status. The dashboard is designed to be
 * responsive and intuitive, inviting the reader to explore the data.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure the global dataset is available
  if (typeof vizilleData === 'undefined') {
    console.error('vizilleData is not defined. Please ensure data.js is loaded before this script.');
    return;
  }

  /**
   * Normalise the status strings so that different spellings/variants
   * map to the canonical values used for filtering and styling.
   * @param {string} statut The original status value from the data
   * @returns {string} One of 'RÉALISÉ', 'EN COURS', 'PROJET'
   */
  function normalizeStatus(statut) {
    if (!statut) return '';
    const s = statut.toUpperCase().trim();
    if (s === 'ACHEVÉ' || s === 'RÉALISÉ' || s === 'ACHEVE') return 'RÉALISÉ';
    if (s === 'EN COURS') return 'EN COURS';
    if (s === 'PRÉVU' || s === 'PROJET' || s === 'À FAIRE' || s === 'A FAIRE') return 'PROJET';
    return s;
  }

  /**
   * Return a hex colour corresponding to a status. These colours match
   * those defined in the stylesheet for consistency.
   * @param {string} statut Canonical status string
   * @returns {string} A CSS colour
   */
  function getStatusColor(statut) {
    switch (statut) {
      case 'RÉALISÉ':
        return '#28a745';
      case 'EN COURS':
        return '#ffc107';
      case 'PROJET':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }

  /**
   * Generate a palette of pastel colours and assign one to each theme.
   * The same theme always receives the same colour.
   * @param {string[]} themes Array of unique theme names
   * @returns {Object} Mapping of theme → colour
   */
  function assignThemeColours(themes) {
    const palette = [
      '#FFC857', '#9BCA3E', '#3AB795', '#F25F5C', '#247BA0',
      '#FFBF00', '#B3001B', '#6A4C93', '#2B2D42', '#36B37E', '#FF8A5B',
      '#00A8E8', '#F18F01', '#B388EB', '#00B7C2', '#E4572E'
    ];
    const colours = {};
    themes.forEach((t, idx) => {
      colours[t] = palette[idx % palette.length];
    });
    return colours;
  }

  // DOM elements
  const statTotalEl    = document.getElementById('stat-total');
  const statRealisedEl = document.getElementById('stat-realised');
  const statOngoingEl  = document.getElementById('stat-ongoing');
  const statProjectEl  = document.getElementById('stat-project');
  const statBudgetEl   = document.getElementById('stat-budget');

  const statusButtons  = document.querySelectorAll('.status-btn');
  const themeSelect    = document.getElementById('theme-filter');
  const yearSelect     = document.getElementById('year-filter');
  const searchInput    = document.getElementById('search-input');
  const resetBtn       = document.getElementById('reset-btn');
  const accordionContainer = document.getElementById('accordion-container');

  // Compute unique themes and years for filter controls
  const uniqueThemes = Array.from(new Set(vizilleData.map(p => p.theme))).filter(Boolean).sort((a, b) => a.localeCompare(b, 'fr'));
  const uniqueYears  = Array.from(new Set(vizilleData.map(p => p.annee).filter(a => a))).sort((a, b) => b - a);

  const themeColours = assignThemeColours(uniqueThemes);

  // Populate the theme and year selects
  function populateSelect(selectEl, options) {
    // Clear existing
    selectEl.innerHTML = '';
    // Add "Tous" option
    const optAll = document.createElement('option');
    optAll.value = '';
    optAll.textContent = 'Tous';
    selectEl.appendChild(optAll);
    options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt;
      optionEl.textContent = String(opt);
      selectEl.appendChild(optionEl);
    });
  }

  populateSelect(themeSelect, uniqueThemes);
  populateSelect(yearSelect, uniqueYears);

  /**
   * Build a project card element from a data item.
   * @param {Object} item A project from vizilleData
   * @returns {HTMLElement} Card element
   */
  function createProjectCard(item) {
    const statusNorm = normalizeStatus(item.statut);
    const statusColour = getStatusColor(statusNorm);
    const card = document.createElement('div');
    card.classList.add('project-card');
    // Set data attributes for filtering
    card.dataset.theme = item.theme || '';
    card.dataset.status = statusNorm;
    card.dataset.year = item.annee ? String(item.annee) : '';
    card.dataset.title = item.titre.toLowerCase();
    card.dataset.description = (item.description || '').toLowerCase();
    card.style.setProperty('--status-color', statusColour);

    // Card header: title and year
    const header = document.createElement('div');
    header.classList.add('card-header');
    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.textContent = item.titre;
    const yearSpan = document.createElement('span');
    yearSpan.classList.add('card-year');
    yearSpan.textContent = item.annee ? item.annee : '';
    header.appendChild(title);
    header.appendChild(yearSpan);

    // Description
    const desc = document.createElement('p');
    desc.classList.add('card-description');
    desc.textContent = item.description;

    // Footer: status label and amount
    const footer = document.createElement('div');
    footer.classList.add('card-footer');
    const statusLabel = document.createElement('span');
    statusLabel.classList.add('card-status');
    // Add modifier class for colours
    switch (statusNorm) {
      case 'RÉALISÉ':
        statusLabel.classList.add('realise');
        break;
      case 'EN COURS':
        statusLabel.classList.add('ongoing');
        break;
      case 'PROJET':
        statusLabel.classList.add('project');
        break;
      default:
        break;
    }
    statusLabel.textContent = statusNorm;
    const amountSpan = document.createElement('span');
    amountSpan.classList.add('card-amount');
    if (item.montant && item.montant > 0) {
      amountSpan.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(item.montant);
    } else {
      amountSpan.textContent = 'Non chiffré';
    }
    footer.appendChild(statusLabel);
    footer.appendChild(amountSpan);

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(footer);
    return card;
  }

  /**
   * Build an accordion panel for a theme containing its projects.
   * @param {string} theme The theme name
   * @param {Object[]} projects Array of project objects for this theme
   * @returns {HTMLElement} The panel element
   */
  function createAccordionPanel(theme, projects) {
    const panel = document.createElement('div');
    panel.classList.add('accordion-panel');

    // Header
    const header = document.createElement('div');
    header.classList.add('accordion-header');
    // Set theme colour on the header via CSS variable
    const colour = themeColours[theme] || '#007bff';
    header.style.setProperty('--theme-color', colour);
    const title = document.createElement('h3');
    title.classList.add('accordion-title');
    title.textContent = theme;
    const countSpan = document.createElement('span');
    countSpan.classList.add('accordion-count');
    countSpan.textContent = `(${projects.length})`;
    const arrow = document.createElement('span');
    arrow.classList.add('accordion-arrow');
    arrow.textContent = '▶';
    header.appendChild(title);
    header.appendChild(countSpan);
    header.appendChild(arrow);

    // Body
    const body = document.createElement('div');
    body.classList.add('accordion-body');
    // Insert project cards
    projects.forEach(proj => {
      const card = createProjectCard(proj);
      body.appendChild(card);
    });
    // Event to toggle open/close
    header.addEventListener('click', () => {
      const isOpen = body.classList.contains('open');
      if (isOpen) {
        // Collapse
        body.classList.remove('open');
        body.style.maxHeight = null;
        header.classList.remove('open');
      } else {
        // Expand
        body.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.classList.add('open');
      }
    });

    panel.appendChild(header);
    panel.appendChild(body);
    return panel;
  }

  /**
   * Build the entire accordion container from the dataset. This is only
   * executed once on initialisation; afterwards, filtering logic will
   * show/hide cards rather than rebuilding the DOM.
   */
  function buildAccordion() {
    // Group projects by theme
    const grouped = {};
    vizilleData.forEach(item => {
      if (!grouped[item.theme]) grouped[item.theme] = [];
      grouped[item.theme].push(item);
    });
    // Clear container
    accordionContainer.innerHTML = '';
    // Create panels
    uniqueThemes.forEach(theme => {
      const projects = grouped[theme] || [];
      const panel = createAccordionPanel(theme, projects);
      accordionContainer.appendChild(panel);
    });
  }

  /**
   * Apply current filter settings to all project cards. This function
   * handles showing/hiding cards and panels, and updates the summary
   * statistics accordingly.
   */
  function applyFilters() {
    const selectedStatus = document.querySelector('.status-btn.active-status-btn')?.dataset.status || 'all';
    const selectedTheme = themeSelect.value;
    const selectedYear  = yearSelect.value;
    const query = searchInput.value.trim().toLowerCase();

    // Keep track of counts for stats
    let totalVisible = 0;
    let realisedVisible = 0;
    let ongoingVisible = 0;
    let projectVisible = 0;
    let budgetVisible = 0;

    // For each panel, update its cards and count
    const panels = accordionContainer.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
      const header = panel.querySelector('.accordion-header');
      const body   = panel.querySelector('.accordion-body');
      const countSpan = header.querySelector('.accordion-count');
      let themeVisibleCount = 0;
      let themeRealised = 0;
      let themeOngoing = 0;
      let themeProject = 0;
      let themeBudget = 0;
      const cards = body.querySelectorAll('.project-card');
      cards.forEach(card => {
        // Determine if card matches filters
        const cardStatus = card.dataset.status;
        const cardTheme  = card.dataset.theme;
        const cardYear   = card.dataset.year;
        const titleStr   = card.dataset.title;
        const descStr    = card.dataset.description;
        let matches = true;
        // Status filter
        if (selectedStatus !== 'all' && cardStatus !== selectedStatus) {
          matches = false;
        }
        // Theme filter
        if (selectedTheme && cardTheme !== selectedTheme) {
          matches = false;
        }
        // Year filter
        if (selectedYear && cardYear !== selectedYear) {
          matches = false;
        }
        // Search filter
        if (query) {
          if (!(titleStr.includes(query) || descStr.includes(query))) {
            matches = false;
          }
        }
        // Show/hide card
        if (matches) {
          card.style.display = '';
          // Count statistics from card dataset
          themeVisibleCount++;
          totalVisible++;
          // Determine status for counts
          if (cardStatus === 'RÉALISÉ') themeRealised++, realisedVisible++;
          else if (cardStatus === 'EN COURS') themeOngoing++, ongoingVisible++;
          else if (cardStatus === 'PROJET') themeProject++, projectVisible++;
          // Budget: read from amount span: convert to number
          const amountSpan = card.querySelector('.card-amount');
          if (amountSpan) {
            // If text contains € and digits, parse
            const text = amountSpan.textContent.replace(/[^0-9]/g, '');
            const value = parseInt(text, 10);
            if (!isNaN(value)) themeBudget += value, budgetVisible += value;
          }
        } else {
          card.style.display = 'none';
        }
      });
      // Update theme count in header
      countSpan.textContent = `(${themeVisibleCount})`;
      // Show or hide panel if no cards match
      if (themeVisibleCount > 0) {
        panel.style.display = '';
      } else {
        panel.style.display = 'none';
      }
      // Collapse panel body if previously open but now empty
      if (themeVisibleCount === 0 && body.classList.contains('open')) {
        body.classList.remove('open');
        body.style.maxHeight = null;
        header.classList.remove('open');
      }
    });

    // Update summary statistics
    statTotalEl.textContent    = totalVisible;
    statRealisedEl.textContent = realisedVisible;
    statOngoingEl.textContent  = ongoingVisible;
    statProjectEl.textContent  = projectVisible;
    statBudgetEl.textContent   = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(budgetVisible);
  }

  // Event listeners
  statusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      statusButtons.forEach(b => b.classList.remove('active-status-btn'));
      btn.classList.add('active-status-btn');
      applyFilters();
    });
  });

  themeSelect.addEventListener('change', () => {
    applyFilters();
  });
  yearSelect.addEventListener('change', () => {
    applyFilters();
  });
  searchInput.addEventListener('input', () => {
    applyFilters();
  });
  resetBtn.addEventListener('click', () => {
    // Reset selects and search input
    themeSelect.value = '';
    yearSelect.value  = '';
    searchInput.value = '';
    // Reset status buttons
    statusButtons.forEach(b => b.classList.remove('active-status-btn'));
    // Activate 'all'
    const allButton = Array.from(statusButtons).find(b => b.dataset.status === 'all');
    if (allButton) allButton.classList.add('active-status-btn');
    // Close any open accordion panels
    const panels = accordionContainer.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
      const header = panel.querySelector('.accordion-header');
      const body   = panel.querySelector('.accordion-body');
      if (body.classList.contains('open')) {
        body.classList.remove('open');
        body.style.maxHeight = null;
      }
      header.classList.remove('open');
    });
    applyFilters();
  });

  // Build accordion and initialise view
  buildAccordion();
  // Initially activate "Tous" button
  const defaultButton = Array.from(statusButtons).find(b => b.dataset.status === 'all');
  if (defaultButton) defaultButton.classList.add('active-status-btn');
  // Apply filters (none) to fill stats
  applyFilters();
});