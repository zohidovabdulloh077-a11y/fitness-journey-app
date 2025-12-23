import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DownloadCTA = () => {
  const { t, language } = useLanguage();

  const availableIn = { ru: "Доступно в", uz: "Mavjud", en: "Available on" };
  const startToday = { ru: "Сегодня — лучшее время для старта", uz: "Bugun — boshlash uchun eng yaxshi vaqt", en: "Today is the best time to start" };

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container">
        <div className="relative bg-gradient-to-br from-primary via-primary to-lavender rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-mint/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
                {t("download.title")}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-md mx-auto lg:mx-0">
                {startToday[language]}
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="gap-3"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">{availableIn[language]}</div>
                    <div className="font-semibold">{t("download.appStore")}</div>
                  </div>
                </Button>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="gap-3"
                >
                  <Play className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">{availableIn[language]}</div>
                    <div className="font-semibold">{t("download.googlePlay")}</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="flex-shrink-0">
              <div className="relative w-64 md:w-72">
                {/* Phone Frame */}
                <div className="bg-foreground/90 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-background rounded-[2rem] overflow-hidden">
                    <div className="p-4 space-y-4">
                      {/* App Header */}
                      <div className="flex items-center justify-between">
                        <div className="bg-primary text-primary-foreground font-black text-lg px-3 py-1 rounded-lg">
                          1FIT
                        </div>
                        <div className="w-8 h-8 bg-muted rounded-full" />
                      </div>
                      
                      {/* Content Placeholder */}
                      <div className="space-y-3">
                        <div className="h-24 bg-gradient-to-br from-mint to-accent rounded-2xl" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-20 bg-lavender/30 rounded-xl" />
                          <div className="h-20 bg-coral/30 rounded-xl" />
                        </div>
                        <div className="h-16 bg-muted rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorations */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-xl rotate-12 float-animation shadow-lg" />
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-mint rounded-full float-animation-delayed shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
