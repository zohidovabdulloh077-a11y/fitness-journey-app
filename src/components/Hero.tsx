import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden pt-20">
      {/* Decorative shapes */}
      <div className="absolute top-32 right-[20%] w-24 h-24 bg-mint rounded-full opacity-80 float-animation" />
      <div className="absolute top-48 right-[35%] w-16 h-16 bg-coral shape-blob opacity-70 float-animation-delayed" />
      <div className="absolute bottom-32 left-[15%] w-20 h-20 bg-lavender rounded-2xl rotate-12 opacity-60 float-animation-slow" />
      <div className="absolute top-[40%] left-[8%] w-12 h-12 bg-gold rounded-full opacity-70 float-animation" />
      
      {/* Gold medal decoration */}
      <div className="absolute top-24 right-[10%] w-20 h-20 bg-gold rounded-full flex items-center justify-center float-animation-delayed shadow-lg">
        <span className="text-3xl font-black text-foreground">365</span>
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center min-h-[calc(100vh-5rem)] py-12 lg:py-0">
        {/* Left Content */}
        <div className="flex-1 text-primary-foreground space-y-6 lg:space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight slide-up">
            {t("hero.title")}<br />{t("hero.titleHighlight")}
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg mx-auto lg:mx-0 slide-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.subtitle")}
          </p>
          
          <div className="slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="lg" className="group">
              {t("hero.cta")}
              <Sparkles className="ml-2 group-hover:rotate-12 transition-transform" size={20} />
            </Button>
          </div>
          
          {/* Forbes Badge */}
          <div className="flex items-center gap-3 justify-center lg:justify-start slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-sm font-medium text-primary-foreground/90">
              {t("hero.forbes")}
            </span>
          </div>
        </div>

        {/* Right Side - Phone Mockup & Athletes */}
        <div className="flex-1 relative mt-12 lg:mt-0 w-full max-w-xl lg:max-w-none">
          {/* Phone Mockup */}
          <div className="relative mx-auto w-64 md:w-72 lg:w-80">
            <div className="bg-background rounded-[2.5rem] p-2 shadow-2xl">
              <div className="bg-muted rounded-[2rem] overflow-hidden">
                <div className="p-4 space-y-4">
                  {/* App Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-lavender" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{t("hero.swimming")}</p>
                      <p className="text-xs text-muted-foreground">Today · 12:00 · 60min</p>
                    </div>
                  </div>
                  
                  {/* Time Slots */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                      19:00
                    </div>
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                      21:00
                    </div>
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                      22:00
                    </div>
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                      23:00
                    </div>
                  </div>

                  {/* Placeholder for more content */}
                  <div className="h-32 bg-secondary/50 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Athlete Cards floating around */}
          <div className="absolute -left-8 md:-left-16 top-1/4 w-32 md:w-40 h-40 md:h-48 rounded-3xl overflow-hidden shadow-lg float-animation hidden sm:block">
            <div className="w-full h-full bg-gradient-to-br from-mint to-accent flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 bg-foreground/10 rounded-2xl mb-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <circle cx="9" cy="9" r="1" fill="currentColor"/>
                  <circle cx="15" cy="9" r="1" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-foreground/90">{t("hero.yoga")}</span>
            </div>
          </div>
          
          <div className="absolute -right-4 md:-right-12 top-0 w-28 md:w-36 h-36 md:h-44 rounded-3xl overflow-hidden shadow-lg float-animation-delayed hidden sm:block">
            <div className="w-full h-full bg-gradient-to-br from-primary/60 to-lavender flex flex-col items-center justify-center p-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12h2a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h12"/>
                  <path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-primary-foreground">{t("hero.swimming")}</span>
            </div>
          </div>
          
          <div className="absolute -right-8 md:-right-16 bottom-12 w-32 md:w-40 h-40 md:h-48 rounded-3xl overflow-hidden shadow-lg float-animation-slow hidden sm:block">
            <div className="w-full h-full bg-gradient-to-br from-pink to-coral flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 bg-foreground/10 rounded-2xl mb-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l6-3 6 3"/>
                  <path d="M6 6v12"/>
                  <path d="M18 6v12"/>
                  <rect x="8" y="6" width="8" height="12" rx="1"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-foreground/90">{t("hero.fitness")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
