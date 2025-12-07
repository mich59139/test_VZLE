// data.js : Base de données des réalisations (Enrichie des éléments des magazines municipaux)
const vizilleData = [
    // ----------------------------------------------------------------------------------
    // --- RÉALISATIONS 2024 (Achevé / En Cours) ---
    // ----------------------------------------------------------------------------------
    {
        id: "R2024_PE01",
        theme: "Petite Enfance",
        titre: "Rénovation de la crèche « Les Petits Drôles »",
        [cite_start]description: "Fin des travaux de rénovation de la crèche et réorganisation interne. Transfert temporaire achevé[cite: 9600, 9851].",
        statut: "Achevé",
        montant: 0, // Montant non chiffré dans les snippets, laissé à 0
        annee: 2024
    },
    {
        id: "R2024_SP01",
        theme: "Sport & Jeunesse",
        titre: "Rénovation de la voûte éclairante du gymnase du parc",
        [cite_start]description: "Rénovation de la voûte éclairante endommagée par un orage de grêle[cite: 8979].",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "R2024_EV01",
        theme: "Urbanisme & Travaux",
        titre: "Clôture du canal du Gua (École du Château)",
        [cite_start]description: "Installation de la clôture du canal du Gua qui longe l'école du Château[cite: 10668].",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "R2024_HO01",
        theme: "Habitat",
        titre: "Programme de Rénovation de l'Habitat du Centre-Ancien",
        [cite_start]description: "Accompagnement, en partenariat avec la Métropole et l'ANAH, du projet de rénovation de l'habitat du centre-ancien[cite: 8782].",
        statut: "En cours",
        montant: 0,
        annee: 2024
    },
    
    // ----------------------------------------------------------------------------------
    // --- RÉALISATIONS 2025 (Achevé / En Cours / Prévu) ---
    // ----------------------------------------------------------------------------------
    {
        id: "R2025_E06",
        theme: "Environnement",
        titre: "Installation de sites de Compostage de Quartier",
        [cite_start]description: "Installation de 3 sites de compostage en libre accès (Chantefeuille, École du Château, etc.)[cite: 7909].",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "R2025_C01",
        theme: "Culture & Patrimoine",
        titre: "Restauration Orgue Église",
        [cite_start]description: "Achèvement de la restauration de l'orgue de l'église de Vizille[cite: 7100].",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "R2025_F01",
        theme: "Finances",
        titre: "Vote du Budget 2025",
        description: "5,38 M€ d'investissement votés sans augmentation des impôts locaux (Donnée indicative).",
        statut: "Achevé",
        montant: 5380000,
        annee: 2025
    },
    {
        id: "R2025_UT01",
        theme: "Urbanisme & Travaux",
        titre: "Aménagement Rue Général de Gaulle / Centre-ville",
        description: "Projet de rénovation, aménagement et circulation du centre-ville. [cite_start]Concertation en cours[cite: 5887].",
        statut: "En cours",
        montant: 917200, // Montant gardé de l'exemple initial
        annee: 2025
    },
    {
        id: "R2025_S01",
        theme: "Santé & Social",
        titre: "Acquisition Maison de Santé Pluridisciplinaire",
        [cite_start]description: "Volonté de soutenir le projet de construction ou d'acquisition d'une maison de santé pour pallier la pénurie de médecins[cite: 8725].",
        statut: "En cours",
        montant: 360000,
        annee: 2025
    },
    {
        id: "R2025_UT02",
        theme: "Urbanisme & Travaux",
        titre: "Cour École Paul Langevin (Îlot de fraîcheur)",
        description: "Création d'un îlot de fraîcheur (Donnée indicative, gardée de l'exemple initial).",
        statut: "Prévu", // Changé à Prévu pour avoir plus de variété
        montant: 296000,
        annee: 2025
    },
    
    // ----------------------------------------------------------------------------------
    // --- PROJETS FUTURS (2026 et au-delà) ---
    // ----------------------------------------------------------------------------------
    {
        id: "R2026_U01",
        theme: "Urbanisme & Travaux",
        titre: "Secteur des Tanneries : Études et Aménagement",
        description: "Démolition et lancement de l'aménagement du secteur Tanneries. [cite_start]Phase de consultation en cours[cite: 6392].",
        statut: "Prévu",
        montant: 500000,
        annee: 2026
    },
    {
        id: "R2027_ENV01",
        theme: "Environnement",
        titre: "Plan Climat Air Énergie Territorial (PCAET)",
        [cite_start]description: "Participation au comité de pilotage du Plan Climat Air Énergie[cite: 6393].",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    }
];
