import { Instagram, Send, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const madeWith = { ru: "Сделано с", uz: "Bilan yaratilgan", en: "Made with" };
  const inCity = { ru: "в Ташкенте", uz: "Toshkentda", en: "in Tashkent" };
  const tagline = { 
    ru: "Абонемент на все виды спорта в одном приложении", 
    uz: "Bir ilovada barcha sport turlari uchun obuna", 
    en: "Subscription for all sports in one app" 
  };
  const allGyms = { ru: "Все залы и студии", uz: "Barcha zallar va studiyalar", en: "All gyms and studios" };
  const forCompanies = { ru: "Для компаний", uz: "Kompaniyalar uchun", en: "For companies" };
  const forPartners = { ru: "Партнёрам", uz: "Hamkorlar uchun", en: "For partners" };
  const publicOffer = { ru: "Публичная оферта", uz: "Ommaviy taklif", en: "Public offer" };

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-primary-foreground font-black text-2xl px-4 py-2 rounded-xl inline-block mb-4">
              1FIT
            </div>
            <p className="text-background/70 text-sm mb-4">
              {tagline[language]}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-xl flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-xl flex items-center justify-center transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer.product")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{allGyms[language]}</a></li>
              <li><a href="#pricing" className="text-background/70 hover:text-background transition-colors text-sm">{t("nav.pricing")}</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{forCompanies[language]}</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{forPartners[language]}</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{t("nav.faq")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{t("footer.privacy")}</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{t("footer.terms")}</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">{publicOffer[language]}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+998712345678" className="text-background/70 hover:text-background transition-colors text-sm">
                  +998 71 234 56 78
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@1fit.app" className="text-background/70 hover:text-background transition-colors text-sm">
                  info@1fit.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} 1FIT. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-background/50 text-sm">{madeWith[language]}</span>
              <span className="text-coral">❤</span>
              <span className="text-background/50 text-sm">{inCity[language]}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
