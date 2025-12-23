import { Dumbbell, Waves, Heart, Zap, Music, Swords } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-20 md:py-32 bg-background" id="benefits">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Новый способ<br />добавить спорт в свою жизнь
          </h2>
          <p className="text-lg text-muted-foreground">
            Приложение, в котором мы собрали несколько десятков активностей. Всё, от йоги до кроссфита
          </p>
        </div>

        {/* Sport Icons Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 md:mb-24">
          {[
            { icon: Dumbbell, color: "bg-mint", label: "Тренажёрка" },
            { icon: Waves, color: "bg-primary/20", label: "Бассейн" },
            { icon: Heart, color: "bg-pink", label: "Йога" },
            { icon: Zap, color: "bg-gold", label: "Кроссфит" },
            { icon: Music, color: "bg-lavender", label: "Танцы" },
            { icon: Swords, color: "bg-coral", label: "Единоборства" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <item.icon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="group bg-card rounded-3xl p-6 lg:p-8 shadow-card card-hover border border-border/50">
            <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">Разнообразие</h3>
            <p className="text-muted-foreground">
              Найдётся вид спорта даже для тех, кто уже попробовал всё
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-card rounded-3xl p-6 lg:p-8 shadow-card card-hover border border-border/50">
            <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M12 12h.01" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">Рассрочка</h3>
            <p className="text-muted-foreground">
              Это как подписка на фитнес. Платите не сразу, а по частям
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-card rounded-3xl p-6 lg:p-8 shadow-card card-hover border border-border/50">
            <div className="w-16 h-16 bg-coral rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">Удобство</h3>
            <p className="text-muted-foreground">
              Залы в любой точке города. Рядом с домом или работой
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
