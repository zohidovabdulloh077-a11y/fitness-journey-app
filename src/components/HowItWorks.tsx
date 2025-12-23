import { Download, MapPin, QrCode } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Скачайте приложение",
    description: "Купите абонемент или получите бесплатный гостевой от друга",
    icon: Download,
    color: "bg-mint",
  },
  {
    number: "02",
    title: "Выберите, куда сходить",
    description: "Найдите подходящий зал рядом с домом или работой",
    icon: MapPin,
    color: "bg-lavender",
  },
  {
    number: "03",
    title: "Приходите на занятие",
    description: "На входе в зал отсканируйте QR-код и занимайтесь",
    icon: QrCode,
    color: "bg-coral",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Как посетить первое занятие?
          </h2>
          <p className="text-lg text-muted-foreground">
            Всего три простых шага до вашей первой тренировки
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
