import { Download, MapPin, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("how.step1.title"),
      description: t("how.step1.desc"),
      icon: Download,
      color: "bg-mint",
    },
    {
      number: "02",
      title: t("how.step2.title"),
      description: t("how.step2.desc"),
      icon: MapPin,
      color: "bg-lavender",
    },
    {
      number: "03",
      title: t("how.step3.title"),
      description: t("how.step3.desc"),
      icon: QrCode,
      color: "bg-coral",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("how.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("how.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-0.5 bg-border" />
              )}
              
              <div className="text-center">
                {/* Icon Circle */}
                <div className="relative inline-block mb-6">
                  <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <step.icon className="w-10 h-10 text-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
