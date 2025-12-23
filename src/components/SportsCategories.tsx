import { Button } from "@/components/ui/button";
import { Dumbbell, Waves, Heart, Zap, Music, Swords, Flame, Sparkles } from "lucide-react";

const categories = [
  { name: "Тренажерный зал", count: "91 зал", icon: Dumbbell, color: "bg-mint" },
  { name: "Водные виды спорта", count: "19 залов", icon: Waves, color: "bg-primary/20" },
  { name: "Стретчинг и Пилатес", count: "51 зал", icon: Heart, color: "bg-pink" },
  { name: "Йога", count: "24 зала", icon: Sparkles, color: "bg-lavender" },
  { name: "Интенсивные занятия", count: "15 залов", icon: Zap, color: "bg-gold" },
  { name: "Единоборства", count: "9 залов", icon: Swords, color: "bg-coral" },
];

const SportsCategories = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/50" id="gyms">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Собрали все виды спорта
          </h2>
          <p className="text-lg text-muted-foreground">
            И каждый месяц добавляем что-то новенькое
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group bg-card rounded-2xl p-5 lg:p-6 shadow-card card-hover border border-border/50 flex items-center gap-4 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <category.icon className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg">
            Скачать приложение
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
                Восстановитесь в бане
              </h3>
              <p className="text-lg text-primary-foreground/80 max-w-md mx-auto">
                Это приятный бонус к занятиям. Расслабить мышцы и попариться
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;
