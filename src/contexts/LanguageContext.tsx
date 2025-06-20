
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
    changeLanguage: "Changer de langue",
    // Navigation items
    Home: "Accueil",
    Chat: "Chat",
    Maintenance: "Entretien",
    Database: "Base de Données",
    Vehicle: "Véhicule",
    Store: "Boutique",
    Settings: "Paramètres"
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
    changeLanguage: "Sprache ändern",
    // Navigation items
    Home: "Startseite",
    Chat: "Chat",
    Maintenance: "Wartung",
    Database: "Datenbank",
    Vehicle: "Fahrzeug",
    Store: "Shop",
    Settings: "Einstellungen"
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
    changeLanguage: "Mudar idioma",
    // Navigation items
    Home: "Início",
    Chat: "Chat",
    Maintenance: "Manutenção",
    Database: "Banco de Dados",
    Vehicle: "Veículo",
    Store: "Loja",
    Settings: "Configurações"
  },
  it: {
    // Complete Italian translations
    dashboard: "Dashboard",
    quickActions: "Azioni Rapide",
    maintenanceReminders: "Promemoria Manutenzione",
    
    // Navigation
    home: "Home",
    chat: "Chat",
    maintenance: "Manutenzione",
    database: "Database",
    vehicle: "Veicolo",
    settings: "Impostazioni",
    
    // Vehicle
    addVehicle: "Aggiungi Veicolo",
    vehicleDetails: "Dettagli Veicolo",
    make: "Marca",
    model: "Modello",
    year: "Anno",
    vin: "VIN",
    mileage: "Chilometraggio",
    
    // Settings
    profile: "Profilo",
    language: "Lingua",
    theme: "Tema",
    notifications: "Notifiche",
    premium: "Premium",
    logout: "Logout",
    
    // Auth
    signIn: "Accedi",
    signUp: "Registrati",
    email: "Email",
    password: "Password",
    forgotPassword: "Password dimenticata?",
    
    // Plans
    freePlan: "Piano Gratuito",
    premiumPlan: "Piano Premium",
    currentPlan: "Piano Attuale",
    basicDiagnostics: "Diagnostica base del veicolo",
    advancedVehicleManagement: "Gestione avanzata del veicolo",
    singleVehicle: "Veicolo singolo",
    unlimitedVehicles: "Veicoli illimitati",
    basicChatDiagnostics: "Diagnostica chat base",
    advancedAIDiagnostics: "Diagnostica avanzata IA",
    simpleMaintenanceCalendar: "Calendario manutenzione semplice",
    detailedMaintenanceCalendar: "Calendario manutenzione dettagliato",
    knowledgeBaseAccess: "Accesso base conoscenza",
    fullKnowledgeBaseAccess: "Accesso completo base conoscenza",
    obdScanner: "Scanner OBD-II",
    advancedDiagnostics: "Diagnostica avanzata",
    multipleVehicles: "Veicoli multipli",
    exportImportData: "Esporta/importa dati",
    adFreeExperience: "Esperienza senza pubblicità",
    upgradeToPremium: "Aggiorna a Premium",
    
    // Calendar
    maintenanceCalendar: "Calendario Manutenzione",
    addTask: "Aggiungi Attività",
    selectDate: "Seleziona data",
    taskTitle: "Titolo Attività",
    date: "Data",
    type: "Tipo",
    routine: "Routine",
    important: "Importante",
    urgent: "Urgente",
    cancel: "Annulla",
    complete: "Completa",
    selectTaskType: "Seleziona tipo attività",
    noTasks: "Nessuna attività di manutenzione programmata per questa data",
    
    // Database
    problemsSolutions: "Problemi e Soluzioni",
    searchProblems: "Cerca problemi...",
    allProblems: "Tutti i Problemi",
    diagnostics: "Diagnostica",
    engine: "Motore",
    brakes: "Freni",
    electrical: "Elettrico",
    transmission: "Trasmissione",
    hvac: "HVAC",
    suspension: "Sospensioni",
    fuelSystem: "Sistema Carburante",
    exhaust: "Scarico",
    viewSolution: "Vedi Soluzione",
    upgradeToView: "Aggiorna per Vedere",
    noProblemsFound: "Nessun problema trovato corrispondente ai tuoi criteri di ricerca.",
    
    // Language
    changeLanguage: "Cambia lingua",
    // Navigation items
    Home: "Home",
    Chat: "Chat",
    Maintenance: "Manutenzione",
    Database: "Database",
    Vehicle: "Veicolo",
    Store: "Negozio",
    Settings: "Impostazioni"
  },
  ja: {
    // Complete Japanese translations
    dashboard: "ダッシュボード",
    quickActions: "クイックアクション",
    maintenanceReminders: "メンテナンス リマインダー",
    
    // Navigation
    home: "ホーム",
    chat: "チャット",
    maintenance: "メンテナンス",
    database: "データベース",
    vehicle: "車両",
    settings: "設定",
    
    // Vehicle
    addVehicle: "車両を追加",
    vehicleDetails: "車両詳細",
    make: "メーカー",
    model: "モデル",
    year: "年式",
    vin: "VIN",
    mileage: "走行距離",
    
    // Settings
    profile: "プロフィール",
    language: "言語",
    theme: "テーマ",
    notifications: "通知",
    premium: "プレミアム",
    logout: "ログアウト",
    
    // Auth
    signIn: "サインイン",
    signUp: "サインアップ",
    email: "メール",
    password: "パスワード",
    forgotPassword: "パスワードを忘れましたか？",
    
    // Plans
    freePlan: "無料プラン",
    premiumPlan: "プレミアムプラン",
    currentPlan: "現在のプラン",
    basicDiagnostics: "基本車両診断",
    advancedVehicleManagement: "高度な車両管理",
    singleVehicle: "単一車両",
    unlimitedVehicles: "無制限車両",
    basicChatDiagnostics: "基本チャット診断",
    advancedAIDiagnostics: "高度なAI診断",
    simpleMaintenanceCalendar: "シンプルメンテナンスカレンダー",
    detailedMaintenanceCalendar: "詳細メンテナンスカレンダー",
    knowledgeBaseAccess: "ナレッジベースアクセス",
    fullKnowledgeBaseAccess: "完全ナレッジベースアクセス",
    obdScanner: "OBD-IIスキャナー",
    advancedDiagnostics: "高度な診断",
    multipleVehicles: "複数車両",
    exportImportData: "データのエクスポート/インポート",
    adFreeExperience: "広告なし体験",
    upgradeToPremium: "プレミアムにアップグレード",
    
    // Calendar
    maintenanceCalendar: "メンテナンスカレンダー",
    addTask: "タスクを追加",
    selectDate: "日付を選択",
    taskTitle: "タスクタイトル",
    date: "日付",
    type: "タイプ",
    routine: "ルーチン",
    important: "重要",
    urgent: "緊急",
    cancel: "キャンセル",
    complete: "完了",
    selectTaskType: "タスクタイプを選択",
    noTasks: "この日にはメンテナンスタスクが予定されていません",
    
    // Database
    problemsSolutions: "問題と解決策",
    searchProblems: "問題を検索...",
    allProblems: "すべての問題",
    diagnostics: "診断",
    engine: "エンジン",
    brakes: "ブレーキ",
    electrical: "電気系統",
    transmission: "トランスミッション",
    hvac: "HVAC",
    suspension: "サスペンション",
    fuelSystem: "燃料システム",
    exhaust: "排気",
    viewSolution: "解決策を見る",
    upgradeToView: "表示するためにアップグレード",
    noProblemsFound: "検索条件に一致する問題が見つかりませんでした。",
    
    // Language
    changeLanguage: "言語を変更",
    // Navigation items
    Home: "ホーム",
    Chat: "チャット",
    Maintenance: "メンテナンス",
    Database: "データベース",
    Vehicle: "車両",
    Store: "ストア",
    Settings: "設定"
  },
  zh: {
    // Complete Chinese translations
    dashboard: "仪表板",
    quickActions: "快速操作",
    maintenanceReminders: "维护提醒",
    
    // Navigation
    home: "首页",
    chat: "聊天",
    maintenance: "维护",
    database: "数据库",
    vehicle: "车辆",
    settings: "设置",
    
    // Vehicle
    addVehicle: "添加车辆",
    vehicleDetails: "车辆详情",
    make: "品牌",
    model: "型号",
    year: "年份",
    vin: "VIN",
    mileage: "里程",
    
    // Settings
    profile: "个人资料",
    language: "语言",
    theme: "主题",
    notifications: "通知",
    premium: "高级版",
    logout: "登出",
    
    // Auth
    signIn: "登录",
    signUp: "注册",
    email: "邮箱",
    password: "密码",
    forgotPassword: "忘记密码？",
    
    // Plans
    freePlan: "免费计划",
    premiumPlan: "高级计划",
    currentPlan: "当前计划",
    basicDiagnostics: "基础车辆诊断",
    advancedVehicleManagement: "高级车辆管理",
    singleVehicle: "单一车辆",
    unlimitedVehicles: "无限车辆",
    basicChatDiagnostics: "基础聊天诊断",
    advancedAIDiagnostics: "高级AI诊断",
    simpleMaintenanceCalendar: "简单维护日历",
    detailedMaintenanceCalendar: "详细维护日历",
    knowledgeBaseAccess: "知识库访问",
    fullKnowledgeBaseAccess: "完整知识库访问",
    obdScanner: "OBD-II扫描仪",
    advancedDiagnostics: "高级诊断",
    multipleVehicles: "多个车辆",
    exportImportData: "导出/导入数据",
    adFreeExperience: "无广告体验",
    upgradeToPremium: "升级到高级版",
    
    // Calendar
    maintenanceCalendar: "维护日历",
    addTask: "添加任务",
    selectDate: "选择日期",
    taskTitle: "任务标题",
    date: "日期",
    type: "类型",
    routine: "常规",
    important: "重要",
    urgent: "紧急",
    cancel: "取消",
    complete: "完成",
    selectTaskType: "选择任务类型",
    noTasks: "这个日期没有安排维护任务",
    
    // Database
    problemsSolutions: "问题和解决方案",
    searchProblems: "搜索问题...",
    allProblems: "所有问题",
    diagnostics: "诊断",
    engine: "发动机",
    brakes: "刹车",
    electrical: "电气",
    transmission: "变速箱",
    hvac: "暖通空调",
    suspension: "悬挂",
    fuelSystem: "燃油系统",
    exhaust: "排气",
    viewSolution: "查看解决方案",
    upgradeToView: "升级查看",
    noProblemsFound: "未找到符合搜索条件的问题。",
    
    // Language
    changeLanguage: "更改语言",
    // Navigation items
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
  const [language, setLanguage] = useState('es');

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language]?.[key] || key;
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
