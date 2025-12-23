import { Button } from "@/components/ui/button";
import { Check, Sparkles, Users, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t, language } = useLanguage();

  const plans = [
    {
      duration: { ru: "3 месяца", uz: "3 oy", en: "3 months" },
      pricePerMonth: "183",
      totalPrice: "550",
      guests: 2,
      gyms: "190+",
      popular: false,
      color: "bg-mint",
    },
    {
      duration: { ru: "6 месяцев", uz: "6 oy", en: "6 months" },
      pricePerMonth: "117",
      totalPrice: "700",
      guests: 2,
      gyms: "190+",
      popular: false,
      color: "bg-lavender",
    },
    {
      duration: { ru: "12 месяцев", uz: "12 oy", en: "12 months" },
      pricePerMonth: "100",
      totalPrice: "1 200",
      guests: 2,
      gyms: "190+",
      popular: false,
      color: "bg-coral",
    },
    {
      duration: { ru: "12 + 3 месяца", uz: "12 + 3 oy", en: "12 + 3 months" },
      pricePerMonth: "121",
      totalPrice: "1 450",
      originalPrice: "1 999",
      guests: 2,
      gyms: "190+",
      popular: true,
      color: "bg-gold",
    },
  ];

  const guestText = { ru: "бесплатных гостевых", uz: "bepul mehmon", en: "free guest passes" };
  const gymsText = { ru: "залов", uz: "zal", en: "gyms" };

  return (
    <section className="py-20 md:py-32 bg-muted/50" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.duration[language]}
              className={`relative bg-card rounded-3xl p-6 shadow-card card-hover border ${
                plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {t("pricing.popular")}
                </div>
              )}

              {/* Plan Image/Icon */}
              <div className={`w-full h-32 ${plan.color} rounded-2xl mb-6 flex items-center justify-center`}>
                <span className="text-4xl font-black text-foreground/80">
                  {plan.duration[language].split(" ")[0]}
                </span>
              </div>

              {/* Plan Details */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{plan.duration[language]}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-foreground">₼{plan.pricePerMonth}</span>
                  <span className="text-muted-foreground">{t("pricing.perMonth")}</span>
                </div>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-muted-foreground">₼{plan.totalPrice}</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">₼{plan.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{plan.guests} {guestText[language]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{plan.gyms} {gymsText[language]}</span>
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full"
              >
                {t("pricing.cta")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
