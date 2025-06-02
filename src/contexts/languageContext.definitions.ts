import { createContext, useContext } from 'react';

// Define translations for different languages
export const translations = {
  es: {
    // Dashboard
    dashboard: "Dashboard",
    quickActions: "Acciones Rápidas",
    maintenanceReminders: "Recordatorios de Mantenimiento",
    
    // Navigation
    home: "Inicio",
    chat: "Chat",
    maintenance: "Mantenimiento",
    database: "Base de Datos",
    vehicle: "Vehículo",
    settings: "Ajustes",
    
    // Vehicle
    addVehicle: "Añadir Vehículo",
    vehicleDetails: "Detalles del Vehículo",
    make: "Marca",
    model: "Modelo",
    year: "Año",
    vin: "VIN",
    mileage: "Kilometraje",
    
    // Settings
    profile: "Perfil",
    language: "Idioma",
    theme: "Tema",
    notifications: "Notificaciones",
    premium: "Premium",
    logout: "Cerrar Sesión",
    
    // Auth
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    
    // Plans
    freePlan: "Plan Gratuito",
    premiumPlan: "Plan Premium",
    currentPlan: "Plan Actual",
    basicDiagnostics: "Diagnóstico básico vehicular",
    advancedVehicleManagement: "Gestión avanzada de vehículos",
    singleVehicle: "Un solo vehículo",
    unlimitedVehicles: "Vehículos ilimitados",
    basicChatDiagnostics: "Diagnóstico básico por chat",
    advancedAIDiagnostics: "Diagnóstico avanzado con IA",
    simpleMaintenanceCalendar: "Calendario de mantenimiento simple",
    detailedMaintenanceCalendar: "Calendario de mantenimiento detallado",
    knowledgeBaseAccess: "Acceso a base de conocimientos",
    fullKnowledgeBaseAccess: "Acceso completo a base de conocimientos",
    obdScanner: "Escáner OBD-II",
    advancedDiagnostics: "Diagnósticos avanzados",
    multipleVehicles: "Múltiples vehículos",
    exportImportData: "Exportar/importar datos",
    adFreeExperience: "Experiencia sin anuncios",
    upgradeToPremium: "Actualizar a Premium",
    
    // Calendar
    maintenanceCalendar: "Calendario de Mantenimiento",
    addTask: "Añadir Tarea",
    selectDate: "Seleccionar fecha",
    taskTitle: "Título de la Tarea",
    date: "Fecha",
    type: "Tipo",
    routine: "Rutinaria",
    important: "Importante",
    urgent: "Urgente",
    cancel: "Cancelar",
    complete: "Completar",
    selectTaskType: "Seleccionar tipo de tarea",
    noTasks: "No hay tareas de mantenimiento programadas para esta fecha",
    
    // Database
    problemsSolutions: "Problemas y Soluciones",
    searchProblems: "Buscar problemas...",
    allProblems: "Todos los Problemas",
    diagnostics: "Diagnósticos",
    engine: "Motor",
    brakes: "Frenos",
    electrical: "Eléctrico",
    transmission: "Transmisión",
    hvac: "HVAC",
    suspension: "Suspensión",
    fuelSystem: "Sistema de Combustible",
    exhaust: "Escape",
    viewSolution: "Ver Solución",
    upgradeToView: "Actualizar para Ver",
    noProblemsFound: "No se encontraron problemas que coincidan con tu búsqueda.",
    
    // Language
    changeLanguage: "Cambiar idioma"
  },
  en: {
    // Dashboard
    dashboard: "Dashboard",
    quickActions: "Quick Actions",
    maintenanceReminders: "Maintenance Reminders",
    
    // Navigation
    home: "Home",
    chat: "Chat",
    maintenance: "Maintenance",
    database: "Database",
    vehicle: "Vehicle",
    settings: "Settings",
    
    // Vehicle
    addVehicle: "Add Vehicle",
    vehicleDetails: "Vehicle Details",
    make: "Make",
    model: "Model",
    year: "Year",
    vin: "VIN",
    mileage: "Mileage",
    
    // Settings
    profile: "Profile",
    language: "Language",
    theme: "Theme",
    notifications: "Notifications",
    premium: "Premium",
    logout: "Logout",
    
    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    
    // Plans
    freePlan: "Free Plan",
    premiumPlan: "Premium Plan",
    currentPlan: "Current Plan",
    basicDiagnostics: "Basic vehicle diagnostics",
    advancedVehicleManagement: "Advanced vehicle management",
    singleVehicle: "Single vehicle",
    unlimitedVehicles: "Unlimited vehicles",
    basicChatDiagnostics: "Basic chat diagnostics",
    advancedAIDiagnostics: "Advanced AI diagnostics",
    simpleMaintenanceCalendar: "Simple maintenance calendar",
    detailedMaintenanceCalendar: "Detailed maintenance calendar",
    knowledgeBaseAccess: "Knowledge base access",
    fullKnowledgeBaseAccess: "Full knowledge base access",
    obdScanner: "OBD-II scanner",
    advancedDiagnostics: "Advanced diagnostics",
    multipleVehicles: "Multiple vehicles",
    exportImportData: "Export/import data",
    adFreeExperience: "Ad-free experience",
    upgradeToPremium: "Upgrade to Premium",
    
    // Calendar
    maintenanceCalendar: "Maintenance Calendar",
    addTask: "Add Task",
    selectDate: "Select date",
    taskTitle: "Task Title",
    date: "Date",
    type: "Type",
    routine: "Routine",
    important: "Important",
    urgent: "Urgent",
    cancel: "Cancel",
    complete: "Complete",
    selectTaskType: "Select task type",
    noTasks: "No maintenance tasks scheduled for this date",
    
    // Database
    problemsSolutions: "Problems & Solutions",
    searchProblems: "Search problems...",
    allProblems: "All Problems",
    diagnostics: "Diagnostics",
    engine: "Engine",
    brakes: "Brakes",
    electrical: "Electrical",
    transmission: "Transmission",
    hvac: "HVAC",
    suspension: "Suspension",
    fuelSystem: "Fuel System",
    exhaust: "Exhaust",
    viewSolution: "View Solution",
    upgradeToView: "Upgrade to View",
    noProblemsFound: "No problems found matching your search criteria.",
    
    // Language
    changeLanguage: "Change language"
  },
  fr: {
    // Dashboard
    dashboard: "Tableau de Bord",
    quickActions: "Actions Rapides",
    maintenanceReminders: "Rappels d'Entretien",
    
    // Navigation
    home: "Accueil",
    chat: "Chat",
    maintenance: "Entretien",
    database: "Base de Données",
    vehicle: "Véhicule",
    settings: "Paramètres",
    
    // Vehicle
    addVehicle: "Ajouter un Véhicule",
    vehicleDetails: "Détails du Véhicule",
    make: "Marque",
    model: "Modèle",
    year: "Année",
    vin: "NIV",
    mileage: "Kilométrage",
    
    // Settings
    profile: "Profil",
    language: "Langue",
    theme: "Thème",
    notifications: "Notifications",
    premium: "Premium",
    logout: "Déconnexion",
    
    // Auth
    signIn: "Connexion",
    signUp: "Inscription",
    email: "Email",
    password: "Mot de Passe",
    forgotPassword: "Mot de passe oublié?",
    
    // Plans
    freePlan: "Plan Gratuit",
    premiumPlan: "Plan Premium",
    currentPlan: "Plan Actuel",
    basicDiagnostics: "Diagnostics de base du véhicule",
    advancedVehicleManagement: "Gestion avancée des véhicules",
    singleVehicle: "Un seul véhicule",
    unlimitedVehicles: "Véhicules illimités",
    basicChatDiagnostics: "Diagnostics par chat de base",
    advancedAIDiagnostics: "Diagnostics avancés par IA",
    simpleMaintenanceCalendar: "Calendrier d'entretien simple",
    detailedMaintenanceCalendar: "Calendrier d'entretien détaillé",
    knowledgeBaseAccess: "Accès à la base de connaissances",
    fullKnowledgeBaseAccess: "Accès complet à la base de connaissances",
    obdScanner: "Scanner OBD-II",
    advancedDiagnostics: "Diagnostics avancés",
    multipleVehicles: "Véhicules multiples",
    exportImportData: "Exporter/importer des données",
    adFreeExperience: "Expérience sans publicité",
    upgradeToPremium: "Passer à Premium",
    
    // Calendar
    maintenanceCalendar: "Calendrier d'Entretien",
    addTask: "Ajouter une Tâche",
    selectDate: "Sélectionner une date",
    taskTitle: "Titre de la Tâche",
    date: "Date",
    type: "Type",
    routine: "Routine",
    important: "Important",
    urgent: "Urgent",
    cancel: "Annuler",
    complete: "Terminer",
    selectTaskType: "Sélectionner le type de tâche",
    noTasks: "Aucune tâche d'entretien programmée pour cette date",
    
    // Database
    problemsSolutions: "Problèmes et Solutions",
    searchProblems: "Rechercher des problèmes...",
    allProblems: "Tous les Problèmes",
    diagnostics: "Diagnostics",
    engine: "Moteur",
    brakes: "Freins",
    electrical: "Électrique",
    transmission: "Transmission",
    hvac: "CVC",
    suspension: "Suspension",
    fuelSystem: "Système de Carburant",
    exhaust: "Échappement",
    viewSolution: "Voir la Solution",
    upgradeToView: "Passer à Premium pour Voir",
    noProblemsFound: "Aucun problème correspondant à vos critères de recherche.",
    
    // Language
    changeLanguage: "Changer de langue"
  },
  de: {
    // Dashboard
    dashboard: "Dashboard",
    quickActions: "Schnellaktionen",
    maintenanceReminders: "Wartungserinnerungen",
    
    // Navigation
    home: "Startseite",
    chat: "Chat",
    maintenance: "Wartung",
    database: "Datenbank",
    vehicle: "Fahrzeug",
    settings: "Einstellungen",
    
    // Vehicle
    addVehicle: "Fahrzeug hinzufügen",
    vehicleDetails: "Fahrzeugdetails",
    make: "Marke",
    model: "Modell",
    year: "Jahr",
    vin: "FIN",
    mileage: "Kilometerstand",
    
    // Settings
    profile: "Profil",
    language: "Sprache",
    theme: "Thema",
    notifications: "Benachrichtigungen",
    premium: "Premium",
    logout: "Abmelden",
    
    // Auth
    signIn: "Anmelden",
    signUp: "Registrieren",
    email: "E-Mail",
    password: "Passwort",
    forgotPassword: "Passwort vergessen?",
    
    // Plans
    freePlan: "Kostenloser Plan",
    premiumPlan: "Premium-Plan",
    currentPlan: "Aktueller Plan",
    basicDiagnostics: "Grundlegende Fahrzeugdiagnose",
    advancedVehicleManagement: "Erweiterte Fahrzeugverwaltung",
    singleVehicle: "Einzelnes Fahrzeug",
    unlimitedVehicles: "Unbegrenzte Fahrzeuge",
    basicChatDiagnostics: "Grundlegende Chat-Diagnose",
    advancedAIDiagnostics: "Erweiterte KI-Diagnose",
    simpleMaintenanceCalendar: "Einfacher Wartungskalender",
    detailedMaintenanceCalendar: "Detaillierter Wartungskalender",
    knowledgeBaseAccess: "Zugang zur Wissensdatenbank",
    fullKnowledgeBaseAccess: "Voller Zugang zur Wissensdatenbank",
    obdScanner: "OBD-II-Scanner",
    advancedDiagnostics: "Erweiterte Diagnose",
    multipleVehicles: "Mehrere Fahrzeuge",
    exportImportData: "Daten exportieren/importieren",
    adFreeExperience: "Werbefreie Erfahrung",
    upgradeToPremium: "Auf Premium upgraden",
    
    // Calendar
    maintenanceCalendar: "Wartungskalender",
    addTask: "Aufgabe hinzufügen",
    selectDate: "Datum auswählen",
    taskTitle: "Aufgabentitel",
    date: "Datum",
    type: "Typ",
    routine: "Routine",
    important: "Wichtig",
    urgent: "Dringend",
    cancel: "Abbrechen",
    complete: "Abschließen",
    selectTaskType: "Aufgabentyp auswählen",
    noTasks: "Keine Wartungsaufgaben für dieses Datum geplant",
    
    // Database
    problemsSolutions: "Probleme & Lösungen",
    searchProblems: "Probleme suchen...",
    allProblems: "Alle Probleme",
    diagnostics: "Diagnose",
    engine: "Motor",
    brakes: "Bremsen",
    electrical: "Elektrisch",
    transmission: "Getriebe",
    hvac: "Klimaanlage",
    suspension: "Aufhängung",
    fuelSystem: "Kraftstoffsystem",
    exhaust: "Auspuff",
    viewSolution: "Lösung anzeigen",
    upgradeToView: "Upgrade um anzuzeigen",
    noProblemsFound: "Keine Probleme gefunden, die Ihren Suchkriterien entsprechen.",
    
    // Language
    changeLanguage: "Sprache ändern"
  },
  pt: {
    // Dashboard
    dashboard: "Painel",
    quickActions: "Ações Rápidas",
    maintenanceReminders: "Lembretes de Manutenção",
    
    // Navigation
    home: "Início",
    chat: "Chat",
    maintenance: "Manutenção",
    database: "Banco de Dados",
    vehicle: "Veículo",
    settings: "Configurações",
    
    // Vehicle
    addVehicle: "Adicionar Veículo",
    vehicleDetails: "Detalhes do Veículo",
    make: "Marca",
    model: "Modelo",
    year: "Ano",
    vin: "VIN",
    mileage: "Quilometragem",
    
    // Settings
    profile: "Perfil",
    language: "Idioma",
    theme: "Tema",
    notifications: "Notificações",
    premium: "Premium",
    logout: "Sair",
    
    // Auth
    signIn: "Entrar",
    signUp: "Cadastrar",
    email: "Email",
    password: "Senha",
    forgotPassword: "Esqueceu a senha?",
    
    // Plans
    freePlan: "Plano Gratuito",
    premiumPlan: "Plano Premium",
    currentPlan: "Plano Atual",
    basicDiagnostics: "Diagnóstico básico de veículos",
    advancedVehicleManagement: "Gerenciamento avançado de veículos",
    singleVehicle: "Veículo único",
    unlimitedVehicles: "Veículos ilimitados",
    basicChatDiagnostics: "Diagnóstico básico por chat",
    advancedAIDiagnostics: "Diagnóstico avançado com IA",
    simpleMaintenanceCalendar: "Calendário de manutenção simples",
    detailedMaintenanceCalendar: "Calendário de manutenção detalhado",
    knowledgeBaseAccess: "Acesso à base de conhecimento",
    fullKnowledgeBaseAccess: "Acesso completo à base de conhecimento",
    obdScanner: "Scanner OBD-II",
    advancedDiagnostics: "Diagnósticos avançados",
    multipleVehicles: "Múltiplos veículos",
    exportImportData: "Exportar/importar dados",
    adFreeExperience: "Experiência sem anúncios",
    upgradeToPremium: "Atualizar para Premium",
    
    // Calendar
    maintenanceCalendar: "Calendário de Manutenção",
    addTask: "Adicionar Tarefa",
    selectDate: "Selecionar data",
    taskTitle: "Título da Tarefa",
    date: "Data",
    type: "Tipo",
    routine: "Rotina",
    important: "Importante",
    urgent: "Urgente",
    cancel: "Cancelar",
    complete: "Completar",
    selectTaskType: "Selecionar tipo de tarefa",
    noTasks: "Nenhuma tarefa de manutenção agendada para esta data",
    
    // Database
    problemsSolutions: "Problemas e Soluções",
    searchProblems: "Pesquisar problemas...",
    allProblems: "Todos os Problemas",
    diagnostics: "Diagnósticos",
    engine: "Motor",
    brakes: "Freios",
    electrical: "Elétrico",
    transmission: "Transmissão",
    hvac: "HVAC",
    suspension: "Suspensão",
    fuelSystem: "Sistema de Combustível",
    exhaust: "Escapamento",
    viewSolution: "Ver Solução",
    upgradeToView: "Atualizar para Ver",
    noProblemsFound: "Nenhum problema encontrado correspondente aos seus critérios de pesquisa.",
    
    // Language
    changeLanguage: "Mudar idioma"
  }
};

// Type for our context
export type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en', // Default to 'en' to match LanguageProvider's initial state
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
