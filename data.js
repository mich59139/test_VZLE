// data.js : Base de données des 128 réalisations mise à jour depuis le CSV
const vizilleData = [
    {
        id: "P001",
        theme: "SANTÉ",
        titre: "Réouverture du centre d'imagerie médicale",
        description: "157 rue Colonel Manhès, matériel dernière génération",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P002",
        theme: "SANTÉ",
        titre: "Programme ""Sport Santé"" local",
        description: "En lien avec l'hôpital de Grenoble et le centre local de réadaptation. Prise en charge des patients sur la commune.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P003",
        theme: "SANTÉ",
        titre: "Acquisition de la maison de santé",
        description: "Finalisation de l'acquisition de la maison de santé, avec convention d'occupation à long terme pour les professionnels.",
        statut: "Achevé",
        montant: 360000,
        annee: 2025
    },
    {
        id: "P004",
        theme: "SANTÉ",
        titre: "Accueil de 4 nouveaux médecins généralistes",
        description: "Campagne de recrutement et soutien à l'installation de nouveaux médecins pour pallier la pénurie locale.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P005",
        theme: "SANTÉ",
        titre: "Ouverture d'une Maison de Service Au Public (MSAP)",
        description: "Création d'un guichet unique d'aide administrative pour l'accès aux droits et la santé.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P006",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Éclairage public – extinction nocturne",
        description: "Extinction 23h-5h, -51% consommation 2022-2024. Économie annuelle de 20 000€.",
        statut: "Achevé",
        montant: 0,
        annee: 2022
    },
    {
        id: "P007",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Installation de Sites de compostage de Quartier",
        description: "Installation de 3 sites de compostage en libre accès (Chantefeuille, École du Château, etc.).",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P008",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Soutien au Plan Climat Air Énergie Territorial (PCAET)",
        description: "Participation active au comité de pilotage, déploiement des actions sur la commune.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P009",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Installation d'ombrières photovoltaïques",
        description: "Installation d'ombrières photovoltaïques sur le parking du Parc et d'autres bâtiments municipaux.",
        statut: "En cours",
        montant: 180000,
        annee: 2026
    },
    {
        id: "P010",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Amélioration de la gestion de l'eau (réduction des fuites)",
        description: "Remplacement de 2,2 km de canalisations, permettant de réduire de 40% les pertes d'eau. Travaux avec la Métropole.",
        statut: "En cours",
        montant: 540000,
        annee: 2026
    },
    {
        id: "P011",
        theme: "MOBILITÉS",
        titre: "Premières pistes cyclables",
        description: "Secteur Péage + rue A. Briand vers le lycée. Création des premiers kilomètres de pistes protégées.",
        statut: "En cours",
        montant: 200000,
        annee: 2025
    },
    {
        id: "P012",
        theme: "MOBILITÉS",
        titre: "Réseau de Bornes électriques",
        description: "Installation de bornes de recharges électriques sur le territoire, en lien avec la Métropole.",
        statut: "En cours",
        montant: 50000,
        annee: 2025
    },
    {
        id: "P013",
        theme: "MOBILITÉS",
        titre: "Accès à la gare de Vif",
        description: "Amélioration de la connexion et de la fréquence de la ligne 70 pour faciliter l'accès à la gare.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P014",
        theme: "MOBILITÉS",
        titre: "Bus gratuit pour les 6-25 ans",
        description: "Mise en place de la gratuité pour tous les jeunes sur le réseau TAG.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P015",
        theme: "MOBILITÉS",
        titre: "Plan de Circulation et Stationnement du Centre-Ville",
        description: "Révision complète des zones de stationnement et de la circulation, y compris les zones bleues.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P016",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Aménagement Rue Général de Gaulle / Centre-ville",
        description: "Rénovation complète et apaisement de la rue principale et du centre.",
        statut: "En cours",
        montant: 917200,
        annee: 2025
    },
    {
        id: "P017",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Réaménagement du Secteur des Tanneries",
        description: "Démolition des anciens bâtiments et lancement de l'aménagement, création de nouveaux logements et espaces publics.",
        statut: "Prévu",
        montant: 500000,
        annee: 2026
    },
    {
        id: "P018",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation thermique Mairie & Bâtiments publics",
        description: "Mise en œuvre du programme de rénovation énergétique de la Mairie et d'autres bâtiments pour réduire les coûts et l'empreinte carbone.",
        statut: "En cours",
        montant: 150000,
        annee: 2026
    },
    {
        id: "P019",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation de la voûte éclairante du gymnase du parc",
        description: "Réparation de la voûte du gymnase du parc endommagée par un orage.",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "P020",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Amélioration des trottoirs",
        description: "Programme de réfection et d'accessibilité des trottoirs sur l'ensemble de la commune.",
        statut: "En cours",
        montant: 180000,
        annee: 2025
    },
    {
        id: "P021",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Installation d'un Mur Anti-Bruit (RN85)",
        description: "Étude et installation d'une protection acoustique le long de la RN85 pour le quartier de la Salette.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P022",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Amélioration de l'Accessibilité PMR (Personnes à Mobilité Réduite)",
        description: "Mise en conformité des locaux et des espaces publics, avec une enveloppe annuelle dédiée.",
        statut: "En cours",
        montant: 50000,
        annee: 2025
    },
    {
        id: "P023",
        theme: "CULTURE & PATRIMOINE",
        titre: "Restauration de l'Orgue de l'Église",
        description: "Achèvement des travaux de restauration de l'orgue, patrimoine historique de la ville.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P024",
        theme: "CULTURE & PATRIMOINE",
        titre: "Aménagement des archives municipales",
        description: "Création d'un espace d'archivage moderne et sécurisé, accessible au public et aux chercheurs.",
        statut: "En cours",
        montant: 60000,
        annee: 2026
    },
    {
        id: "P025",
        theme: "CULTURE & PATRIMOINE",
        titre: "Soutien aux associations culturelles",
        description: "Augmentation des subventions et aide logistique aux associations dynamisant la vie culturelle locale.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P026",
        theme: "CULTURE & PATRIMOINE",
        titre: "Nouvelle édition du Festival de l'Histoire",
        description: "Pérennisation et développement du festival annuel en partenariat avec le Musée de la Révolution Française.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P027",
        theme: "HABITAT & LOGEMENT",
        titre: "Opération Programmée d'Amélioration de l'Habitat (OPAH)",
        description: "Soutien aux propriétaires privés pour la rénovation énergétique et l'amélioration de leur logement, en lien avec l'ANAH.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P028",
        theme: "HABITAT & LOGEMENT",
        titre: "Lutte contre l'habitat indigne et les marchands de sommeil",
        description: "Renforcement des contrôles et mise en place d'outils juridiques pour la réhabilitation des logements insalubres.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P029",
        theme: "HABITAT & LOGEMENT",
        titre: "Création de logements sociaux neufs",
        description: "Accompagnement de projets de construction pour augmenter l'offre de logements sociaux, notamment secteur Tanneries.",
        statut: "Prévu",
        montant: 0,
        annee: 2026
    },
    {
        id: "P030",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Rénovation de la crèche « Les Petits Drôles »",
        description: "Fin des travaux de rénovation et réorganisation interne. Amélioration des conditions d'accueil.",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "P031",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Rénovation de la cuisine centrale scolaire",
        description: "Mise aux normes et modernisation des équipements pour assurer une meilleure qualité des repas.",
        statut: "En cours",
        montant: 120000,
        annee: 2026
    },
    {
        id: "P032",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Cour École Paul Langevin : Îlot de fraîcheur",
        description: "Désimperméabilisation et végétalisation de la cour d'école pour lutter contre la chaleur.",
        statut: "Prévu",
        montant: 296000,
        annee: 2025
    },
    {
        id: "P033",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Clôture du canal du Gua (École du Château)",
        description: "Installation d'une clôture sécurisée le long du canal pour protéger les abords de l'école.",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "P034",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Rénovation des sanitaires scolaires",
        description: "Programme pluriannuel de modernisation et d'amélioration de l'hygiène des sanitaires dans toutes les écoles.",
        statut: "En cours",
        montant: 80000,
        annee: 2025
    },
    {
        id: "P035",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Soutien aux projets pédagogiques innovants",
        description: "Subventions spécifiques pour les classes développant des projets écologiques ou numériques.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P036",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Installation d'un City Stade de Proximité",
        description: "Création d'un nouvel équipement sportif polyvalent en accès libre, Quartier Chantefeuille.",
        statut: "Achevé",
        montant: 90000,
        annee: 2025
    },
    {
        id: "P037",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Rénovation des vestiaires du stade",
        description: "Mise aux normes et rénovation complète des vestiaires du stade municipal.",
        statut: "En cours",
        montant: 150000,
        annee: 2026
    },
    {
        id: "P038",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Réfection du sol sportif du gymnase du lycée",
        description: "Travaux d'entretien en partenariat avec la Région pour un sol plus sûr et plus performant.",
        statut: "Prévu",
        montant: 100000,
        annee: 2027
    },
    {
        id: "P039",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Création d'un guichet unique pour les associations",
        description: "Centralisation de l'aide administrative et logistique aux associations locales.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P040",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Augmentation des créneaux d'accès aux équipements",
        description: "Optimisation du planning pour permettre à plus d'associations d'utiliser les gymnases et salles.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P041",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Déploiement de la Vidéoprotection",
        description: "Installation de caméras sur des points stratégiques définis en collaboration avec la Gendarmerie.",
        statut: "En cours",
        montant: 160000,
        annee: 2025
    },
    {
        id: "P042",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Patrouille de nuit de la Police Municipale",
        description: "Mise en place de patrouilles régulières en soirée et la nuit pour une meilleure présence sur le terrain.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P043",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Amélioration de l'éclairage public",
        description: "Remplacement des luminaires obsolètes par des LED plus performantes pour augmenter la sécurité des piétons.",
        statut: "En cours",
        montant: 150000,
        annee: 2026
    },
    {
        id: "P044",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Opération Tranquillité Vacances toute l'année",
        description: "Extension du dispositif de surveillance des domiciles aux périodes hors vacances scolaires, sur demande.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P045",
        theme: "JEUNESSE & LOISIRS",
        titre: "Création de la Maison des Jeunes",
        description: "Création d'un lieu dédié pour les 16-25 ans offrant des activités, des ateliers d'aide à l'emploi et des permanences.",
        statut: "Prévu",
        montant: 450000,
        annee: 2027
    },
    {
        id: "P046",
        theme: "JEUNESSE & LOISIRS",
        titre: "Chantiers Jeunes Bénévoles (Vacances)",
        description: "Mise en place de chantiers rémunérés pour les jeunes en échange de travaux d'intérêt général sur la commune.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P047",
        theme: "JEUNESSE & LOISIRS",
        titre: "Partenariat avec la Mission Locale",
        description: "Renforcement de l'accompagnement des jeunes de 16 à 25 ans vers l'emploi et la formation.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P048",
        theme: "FINANCES & GESTION",
        titre: "Maîtrise de la fiscalité locale",
        description: "Vote des budgets sans augmentation des taux d'imposition communaux pour la durée du mandat.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P049",
        theme: "FINANCES & GESTION",
        titre: "Réduction de la dette municipale",
        description: "Poursuite du désendettement engagé depuis 2020.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P050",
        theme: "FINANCES & GESTION",
        titre: "Augmentation de la capacité d'autofinancement",
        description: "Gestion rigoureuse permettant de dégager des marges pour les investissements sans emprunt excessif.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P051",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Installation de nichoirs et de refuges LPO",
        description: "Soutien à la biodiversité locale par l'installation de nichoirs et gîtes pour animaux (hubs, martinets).",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "P052",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Installation de VMC double flux à l'école élémentaire",
        description: "Amélioration de la qualité de l'air intérieur dans les salles de classe, réduction des pertes d'énergie.",
        statut: "En cours",
        montant: 75000,
        annee: 2026
    },
    {
        id: "P053",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Réfection de la toiture du Château de La Salette",
        description: "Travaux d'urgence et de conservation sur la toiture pour protéger le bâtiment historique.",
        statut: "Achevé",
        montant: 0,
        annee: 2024
    },
    {
        id: "P054",
        theme: "HABITAT & LOGEMENT",
        titre: "Aide à l'installation des jeunes ménages",
        description: "Dispositifs d'aide pour l'accès au premier logement ou la primo-accession à la propriété (étude en cours).",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P055",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Recrutement de deux agents de Police Municipale supplémentaires",
        description: "Augmentation des effectifs pour renforcer la présence et la proximité avec les habitants.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P056",
        theme: "CULTURE & PATRIMOINE",
        titre: "Ouverture de la bibliothèque le dimanche matin",
        description: "Extension des horaires d'ouverture pour faciliter l'accès à la culture pour tous les publics.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P057",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Ravalement de façade du Centre Administratif",
        description: "Travaux de rénovation esthétique et d'isolation de la façade du centre administratif.",
        statut: "En cours",
        montant: 120000,
        annee: 2026
    },
    {
        id: "P058",
        theme: "MOBILITÉS",
        titre: "Poursuite du développement du covoiturage",
        description: "Aménagement d'aires dédiées et promotion des plateformes de covoiturage, en lien avec la Métropole.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P059",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Plan de gestion des zones humides",
        description: "Protection et valorisation des zones humides et des cours d'eau sur le territoire communal.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P060",
        theme: "SANTÉ",
        titre: "Formation aux premiers secours pour le personnel communal",
        description: "Généralisation des formations aux gestes qui sauvent pour les agents municipaux.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P061",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Installation d'un nouveau mobilier pour les accueils périscolaires",
        description: "Remplacement du mobilier ancien par des équipements modernes et ergonomiques.",
        statut: "En cours",
        montant: 40000,
        annee: 2026
    },
    {
        id: "P062",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Modernisation des équipements de la salle de gymnastique",
        description: "Achat de nouveaux agrès et tapis de sécurité.",
        statut: "Prévu",
        montant: 70000,
        annee: 2027
    },
    {
        id: "P063",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Création d'un Jardin Partagé Quartier de la Gare",
        description: "Aménagement d'un espace vert dédié au jardinage collectif et aux rencontres intergénérationnelles.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P064",
        theme: "FINANCES & GESTION",
        titre: "Optimisation des contrats de fourniture d'énergie",
        description: "Renégociation des contrats pour obtenir des tarifs plus avantageux et réduire les charges de fonctionnement.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P065",
        theme: "CULTURE & PATRIMOINE",
        titre: "Numérisation des collections de la bibliothèque",
        description: "Projet de numérisation pour un accès en ligne à une partie des fonds documentaires.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P066",
        theme: "MOBILITÉS",
        titre: "Sécurisation des abords des écoles (zones 30)",
        description: "Déploiement de zones 30km/h autour de toutes les écoles, avec aménagements physiques de sécurité.",
        statut: "En cours",
        montant: 110000,
        annee: 2025
    },
    {
        id: "P067",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Extension de la capacité de la crèche municipale",
        description: "Augmentation du nombre de places disponibles pour répondre à la demande croissante (étude de faisabilité).",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P068",
        theme: "SANTÉ",
        titre: "Partenariat avec la Prévention Routière",
        description: "Organisation de stages de sensibilisation aux risques routiers et aux mobilités douces.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P069",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Réhabilitation des lavoirs communaux",
        description: "Restauration des lavoirs de la commune pour préserver le petit patrimoine.",
        statut: "En cours",
        montant: 45000,
        annee: 2026
    },
    {
        id: "P070",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Soutien aux jardins privés pour la végétalisation",
        description: "Distribution de graines et conseils pour encourager la végétalisation des cours et balcons privés.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P071",
        theme: "HABITAT & LOGEMENT",
        titre: "Création d'une réserve foncière pour l'habitat",
        description: "Acquisition de terrains stratégiques pour maîtriser le développement futur de l'habitat.",
        statut: "En cours",
        montant: 200000,
        annee: 2026
    },
    {
        id: "P072",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Renforcement de l'équipement de la Police Municipale",
        description: "Achat de gilets pare-balles, radiocommunication numérique et véhicules neufs.",
        statut: "Achevé",
        montant: 50000,
        annee: 2025
    },
    {
        id: "P073",
        theme: "CULTURE & PATRIMOINE",
        titre: "Création d'un sentier du patrimoine",
        description: "Développement d'un parcours balisé reliant les principaux lieux historiques de la commune.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P074",
        theme: "MOBILITÉS",
        titre: "Installation de racks à vélos sécurisés",
        description: "Mise en place de structures de stationnement sécurisé dans les zones d'activités et transports.",
        statut: "En cours",
        montant: 20000,
        annee: 2026
    },
    {
        id: "P075",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Rénovation de la cour de l'école maternelle",
        description: "Création de nouveaux jeux et amélioration des revêtements de sol.",
        statut: "Prévu",
        montant: 180000,
        annee: 2027
    },
    {
        id: "P076",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Installation de tableaux d'affichage sportif électroniques",
        description: "Modernisation des affichages dans les principaux gymnases.",
        statut: "Achevé",
        montant: 30000,
        annee: 2025
    },
    {
        id: "P077",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation de l'aire de jeux du Parc",
        description: "Remplacement des structures vieillissantes par des jeux inclusifs et adaptés.",
        statut: "En cours",
        montant: 60000,
        annee: 2026
    },
    {
        id: "P078",
        theme: "JEUNESSE & LOISIRS",
        titre: "Création d'un Pass'Jeunes pour les activités locales",
        description: "Mise en place d'un chéquier de réductions pour les activités sportives et culturelles pour les 12-18 ans.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P079",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Rénovation des caméras existantes",
        description: "Mise à niveau technologique des anciennes caméras de vidéoprotection.",
        statut: "En cours",
        montant: 40000,
        annee: 2026
    },
    {
        id: "P080",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Subventions pour l'achat de vélos électriques",
        description: "Mise en place d'une aide financière communale pour l'acquisition de vélos à assistance électrique.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P081",
        theme: "FINANCES & GESTION",
        titre: "Déploiement de la dématérialisation des démarches administratives",
        description: "Simplification des procédures par l'accès en ligne aux formulaires et demandes courantes.",
        statut: "En cours",
        montant: 0,
        annee: 2025
    },
    {
        id: "P082",
        theme: "HABITAT & LOGEMENT",
        titre: "Plan de prévention des risques (inondations, mouvements de terrain)",
        description: "Mise à jour et application des règles d'urbanisme liées à la prévention des risques naturels.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P083",
        theme: "CULTURE & PATRIMOINE",
        titre: "Mise en valeur de la Pierre du Calvaire",
        description: "Restauration du monument et aménagement de ses abords.",
        statut: "En cours",
        montant: 15000,
        annee: 2026
    },
    {
        id: "P084",
        theme: "SANTÉ",
        titre: "Campagnes de dépistage et de prévention annuelles",
        description: "Organisation d'événements de prévention (diabète, cancers, etc.) en lien avec l'ARS.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P085",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Passage aux produits locaux et bio en restauration scolaire",
        description: "Augmentation progressive de la part des produits locaux et labellisés dans les menus de la cantine.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P086",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation de l'éclairage public du quartier de la Salette",
        description: "Remplacement des anciennes lanternes par des LED plus économes et performantes.",
        statut: "En cours",
        montant: 95000,
        annee: 2026
    },
    {
        id: "P087",
        theme: "MOBILITÉS",
        titre: "Aménagement d'une nouvelle ligne de bus (étude)",
        description: "Étude pour une desserte des quartiers périphériques moins bien connectés.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P088",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Aide à l'organisation d'événements sportifs majeurs",
        description: "Soutien logistique et financier accru aux courses, compétitions et tournois régionaux.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P089",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Installation de ralentisseurs et de chicanes",
        description: "Poursuite du programme de sécurisation des voies les plus accidentogènes.",
        statut: "En cours",
        montant: 70000,
        annee: 2026
    },
    {
        id: "P090",
        theme: "JEUNESSE & LOISIRS",
        titre: "Voyages et sorties culturelles pour les jeunes",
        description: "Organisation de voyages subventionnés pour l'accès aux grandes métropoles ou musées.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P091",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Nettoyage des berges du Romanche",
        description: "Organisation de chantiers citoyens annuels pour la collecte des déchets le long de la rivière.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P092",
        theme: "CULTURE & PATRIMOINE",
        titre: "Rénovation du petit théâtre communal",
        description: "Travaux d'isolation acoustique et de mise aux normes de sécurité.",
        statut: "Prévu",
        montant: 250000,
        annee: 2027
    },
    {
        id: "P093",
        theme: "HABITAT & LOGEMENT",
        titre: "Création d'un observatoire de l'immobilier",
        description: "Suivi des prix et des transactions pour adapter la politique locale d'urbanisme.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P094",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Achat de matériel informatique neuf pour les écoles",
        description: "Renouvellement du parc informatique des classes (tablettes, ordinateurs).",
        statut: "En cours",
        montant: 60000,
        annee: 2026
    },
    {
        id: "P095",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Aménagement paysager des entrées de ville",
        description: "Création de massifs fleuris et amélioration de l'esthétique aux portes de la commune.",
        statut: "En cours",
        montant: 30000,
        annee: 2025
    },
    {
        id: "P096",
        theme: "SANTÉ",
        titre: "Subventions pour l'aide à domicile aux personnes âgées",
        description: "Augmentation des aides pour le maintien à domicile et les services de portage de repas.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P097",
        theme: "MOBILITÉS",
        titre: "Développement des lignes de bus intra-muros",
        description: "Création de boucles de bus courtes et efficaces pour desservir le cœur de ville et les commerces.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P098",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Installation d'un mur d'escalade en extérieur",
        description: "Création d'une structure en accès libre dans un espace vert.",
        statut: "En cours",
        montant: 40000,
        annee: 2026
    },
    {
        id: "P099",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Programme de prévention des cambriolages (marquage des biens)",
        description: "Organisation de sessions de marquage des vélos et du matériel de valeur.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P100",
        theme: "JEUNESSE & LOISIRS",
        titre: "Création d'une ludothèque municipale",
        description: "Aménagement d'un espace de jeux et de prêt de jeux de société pour tous les âges.",
        statut: "Prévu",
        montant: 150000,
        annee: 2027
    },
    {
        id: "P101",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Installation de fontaines à eau publiques",
        description: "Réduction des déchets plastiques et accès à l'eau potable dans l'espace public.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P102",
        theme: "FINANCES & GESTION",
        titre: "Audit annuel des dépenses de fonctionnement",
        description: "Contrôle régulier des postes de dépenses pour identifier les sources d'économies.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P103",
        theme: "CULTURE & PATRIMOINE",
        titre: "Partenariat avec le Musée de la Révolution Française",
        description: "Développement d'événements et d'expositions communes.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P104",
        theme: "HABITAT & LOGEMENT",
        titre: "Accompagnement des copropriétés dégradées",
        description: "Mise en place de diagnostics et de subventions pour les travaux dans les copropriétés anciennes.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P105",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Rénovation du système de chauffage de l'école maternelle",
        description: "Passage à un système plus performant et moins énergivore.",
        statut: "En cours",
        montant: 110000,
        annee: 2026
    },
    {
        id: "P106",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Création d'une forêt urbaine",
        description: "Végétalisation intensive d'un espace pour créer un îlot de biodiversité et de fraîcheur.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P107",
        theme: "MOBILITÉS",
        titre: "Bornes de recharge pour vélos électriques",
        description: "Installation de stations de recharge rapide dans des lieux stratégiques de la ville.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P108",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Rénovation du terrain de pétanque communal",
        description: "Réfection du sol et aménagement de l'éclairage.",
        statut: "En cours",
        montant: 25000,
        annee: 2026
    },
    {
        id: "P109",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Déploiement de l'application d'alerte citoyenne",
        description: "Mise en place d'un outil de communication rapide entre la mairie et les habitants pour les alertes (météo, sécurité).",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P110",
        theme: "SANTÉ",
        titre: "Création de parcours de santé balisés",
        description: "Aménagement de sentiers de marche et de jogging avec équipements sportifs légers.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P111",
        theme: "JEUNESSE & LOISIRS",
        titre: "Accès facilité aux équipements sportifs pour les jeunes",
        description: "Mise en place de créneaux dédiés et gratuits dans les gymnases pendant les vacances scolaires.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P112",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Installation de ruches pédagogiques",
        description: "Soutien à l'apiculture locale et sensibilisation à la protection des pollinisateurs.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P113",
        theme: "FINANCES & GESTION",
        titre: "Modernisation des équipements de bureau",
        description: "Remplacement du matériel informatique ancien pour améliorer l'efficacité des services administratifs.",
        statut: "En cours",
        montant: 80000,
        annee: 2026
    },
    {
        id: "P114",
        theme: "CULTURE & PATRIMOINE",
        titre: "Organisation d'un marché de Noël artisanal",
        description: "Pérennisation d'un événement festif et promotion des artisans locaux.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P115",
        theme: "HABITAT & LOGEMENT",
        titre: "Aide à la rénovation des façades du centre historique",
        description: "Subventions pour encourager les propriétaires à restaurer les façades selon les chartes patrimoniales.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P116",
        theme: "VIE SCOLAIRE & PETITE ENFANCE",
        titre: "Mise en place d'une navette scolaire sécurisée",
        description: "Création d'un service de transport dédié aux écoliers des quartiers éloignés.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P117",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation de la fontaine de la Place du Château",
        description: "Restauration du mécanisme et de la maçonnerie de la fontaine.",
        statut: "En cours",
        montant: 35000,
        annee: 2026
    },
    {
        id: "P118",
        theme: "MOBILITÉS",
        titre: "Installation de miroirs de sécurité aux carrefours dangereux",
        description: "Amélioration de la visibilité sur les intersections répertoriées comme sensibles.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P119",
        theme: "SPORTS & VIE ASSOCIATIVE",
        titre: "Formation aux premiers secours pour les encadrants sportifs",
        description: "Prise en charge des coûts de formation pour garantir la sécurité dans les clubs.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P120",
        theme: "SÉCURITÉ & PROXIMITÉ",
        titre: "Installation de défibrillateurs en libre accès",
        description: "Déploiement de DAE sur plusieurs sites publics stratégiques.",
        statut: "En cours",
        montant: 15000,
        annee: 2026
    },
    {
        id: "P121",
        theme: "JEUNESSE & LOISIRS",
        titre: "Soutien aux échanges internationaux pour les jeunes",
        description: "Subventions et aide logistique aux projets de jumelage et de mobilité européenne.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P122",
        theme: "ENVIRONNEMENT & TRANSITION ÉCOLOGIQUE",
        titre: "Plantation d'arbres fruitiers en accès libre",
        description: "Création d'un verger communal participatif dans un espace vert.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P123",
        theme: "FINANCES & GESTION",
        titre: "Mise en place du Budget Participatif",
        description: "Création d'une enveloppe budgétaire dédiée aux projets proposés et votés par les habitants.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P124",
        theme: "CULTURE & PATRIMOINE",
        titre: "Organisation d'un festival de musique en plein air",
        description: "Création d'un nouvel événement estival gratuit, mettant en avant les artistes locaux.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    },
    {
        id: "P125",
        theme: "SANTÉ",
        titre: "Campagne de vaccination antigrippale en mairie",
        description: "Facilitation de l'accès à la vaccination pour les publics prioritaires.",
        statut: "Achevé",
        montant: 0,
        annee: 2025
    },
    {
        id: "P126",
        theme: "HABITAT & LOGEMENT",
        titre: "Mise en place de permis de louer et de diviser",
        description: "Encadrement des locations et des divisions de logements pour garantir la qualité de l'habitat.",
        statut: "En cours",
        montant: 0,
        annee: 2026
    },
    {
        id: "P127",
        theme: "URBANISME & CADRE DE VIE",
        titre: "Rénovation du marché couvert",
        description: "Modernisation des étals et des infrastructures du marché pour accueillir plus de commerçants.",
        statut: "Prévu",
        montant: 300000,
        annee: 2027
    },
    {
        id: "P128",
        theme: "MOBILITÉS",
        titre: "Subventions pour l'achat de trottinettes électriques",
        description: "Aide financière pour encourager les micro-mobilités douces.",
        statut: "Prévu",
        montant: 0,
        annee: 2027
    }
];
