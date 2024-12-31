class Globals {
  catActive = [
    { value: 1, text: "Titres de société" },
    { value: 2, text: "Résidence principale" },
    { value: 3, text: "Résidence secondaire" },
    { value: 4, text: "Immeubles de rendement" },
    { value: 5, text: "Epargne disponible" },
    { value: 6, text: "Epargne bloquée  (tontine, fiducie, trust,…)" },
    { value: 7, text: "Œuvre d’art" },
    { value: 8, text: "Véhicule de collection" },
    { value: 9, text: "Bateau" },
    { value: 99, text: "Autres" },
  ];

  catPassive = [
    { value: 1, text: "Emprunt bancaire classique" },
    { value: 2, text: "Emprunt in fine" },
    { value: 3, text: "Emprunt particulier (prêts familiaux…)" },
    {
      value: 4,
      text: "Dette fiscale et sociale (échéancier suite à redressement)",
    },
    { value: 99, text: "Autres" },
  ];

  civilities = [
    { value: 1, name: "Monsieur", short: "M." },
    { value: 2, name: "Madame", short: "Mme" },
  ];

  civilStats = [
    { value: 0, text: "Célibataire" },
    { value: 1, text: "Divorcé(e)" },
    { value: 2, text: "Veuf(ve)" },
    { value: 3, text: "Marié(e)" },
    { value: 4, text: "Pacsé(e)" },
    { value: 5, text: "Décédé(e)" },
    { value: 90, text: "Autre" },
  ];

  configTypes = [
    {
      scope: 5,
      path: "/configs/bank-details",
      display: ["name", "description", "bank", "bic", "iban"],
      name: "RIBs",
      buttonName: "un RIB",
      formPath: "/configs/bank-detail-form",
    },
    {
      scope: 6,
      path: "/configs/letter-templates",
      display: ["name", "type"],
      name: "Modèles de lettres de mission",
      buttonName: "un modèle de LDM",
      formPath: "/configs/letter-template-form",
    },
    {
      scope: 7,
      path: "/configs/blocks",
      display: ["name"],
      name: "Blocs",
      buttonName: "un bloc",
      formPath: "/configs/block-form",
    },
    {
      scope: 8,
      path: "/configs/natures",
      display: ["name", "alertDelay", "templates"],
      name: "Natures",
      buttonName: "une nature",
      formPath: "/configs/nature-form",
    },
    {
      scope: 9,
      path: "/configs/prices",
      display: ["name", "value", "type"],
      name: "Tarifs",
      buttonName: "un tarif",
      formPath: "/configs/price-form",
    },
    {
      scope: 10,
      path: "/configs/customer-configs",
      display: ["name", "colorCode"],
      name: "Types de clients",
      buttonName: "un type de client",
      formPath: "/configs/customer-form",
    },
    {
      scope: 11,
      path: "/configs/tasks",
      display: ["name"],
      name: "Tâches",
      buttonName: "une tâche",
      formPath: "/configs/task-form",
    },
  ];

  displayTranslation = [
    { eng: "name", fr: "Nom" },
    { eng: "description", fr: "Description" },
    { eng: "bank", fr: "Banque" },
    { eng: "bic", fr: "BIC" },
    { eng: "iban", fr: "IBAN" },
    { eng: "type", fr: "Type" },
    { eng: "alertDelay", fr: "Délai d'alerte" },
    { eng: "templates", fr: "Modèles" },
    { eng: "value", fr: "Valeur" },
    { eng: "colorCode", fr: "Code couleur" },
  ];

  letterTemplateTypes = [
    { id: 1, name: "Lettre de mission" },
    { id: 2, name: "Lettre de résultat" },
    { id: 3, name: "Lettre de donation" },
    { id: 4, name: "Lettre d'abonnement" },
    { id: 5, name: "Lettre de mission au taux horaire" },
  ];

  letterTemplateVariables = [
    {
      name: "CONTACTDATE",
      description: "Date de contact renseignée dans la lettre de mission",
    },
    {
      name: "OVERVIEW",
      description: "Description de la lettre de mission",
    },
    {
      name: "ACCOMPTE",
      description: "Montant de l'accompte",
    },
    {
      name: "AMOUNT",
      description: "Montant total",
    },
    {
      name: "VALUEPRICE%",
      description: "Pourcentage du prix",
    },
    {
      name: "VALUEOBOFEE",
      description: "Valeur OBO",
    },
    {
      name: "POSTOBOFEE",
      description: "Valeur post-OBO",
    },
  ];
  contractMarriedRegime = [
    { value: 0, text: "Inconnu" },
    { value: 1, text: "Mariage sous le régime légal" },
    { value: 2, text: "Mariage sous le régime de la séparation de biens" },
    {
      value: 3,
      text: "Mariage sous le régime de la communauté réduite aux acquêts",
    },
    {
      value: 4,
      text: "Mariage sous le régime de la communauté universelle",
    },
    { value: 99, text: "Autre" },
  ];

  contractPacsRegime = [
    { value: 0, text: "Inconnu" },
    {
      value: 5,
      text: "Pacte civil de solidarité sous le régime de la séparation",
    },
    {
      value: 6,
      text: "Pacte civil de solidarité sous le régime de l’indivision",
    },
  ];

  months = [
    { value: 1, text: "Janvier" },
    { value: 2, text: "Février" },
    { value: 3, text: "Mars" },
    { value: 4, text: "Avril" },
    { value: 5, text: "Mai" },
    { value: 6, text: "Juin" },
    { value: 7, text: "Juillet" },
    { value: 8, text: "Août" },
    { value: 9, text: "Septembre" },
    { value: 10, text: "Octobre" },
    { value: 11, text: "Novembre" },
    { value: 12, text: "Décembre" },
  ];

  priceTypes = [
    { id: "1", name: "Forfait", unit: "€" },
    { id: "2", name: "Tarif horaire", unit: "€" },
    { id: "3", name: "Pourcentage du résultat", unit: "%" },
    { id: "4", name: "Résultat OBO", unit: "%" },
    { id: "5", name: "Post OBO", unit: "€" },
  ];

  rFunction = [
    { value: 1, text: "Président" },
    { value: 2, text: "Vice-Président" },
    { value: 3, text: "Directeur Général" },
    { value: 4, text: "Directeur Général délégué" },
    { value: 5, text: "Président du Conseil d’Administration" },
    { value: 6, text: "Administrateur" },
    { value: 7, text: "Président du directoire" },
    { value: 8, text: "Président du conseil de surveillance" },
    { value: 9, text: "Gérant" },
    { value: 10, text: "Liquidateur" },
    { value: 90, text: "Autre" },
  ];

  roles = [
    { id: null, name: "--------" },
    { id: 1, name: "Référent" },
    { id: 2, name: "Collab" },
    { id: 3, name: "Facturation" },
    { id: 4, name: "Administration" },
    { id: 5, name: "Standard" },
  ];

  rSocials = [
    { value: 19, text: "SC" },
    { value: 10, text: "SCI" },
    { value: 3, text: "SAS" },
    { value: 1, text: "SARL" },
    { value: 2, text: "SNC" },
    { value: 4, text: "SA" },
    { value: 5, text: "SCEA" },
    { value: 6, text: "EARL" },
    { value: 7, text: "SCP" },
    { value: 8, text: "SELARL" },
    { value: 9, text: "SELAS" },
    { value: 11, text: "SPFPL" },
    { value: 12, text: "SCCV" },
    { value: 13, text: "Association" },
    { value: 14, text: "Fond de dotation" },
    { value: 15, text: "Fondation" },
    { value: 18, text: "Gaec" },
    { value: 16, text: "Société en participation" },
    { value: 17, text: "Société de fait" },
    { value: 90, text: "Autre" },
  ];

  rTypesPerso = [
    { value: 1, text: "Parents" },
    { value: 2, text: "Conjoint" },
    { value: 3, text: "Enfants" },
    { value: 4, text: "Fraterie" },
    { value: 5, text: "Grands-parents" },
    { value: 6, text: "Oncle, tante " },
    { value: 7, text: "Cousin" },
    { value: 8, text: "Petits-enfants" },
    { value: 9, text: "Neveux" },
    { value: 99, text: "Autres" },
  ];

  rTypesPro = [
    { value: 1, text: "Expert comptable" },
    { value: 14, text: "Commissaire aux comptes" },
    { value: 2, text: "Avocat" },
    { value: 3, text: "Notaire" },
    { value: 4, text: "Banquier" },
    { value: 5, text: "Family Office" },
    { value: 6, text: "Conseil en Gestion de Patrimoine" },
    { value: 7, text: "Assureur" },
    { value: 8, text: "Courtier en financement / assurance" },
    { value: 9, text: "Directeur administratif et financier" },
    { value: 10, text: "Juriste" },
    { value: 11, text: "Comptable" },
    { value: 12, text: "Responsable des ressources humaines" },
    { value: 13, text: "Responsable IT" },
    { value: 99, text: "Autre" },
  ];

  taskTypes = [
    { id: null, name: "--------" },
    { id: 0, name: "Général" },
    { id: 1, name: "Suivi simple" },
    { id: 2, name: "Suivi AGOA" },
  ];

  typeShares = [
    { value: 10, text: "Pleine propriété" },
    { value: 20, text: "Nu-propriété" },
    { value: 30, text: "Usufruit" },
  ];
}

export default new Globals();
