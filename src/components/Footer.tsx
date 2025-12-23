import { Instagram, Send, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              Абонемент на все виды спорта в одном приложении
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
            <h4 className="font-bold text-lg mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Все залы и студии</a></li>
              <li><a href="#pricing" className="text-background/70 hover:text-background transition-colors text-sm">Цены</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Для компаний</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Партнёрам</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Правовая информация</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Политика конфиденциальности</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Условия использования</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors text-sm">Публичная оферта</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Контакты</h4>
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
              © {currentYear} 1FIT. Все права защищены.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-background/50 text-sm">Сделано с</span>
              <span className="text-coral">❤</span>
              <span className="text-background/50 text-sm">в Ташкенте</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
