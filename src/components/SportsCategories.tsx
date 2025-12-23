import { Button } from "@/components/ui/button";
import { Dumbbell, Waves, Heart, Zap, Music, Swords, Flame, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SportsCategories = () => {
  const { t, language } = useLanguage();

  const categories = [
    { 
      name: { ru: "Тренажерный зал", uz: "Trenajyor zal", en: "Gym" },
      count: { ru: "91 зал", uz: "91 ta zal", en: "91 gyms" },
      icon: Dumbbell, 
      color: "bg-mint" 
    },
    { 
      name: { ru: "Водные виды спорта", uz: "Suv sporti", en: "Water Sports" },
      count: { ru: "19 залов", uz: "19 ta zal", en: "19 pools" },
      icon: Waves, 
      color: "bg-primary/20" 
    },
    { 
      name: { ru: "Стретчинг и Пилатес", uz: "Stretching va Pilates", en: "Stretching & Pilates" },
      count: { ru: "51 зал", uz: "51 ta zal", en: "51 studios" },
      icon: Heart, 
      color: "bg-pink" 
    },
    { 
      name: { ru: "Йога", uz: "Yoga", en: "Yoga" },
      count: { ru: "24 зала", uz: "24 ta zal", en: "24 studios" },
      icon: Sparkles, 
      color: "bg-lavender" 
    },
    { 
      name: { ru: "Интенсивные занятия", uz: "Intensiv mashg'ulotlar", en: "Intensive Training" },
      count: { ru: "15 залов", uz: "15 ta zal", en: "15 gyms" },
      icon: Zap, 
      color: "bg-gold" 
    },
    { 
      name: { ru: "Единоборства", uz: "Jang san'atlari", en: "Martial Arts" },
      count: { ru: "9 залов", uz: "9 ta zal", en: "9 gyms" },
      icon: Swords, 
      color: "bg-coral" 
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/50" id="gyms">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("sports.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("sports.subtitle")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.name[language]}
              className="group bg-card rounded-2xl p-5 lg:p-6 shadow-card card-hover border border-border/50 flex items-center gap-4 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <category.icon className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{category.name[language]}</h3>
                <p className="text-sm text-muted-foreground">{category.count[language]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg">
            {t("nav.downloadApp")}
          </Button>
        </div>

        {/* Bonus Section */}
        <div className="mt-20 md:mt-28">
          <div className="bg-gradient-to-br from-primary to-lavender rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-mint/30 rounded-full float-animation" />
            <div className="absolute bottom-8 right-12 w-20 h-20 bg-gold/30 rounded-2xl rotate-12 float-animation-delayed" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Flame className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary-foreground mb-4">
                {t("sports.bonus.title")}
              </h3>
              <p className="text-lg text-primary-foreground/80 max-w-md mx-auto">
                {t("sports.bonus.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;
