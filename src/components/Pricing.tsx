import { Button } from "@/components/ui/button";
import { Check, Sparkles, Users, Building } from "lucide-react";

const plans = [
  {
    duration: "3 месяца",
    pricePerMonth: "183",
    totalPrice: "550",
    guests: 2,
    gyms: "190+",
    popular: false,
    color: "bg-mint",
  },
  {
    duration: "6 месяцев",
    pricePerMonth: "117",
    totalPrice: "700",
    guests: 2,
    gyms: "190+",
    popular: false,
    color: "bg-lavender",
  },
  {
    duration: "12 месяцев",
    pricePerMonth: "100",
    totalPrice: "1 200",
    guests: 2,
    gyms: "190+",
    popular: false,
    color: "bg-coral",
  },
  {
    duration: "12 + 3 месяца",
    pricePerMonth: "121",
    totalPrice: "1 450",
    originalPrice: "1 999",
    guests: 2,
    gyms: "190+",
    popular: true,
    color: "bg-gold",
  },
];

const Pricing = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/50" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Выберите свой абонемент
          </h2>
          <p className="text-lg text-muted-foreground">
            В каждом абонементе есть бесплатные гостевые для друзей и дни заморозки
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.duration}
              className={`relative bg-card rounded-3xl p-6 shadow-card card-hover border ${
                plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Популярный
                </div>
              )}

              {/* Plan Image/Icon */}
              <div className={`w-full h-32 ${plan.color} rounded-2xl mb-6 flex items-center justify-center`}>
                <span className="text-4xl font-black text-foreground/80">
                  {plan.duration.split(" ")[0]}
                </span>
              </div>

              {/* Plan Details */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{plan.duration}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-foreground">₼{plan.pricePerMonth}</span>
                  <span className="text-muted-foreground">/месяц</span>
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
                  <span className="text-muted-foreground">{plan.guests} бесплатных гостевых</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{plan.gyms} залов</span>
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full"
              >
                Скачать приложение
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
