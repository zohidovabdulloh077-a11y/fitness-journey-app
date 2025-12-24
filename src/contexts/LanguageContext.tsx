import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "uz" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    workouts: 'Workouts',
    profile: 'Profile',
    settings: 'Settings',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInDesc: 'Enter your credentials to access your account',
    signUpDesc: 'Fill in your details to get started',
    
    // Dashboard
    welcome: 'Welcome back',
    todayStats: "Today's Stats",
    steps: 'Steps',
    calories: 'Calories',
    activeMinutes: 'Active Minutes',
    water: 'Water',
    glasses: 'glasses',
    quickActions: 'Quick Actions',
    startWorkout: 'Start Workout',
    logWater: 'Log Water',
    viewProgress: 'View Progress',
    motivationalQuote: 'Daily Motivation',
    quote1: "The only bad workout is the one that didn't happen.",
    quote2: "Success is the sum of small efforts repeated day in and day out.",
    quote3: "Don't stop when you're tired. Stop when you're done.",
    
    // Profile
    editProfile: 'Edit Profile',
    fitnessGoal: 'Fitness Goal',
    weight: 'Weight',
    height: 'Height',
    activityHistory: 'Activity History',
    totalWorkouts: 'Total Workouts',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    memberSince: 'Member Since',
    
    // Settings
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    notifications: 'Notifications',
    enableNotifications: 'Enable Notifications',
    account: 'Account',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    save: 'Save',
    cancel: 'Cancel',
    
    // Workouts
    myWorkouts: 'My Workouts',
    workoutPlans: 'Workout Plans',
    beginnerPlan: 'Beginner Plan',
    intermediatePlan: 'Intermediate Plan',
    advancedPlan: 'Advanced Plan',
    duration: 'Duration',
    minutes: 'min',
    recentWorkouts: 'Recent Workouts',
    noWorkouts: 'No workouts yet',
    startFirst: 'Start your first workout!',
    
    // Goals
    generalFitness: 'General Fitness',
    weightLoss: 'Weight Loss',
    muscleGain: 'Muscle Gain',
    flexibility: 'Flexibility',
    endurance: 'Endurance',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    kg: 'kg',
    cm: 'cm',
    kcal: 'kcal',
    burned: 'burned',
    completed: 'Completed',
  },
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    workouts: 'Mashqlar',
    profile: 'Profil',
    settings: 'Sozlamalar',
    
    // Auth
    signIn: 'Kirish',
    signUp: "Ro'yxatdan o'tish",
    signOut: 'Chiqish',
    email: 'Email',
    password: 'Parol',
    fullName: "To'liq ism",
    confirmPassword: 'Parolni tasdiqlash',
    noAccount: "Hisobingiz yo'qmi?",
    haveAccount: 'Hisobingiz bormi?',
    welcomeBack: 'Xush kelibsiz',
    createAccount: 'Hisob yaratish',
    signInDesc: 'Hisobingizga kirish uchun ma\'lumotlarni kiriting',
    signUpDesc: 'Boshlash uchun ma\'lumotlaringizni to\'ldiring',
    
    // Dashboard
    welcome: 'Xush kelibsiz',
    todayStats: 'Bugungi statistika',
    steps: 'Qadamlar',
    calories: 'Kaloriyalar',
    activeMinutes: 'Faol daqiqalar',
    water: 'Suv',
    glasses: 'stakan',
    quickActions: 'Tezkor harakatlar',
    startWorkout: 'Mashqni boshlash',
    logWater: "Suv qo'shish",
    viewProgress: "Progressni ko'rish",
    motivationalQuote: 'Kunlik motivatsiya',
    quote1: "Yomon mashq - bu bo'lmagan mashq.",
    quote2: "Muvaffaqiyat - har kuni takrorlanadigan kichik harakatlar yig'indisi.",
    quote3: "Charchaganda to'xtamang. Tugaganda to'xtang.",
    
    // Profile
    editProfile: 'Profilni tahrirlash',
    fitnessGoal: 'Fitness maqsadi',
    weight: 'Vazn',
    height: "Bo'y",
    activityHistory: 'Faollik tarixi',
    totalWorkouts: 'Jami mashqlar',
    thisWeek: 'Bu hafta',
    thisMonth: 'Bu oy',
    memberSince: "A'zo bo'lgan sana",
    
    // Settings
    appearance: "Ko'rinish",
    darkMode: "Qorong'i rejim",
    lightMode: "Yorug' rejim",
    language: 'Til',
    notifications: 'Bildirishnomalar',
    enableNotifications: 'Bildirishnomalarni yoqish',
    account: 'Hisob',
    changePassword: "Parolni o'zgartirish",
    currentPassword: 'Joriy parol',
    newPassword: 'Yangi parol',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    
    // Workouts
    myWorkouts: 'Mening mashqlarim',
    workoutPlans: 'Mashq rejalari',
    beginnerPlan: "Boshlang'ich reja",
    intermediatePlan: "O'rta reja",
    advancedPlan: 'Murakkab reja',
    duration: 'Davomiylik',
    minutes: 'daq',
    recentWorkouts: 'So\'nggi mashqlar',
    noWorkouts: 'Hali mashqlar yo\'q',
    startFirst: 'Birinchi mashqingizni boshlang!',
    
    // Goals
    generalFitness: 'Umumiy fitnes',
    weightLoss: 'Vazn yo\'qotish',
    muscleGain: 'Mushak oshirish',
    flexibility: 'Egiluvchanlik',
    endurance: 'Chidamlilik',
    
    // General
    loading: 'Yuklanmoqda...',
    error: 'Xato',
    success: 'Muvaffaqiyat',
    kg: 'kg',
    cm: 'sm',
    kcal: 'kkal',
    burned: 'yoqilgan',
    completed: 'Tugallangan',
  },
  ru: {
    // Navigation
    home: 'Главная',
    workouts: 'Тренировки',
    profile: 'Профиль',
    settings: 'Настройки',
    
    // Auth
    signIn: 'Вход',
    signUp: 'Регистрация',
    signOut: 'Выход',
    email: 'Эл. почта',
    password: 'Пароль',
    fullName: 'Полное имя',
    confirmPassword: 'Подтвердите пароль',
    noAccount: 'Нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',
    welcomeBack: 'Добро пожаловать',
    createAccount: 'Создать аккаунт',
    signInDesc: 'Введите данные для входа в аккаунт',
    signUpDesc: 'Заполните данные для начала работы',
    
    // Dashboard
    welcome: 'Добро пожаловать',
    todayStats: 'Статистика за сегодня',
    steps: 'Шаги',
    calories: 'Калории',
    activeMinutes: 'Активные минуты',
    water: 'Вода',
    glasses: 'стаканов',
    quickActions: 'Быстрые действия',
    startWorkout: 'Начать тренировку',
    logWater: 'Добавить воду',
    viewProgress: 'Просмотр прогресса',
    motivationalQuote: 'Мотивация дня',
    quote1: 'Плохая тренировка — та, которой не было.',
    quote2: 'Успех — это сумма маленьких усилий, повторяемых изо дня в день.',
    quote3: 'Не останавливайся, когда устал. Останавливайся, когда закончил.',
    
    // Profile
    editProfile: 'Редактировать профиль',
    fitnessGoal: 'Фитнес-цель',
    weight: 'Вес',
    height: 'Рост',
    activityHistory: 'История активности',
    totalWorkouts: 'Всего тренировок',
    thisWeek: 'На этой неделе',
    thisMonth: 'В этом месяце',
    memberSince: 'Участник с',
    
    // Settings
    appearance: 'Внешний вид',
    darkMode: 'Тёмная тема',
    lightMode: 'Светлая тема',
    language: 'Язык',
    notifications: 'Уведомления',
    enableNotifications: 'Включить уведомления',
    account: 'Аккаунт',
    changePassword: 'Изменить пароль',
    currentPassword: 'Текущий пароль',
    newPassword: 'Новый пароль',
    save: 'Сохранить',
    cancel: 'Отмена',
    
    // Workouts
    myWorkouts: 'Мои тренировки',
    workoutPlans: 'Планы тренировок',
    beginnerPlan: 'План для начинающих',
    intermediatePlan: 'Средний план',
    advancedPlan: 'Продвинутый план',
    duration: 'Длительность',
    minutes: 'мин',
    recentWorkouts: 'Последние тренировки',
    noWorkouts: 'Тренировок пока нет',
    startFirst: 'Начните первую тренировку!',
    
    // Goals
    generalFitness: 'Общий фитнес',
    weightLoss: 'Снижение веса',
    muscleGain: 'Набор мышц',
    flexibility: 'Гибкость',
    endurance: 'Выносливость',
    
    // General
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    kg: 'кг',
    cm: 'см',
    kcal: 'ккал',
    burned: 'сожжено',
    completed: 'Завершено',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem('fitness-language') as Language;
    if (savedLang && ['en', 'uz', 'ru'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fitness-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
