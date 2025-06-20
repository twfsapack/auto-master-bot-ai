import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    
    // Chat specific
    welcomeDIY: "¡Hola! Soy tu asistente Auto Master con IA. Te ayudaré con el diagnóstico y reparación de tu vehículo. ¿Qué problema estás experimentando?",
    welcomeMechanic: "¡Hola! Soy tu asistente Auto Master profesional. Te ayudaré con diagnósticos avanzados y análisis técnico. ¿En qué puedo asistirte?",
    chooseDIY: "Entusiasta DIY",
    chooseMechanic: "Mecánico Profesional",
    diyDescription: "Reparaciones caseras y mantenimiento",
    mechanicDescription: "Diagnósticos avanzados y técnicos",
    chooseProfile: "Para comenzar, selecciona tu perfil para una experiencia personalizada",
    welcome: "¡Bienvenido a Auto Master!",
    changeMode: "Cambiar modo",
    diyMode: "Modo: Entusiasta DIY",
    mechanicMode: "Modo: Mecánico Profesional",
    
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
    changeLanguage: "Cambiar idioma",
    // Navigation items
    Home: "Inicio",
    Chat: "Chat",
    Maintenance: "Mantenimiento",
    Database: "Base de Datos",
    Vehicle: "Vehículo",
    Store: "Tienda",
    Settings: "Ajustes"
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
    
    // Chat specific
    welcomeDIY: "Hello! I'm your Auto Master AI assistant. I'll help you with vehicle diagnosis and repair. What problem are you experiencing?",
    welcomeMechanic: "Hello! I'm your professional Auto Master assistant. I'll help you with advanced diagnostics and technical analysis. How can I assist you?",
    chooseDIY: "DIY Enthusiast",
    chooseMechanic: "Professional Mechanic",
    diyDescription: "Home repairs and maintenance",
    mechanicDescription: "Advanced and technical diagnostics",
    chooseProfile: "To get started, select your profile for a personalized experience",
    welcome: "Welcome to Auto Master!",
    changeMode: "Change mode",
    diyMode: "Mode: DIY Enthusiast",
    mechanicMode: "Mode: Professional Mechanic",
    
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
    changeLanguage: "Change language",
    // Navigation items
    Home: "Home",
    Chat: "Chat",
    Maintenance: "Maintenance",
    Database: "Database",
    Vehicle: "Vehicle",
    Store: "Store",
    Settings: "Settings"
  },
  fr: {
    dashboard: "Tableau de Bord",
    quickActions: "Actions Rapides",
    maintenanceReminders: "Rappels d'Entretien",
    home: "Accueil",
    chat: "Chat",
    maintenance: "Entretien",
    database: "Base de Données",
    vehicle: "Véhicule",
    settings: "Paramètres",
    welcomeDIY: "Bonjour! Je suis votre assistant Auto Master IA. Je vais vous aider avec le diagnostic et la réparation de votre véhicule. Quel problème rencontrez-vous?",
    welcomeMechanic: "Bonjour! Je suis votre assistant Auto Master professionnel. Je vais vous aider avec des diagnostics avancés et une analyse technique. Comment puis-je vous aider?",
    chooseDIY: "Passionné DIY",
    chooseMechanic: "Mécanicien Professionnel",
    diyDescription: "Réparations domestiques et entretien",
    mechanicDescription: "Diagnostics avancés et techniques",
    chooseProfile: "Pour commencer, sélectionnez votre profil pour une expérience personnalisée",
    welcome: "Bienvenue à Auto Master!",
    changeMode: "Changer de mode",
    diyMode: "Mode: Passionné DIY",
    mechanicMode: "Mode: Mécanicien Professionnel",
    changeLanguage: "Changer de langue",
    Home: "Accueil",
    Chat: "Chat",
    Maintenance: "Entretien",
    Database: "Base de Données",
    Vehicle: "Véhicule",
    Store: "Boutique",
    Settings: "Paramètres"
  },
  de: {
    dashboard: "Dashboard",
    quickActions: "Schnellaktionen",
    maintenanceReminders: "Wartungserinnerungen",
    home: "Startseite",
    chat: "Chat",
    maintenance: "Wartung",
    database: "Datenbank",
    vehicle: "Fahrzeug",
    settings: "Einstellungen",
    welcomeDIY: "Hallo! Ich bin Ihr Auto Master KI-Assistent. Ich helfe Ihnen bei der Fahrzeugdiagnose und -reparatur. Welches Problem haben Sie?",
    welcomeMechanic: "Hallo! Ich bin Ihr professioneller Auto Master Assistent. Ich helfe Ihnen bei erweiterten Diagnosen und technischen Analysen. Wie kann ich Ihnen helfen?",
    chooseDIY: "DIY-Enthusiast",
    chooseMechanic: "Professioneller Mechaniker",
    diyDescription: "Heimreparaturen und Wartung",
    mechanicDescription: "Erweiterte und technische Diagnosen",
    chooseProfile: "Wählen Sie Ihr Profil für eine personalisierte Erfahrung",
    welcome: "Willkommen bei Auto Master!",
    changeMode: "Modus ändern",
    diyMode: "Modus: DIY-Enthusiast",
    mechanicMode: "Modus: Professioneller Mechaniker",
    changeLanguage: "Sprache ändern",
    Home: "Startseite",
    Chat: "Chat",
    Maintenance: "Wartung",
    Database: "Datenbank",
    Vehicle: "Fahrzeug",
    Store: "Shop",
    Settings: "Einstellungen"
  },
  pt: {
    dashboard: "Painel",
    quickActions: "Ações Rápidas",
    maintenanceReminders: "Lembretes de Manutenção",
    home: "Início",
    chat: "Chat",
    maintenance: "Manutenção",
    database: "Banco de Dados",
    vehicle: "Veículo",
    settings: "Configurações",
    welcomeDIY: "Olá! Sou seu assistente Auto Master IA. Vou ajudá-lo com diagnóstico e reparo de veículos. Que problema você está enfrentando?",
    welcomeMechanic: "Olá! Sou seu assistente Auto Master profissional. Vou ajudá-lo com diagnósticos avançados e análise técnica. Como posso ajudá-lo?",
    chooseDIY: "Entusiasta DIY",
    chooseMechanic: "Mecânico Profissional",
    diyDescription: "Reparos domésticos e manutenção",
    mechanicDescription: "Diagnósticos avançados e técnicos",
    chooseProfile: "Para começar, selecione seu perfil para uma experiência personalizada",
    welcome: "Bem-vindo ao Auto Master!",
    changeMode: "Mudar modo",
    diyMode: "Modo: Entusiasta DIY",
    mechanicMode: "Modo: Mecânico Profissional",
    changeLanguage: "Mudar idioma",
    Home: "Início",
    Chat: "Chat",
    Maintenance: "Manutenção",
    Database: "Banco de Dados",
    Vehicle: "Veículo",
    Store: "Loja",
    Settings: "Configurações"
  },
  it: {
    dashboard: "Dashboard",
    quickActions: "Azioni Rapide",
    maintenanceReminders: "Promemoria Manutenzione",
    home: "Home",
    chat: "Chat",
    maintenance: "Manutenzione",
    database: "Database",
    vehicle: "Veicolo",
    settings: "Impostazioni",
    welcomeDIY: "Ciao! Sono il tuo assistente Auto Master IA. Ti aiuterò con la diagnosi e riparazione del veicolo. Che problema stai riscontrando?",
    welcomeMechanic: "Ciao! Sono il tuo assistente Auto Master professionale. Ti aiuterò con diagnosi avanzate e analisi tecniche. Come posso aiutarti?",
    chooseDIY: "Appassionato DIY",
    chooseMechanic: "Meccanico Professionale",
    diyDescription: "Riparazioni domestiche e manutenzione",
    mechanicDescription: "Diagnosi avanzate e tecniche",
    chooseProfile: "Per iniziare, seleziona il tuo profilo per un'esperienza personalizzata",
    welcome: "Benvenuto in Auto Master!",
    changeMode: "Cambia modalità",
    diyMode: "Modalità: Appassionato DIY",
    mechanicMode: "Modalità: Meccanico Professionale",
    changeLanguage: "Cambia lingua",
    Home: "Home",
    Chat: "Chat",
    Maintenance: "Manutenzione",
    Database: "Database",
    Vehicle: "Veicolo",
    Store: "Negozio",
    Settings: "Impostazioni"
  },
  ja: {
    dashboard: "ダッシュボード",
    quickActions: "クイックアクション",
    maintenanceReminders: "メンテナンス リマインダー",
    home: "ホーム",
    chat: "チャット",
    maintenance: "メンテナンス",
    database: "データベース",
    vehicle: "車両",
    settings: "設定",
    welcomeDIY: "こんにちは！私はあなたのAuto Master AIアシスタントです。車両の診断と修理をお手伝いします。どのような問題がありますか？",
    welcomeMechanic: "こんにちは！私はあなたのプロフェッショナルAuto Masterアシスタントです。高度な診断と技術分析をお手伝いします。どのようにお手伝いできますか？",
    chooseDIY: "DIY愛好家",
    chooseMechanic: "プロの整備士",
    diyDescription: "自宅での修理とメンテナンス",
    mechanicDescription: "高度で技術的な診断",
    chooseProfile: "開始するには、パーソナライズされた体験のためにプロフィールを選択してください",
    welcome: "Auto Masterへようこそ！",
    changeMode: "モードを変更",
    diyMode: "モード: DIY愛好家",
    mechanicMode: "モード: プロの整備士",
    changeLanguage: "言語を変更",
    Home: "ホーム",
    Chat: "チャット",
    Maintenance: "メンテナンス",
    Database: "データベース",
    Vehicle: "車両",
    Store: "ストア",
    Settings: "設定"
  },
  zh: {
    dashboard: "仪表板",
    quickActions: "快速操作",
    maintenanceReminders: "维护提醒",
    home: "首页",
    chat: "聊天",
    maintenance: "维护",
    database: "数据库",
    vehicle: "车辆",
    settings: "设置",
    welcomeDIY: "您好！我是您的Auto Master AI助手。我将帮助您进行车辆诊断和维修。您遇到了什么问题？",
    welcomeMechanic: "您好！我是您的专业Auto Master助手。我将帮助您进行高级诊断和技术分析。我可以如何为您提供帮助？",
    chooseDIY: "DIY爱好者",
    chooseMechanic: "专业技师",
    diyDescription: "家庭维修和保养",
    mechanicDescription: "高级和技术诊断",
    chooseProfile: "开始前，请选择您的个人资料以获得个性化体验",
    welcome: "欢迎来到Auto Master！",
    changeMode: "更改模式",
    diyMode: "模式：DIY爱好者",
    mechanicMode: "模式：专业技师",
    changeLanguage: "更改语言",
    Home: "首页",
    Chat: "聊天",
    Maintenance: "维护",
    Database: "数据库",
    Vehicle: "车辆",
    Store: "商店",
    Settings: "设置"
  }
};

// Type for our context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('automaster-language');
    return savedLanguage || 'es';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('automaster-language', language);
    console.log(`Idioma cambiado a: ${language}`);
  }, [language]);

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language]?.[key] || translations['es']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
