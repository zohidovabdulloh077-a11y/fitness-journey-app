import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ru" | "uz" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    "nav.gyms": "Все залы",
    "nav.pricing": "Цены",
    "nav.companies": "Для компаний",
    "nav.partners": "Партнёрам",
    "nav.faq": "FAQ",
    "nav.download": "Скачать",
    "nav.downloadApp": "Скачать приложение",
    "nav.city": "Город",
    "nav.language": "Язык",
    
    // Hero
    "hero.title": "Один абонемент —",
    "hero.titleHighlight": "сотни залов",
    "hero.subtitle": "Тренируйтесь в лучших фитнес-клубах, бассейнах и студиях города по единой подписке 1Fit",
    "hero.cta": "Начать тренировки",
    "hero.forbes": "Forbes Top 30",
    "hero.yoga": "Йога",
    "hero.swimming": "Плавание",
    "hero.fitness": "Фитнес",
    
    // Benefits
    "benefits.title": "Почему выбирают 1Fit",
    "benefits.subtitle": "Тысячи людей уже тренируются с нами. Присоединяйтесь!",
    "benefits.gyms.title": "500+ залов",
    "benefits.gyms.desc": "Фитнес-клубы, бассейны, йога-студии и спортивные секции в одном приложении",
    "benefits.flexible.title": "Гибкий график",
    "benefits.flexible.desc": "Тренируйтесь когда удобно. Бронируйте занятия в пару кликов через приложение",
    "benefits.savings.title": "Экономия до 70%",
    "benefits.savings.desc": "Платите меньше, чем за обычный абонемент. Без скрытых платежей и долгих контрактов",
    
    // Sports Categories
    "sports.title": "Виды спорта",
    "sports.subtitle": "Выберите любимую активность из сотен доступных опций",
    "sports.fitness": "Фитнес",
    "sports.yoga": "Йога",
    "sports.swimming": "Плавание",
    "sports.martial": "Единоборства",
    "sports.dance": "Танцы",
    "sports.tennis": "Теннис",
    "sports.bonus.title": "Бонус",
    "sports.bonus.desc": "Приводите друзей и получайте бесплатные дни подписки",
    
    // How It Works
    "how.title": "Как это работает",
    "how.subtitle": "Три простых шага до вашей первой тренировки",
    "how.step1.title": "Скачайте приложение",
    "how.step1.desc": "Установите 1Fit из App Store или Google Play",
    "how.step2.title": "Выберите подписку",
    "how.step2.desc": "Подберите план, который соответствует вашим целям",
    "how.step3.title": "Начните тренировки",
    "how.step3.desc": "Бронируйте занятия и посещайте залы без ограничений",
    
    // Pricing
    "pricing.title": "Тарифы",
    "pricing.subtitle": "Выберите план, который подходит именно вам",
    "pricing.popular": "Популярный",
    "pricing.visits": "визитов",
    "pricing.unlimited": "Безлимит",
    "pricing.perMonth": "/месяц",
    "pricing.cta": "Выбрать",
    "pricing.features.gyms": "Доступ к 500+ залам",
    "pricing.features.booking": "Удобное бронирование",
    "pricing.features.support": "Поддержка 24/7",
    "pricing.features.freeze": "Заморозка подписки",
    
    // Download CTA
    "download.title": "Скачайте 1Fit прямо сейчас",
    "download.subtitle": "Присоединяйтесь к тысячам людей, которые уже тренируются с нами",
    "download.appStore": "App Store",
    "download.googlePlay": "Google Play",
    
    // Footer
    "footer.product": "Продукт",
    "footer.company": "Компания",
    "footer.support": "Поддержка",
    "footer.legal": "Правовая информация",
    "footer.about": "О нас",
    "footer.careers": "Карьера",
    "footer.blog": "Блог",
    "footer.contact": "Контакты",
    "footer.help": "Помощь",
    "footer.terms": "Условия использования",
    "footer.privacy": "Политика конфиденциальности",
    "footer.rights": "Все права защищены",
  },
  uz: {
    // Header
    "nav.gyms": "Barcha zallar",
    "nav.pricing": "Narxlar",
    "nav.companies": "Kompaniyalar uchun",
    "nav.partners": "Hamkorlar",
    "nav.faq": "FAQ",
    "nav.download": "Yuklab olish",
    "nav.downloadApp": "Ilovani yuklab olish",
    "nav.city": "Shahar",
    "nav.language": "Til",
    
    // Hero
    "hero.title": "Bitta obuna —",
    "hero.titleHighlight": "yuzlab zallar",
    "hero.subtitle": "1Fit yagona obunasi bilan shaharning eng yaxshi fitnes-klublarida, basseynlarida va studiyalarida mashq qiling",
    "hero.cta": "Mashqlarni boshlash",
    "hero.forbes": "Forbes Top 30",
    "hero.yoga": "Yoga",
    "hero.swimming": "Suzish",
    "hero.fitness": "Fitnes",
    
    // Benefits
    "benefits.title": "Nima uchun 1Fit tanlashadi",
    "benefits.subtitle": "Minglab odamlar allaqachon biz bilan mashq qilmoqda. Qo'shiling!",
    "benefits.gyms.title": "500+ zal",
    "benefits.gyms.desc": "Fitnes-klublar, basseynlar, yoga studiyalari va sport bo'limlari bitta ilovada",
    "benefits.flexible.title": "Moslashuvchan jadval",
    "benefits.flexible.desc": "Qulay vaqtda mashq qiling. Ilova orqali bir necha marta bosish bilan band qiling",
    "benefits.savings.title": "70% gacha tejash",
    "benefits.savings.desc": "Oddiy obunadan kamroq to'lang. Yashirin to'lovlar va uzoq shartnomalar yo'q",
    
    // Sports Categories
    "sports.title": "Sport turlari",
    "sports.subtitle": "Yuzlab mavjud variantlardan sevimli faoliyatingizni tanlang",
    "sports.fitness": "Fitnes",
    "sports.yoga": "Yoga",
    "sports.swimming": "Suzish",
    "sports.martial": "Jang san'atlari",
    "sports.dance": "Raqs",
    "sports.tennis": "Tennis",
    "sports.bonus.title": "Bonus",
    "sports.bonus.desc": "Do'stlaringizni taklif qiling va bepul obuna kunlarini oling",
    
    // How It Works
    "how.title": "Bu qanday ishlaydi",
    "how.subtitle": "Birinchi mashqingizgacha uchta oddiy qadam",
    "how.step1.title": "Ilovani yuklab oling",
    "how.step1.desc": "1Fit ni App Store yoki Google Play dan o'rnating",
    "how.step2.title": "Obunani tanlang",
    "how.step2.desc": "Maqsadlaringizga mos keladigan rejani tanlang",
    "how.step3.title": "Mashqlarni boshlang",
    "how.step3.desc": "Darslarni band qiling va zallarga cheksiz tashrif buyuring",
    
    // Pricing
    "pricing.title": "Tariflar",
    "pricing.subtitle": "O'zingizga mos rejani tanlang",
    "pricing.popular": "Mashhur",
    "pricing.visits": "tashrif",
    "pricing.unlimited": "Cheksiz",
    "pricing.perMonth": "/oy",
    "pricing.cta": "Tanlash",
    "pricing.features.gyms": "500+ zallarga kirish",
    "pricing.features.booking": "Qulay band qilish",
    "pricing.features.support": "24/7 qo'llab-quvvatlash",
    "pricing.features.freeze": "Obunani muzlatish",
    
    // Download CTA
    "download.title": "1Fit ni hoziroq yuklab oling",
    "download.subtitle": "Biz bilan mashq qilayotgan minglab odamlarga qo'shiling",
    "download.appStore": "App Store",
    "download.googlePlay": "Google Play",
    
    // Footer
    "footer.product": "Mahsulot",
    "footer.company": "Kompaniya",
    "footer.support": "Qo'llab-quvvatlash",
    "footer.legal": "Huquqiy ma'lumot",
    "footer.about": "Biz haqimizda",
    "footer.careers": "Karyera",
    "footer.blog": "Blog",
    "footer.contact": "Kontaktlar",
    "footer.help": "Yordam",
    "footer.terms": "Foydalanish shartlari",
    "footer.privacy": "Maxfiylik siyosati",
    "footer.rights": "Barcha huquqlar himoyalangan",
  },
  en: {
    // Header
    "nav.gyms": "All Gyms",
    "nav.pricing": "Pricing",
    "nav.companies": "For Companies",
    "nav.partners": "Partners",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "nav.downloadApp": "Download App",
    "nav.city": "City",
    "nav.language": "Language",
    
    // Hero
    "hero.title": "One subscription —",
    "hero.titleHighlight": "hundreds of gyms",
    "hero.subtitle": "Train at the best fitness clubs, pools and studios in the city with a single 1Fit subscription",
    "hero.cta": "Start Training",
    "hero.forbes": "Forbes Top 30",
    "hero.yoga": "Yoga",
    "hero.swimming": "Swimming",
    "hero.fitness": "Fitness",
    
    // Benefits
    "benefits.title": "Why Choose 1Fit",
    "benefits.subtitle": "Thousands of people are already training with us. Join them!",
    "benefits.gyms.title": "500+ Gyms",
    "benefits.gyms.desc": "Fitness clubs, pools, yoga studios and sports sections in one app",
    "benefits.flexible.title": "Flexible Schedule",
    "benefits.flexible.desc": "Train whenever convenient. Book classes in a few clicks via the app",
    "benefits.savings.title": "Save up to 70%",
    "benefits.savings.desc": "Pay less than a regular membership. No hidden fees or long contracts",
    
    // Sports Categories
    "sports.title": "Sports",
    "sports.subtitle": "Choose your favorite activity from hundreds of available options",
    "sports.fitness": "Fitness",
    "sports.yoga": "Yoga",
    "sports.swimming": "Swimming",
    "sports.martial": "Martial Arts",
    "sports.dance": "Dance",
    "sports.tennis": "Tennis",
    "sports.bonus.title": "Bonus",
    "sports.bonus.desc": "Invite friends and get free subscription days",
    
    // How It Works
    "how.title": "How It Works",
    "how.subtitle": "Three simple steps to your first workout",
    "how.step1.title": "Download the App",
    "how.step1.desc": "Install 1Fit from App Store or Google Play",
    "how.step2.title": "Choose a Plan",
    "how.step2.desc": "Select a plan that matches your goals",
    "how.step3.title": "Start Training",
    "how.step3.desc": "Book classes and visit gyms without limits",
    
    // Pricing
    "pricing.title": "Pricing",
    "pricing.subtitle": "Choose the plan that's right for you",
    "pricing.popular": "Popular",
    "pricing.visits": "visits",
    "pricing.unlimited": "Unlimited",
    "pricing.perMonth": "/month",
    "pricing.cta": "Choose",
    "pricing.features.gyms": "Access to 500+ gyms",
    "pricing.features.booking": "Convenient booking",
    "pricing.features.support": "24/7 support",
    "pricing.features.freeze": "Subscription freeze",
    
    // Download CTA
    "download.title": "Download 1Fit Now",
    "download.subtitle": "Join thousands of people already training with us",
    "download.appStore": "App Store",
    "download.googlePlay": "Google Play",
    
    // Footer
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.blog": "Blog",
    "footer.contact": "Contact",
    "footer.help": "Help",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ru");

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
