import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, MapPin, Globe } from "lucide-react";
import { useState } from "react";

const cities = [
  { id: "tashkent", name: "Ташкент", flag: "🇺🇿" },
  { id: "samarkand", name: "Самарканд", flag: "🇺🇿" },
  { id: "bukhara", name: "Бухара", flag: "🇺🇿" },
  { id: "almaty", name: "Алматы", flag: "🇰🇿" },
  { id: "astana", name: "Астана", flag: "🇰🇿" },
  { id: "baku", name: "Баку", flag: "🇦🇿" },
];

const languages = [
  { id: "ru", name: "Русский", code: "RU" },
  { id: "uz", name: "O'zbekcha", code: "UZ" },
  { id: "en", name: "English", code: "EN" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const navItems = [
    { label: "Все залы", href: "#gyms" },
    { label: "Цены", href: "#pricing" },
    { label: "Для компаний", href: "#companies" },
    { label: "Партнёрам", href: "#partners" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground font-black text-xl px-3 py-1.5 rounded-lg">
            1FIT
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* City Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <span>{selectedCity.flag}</span>
                <span>{selectedCity.name}</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg z-[100]">
              {cities.map((city) => (
                <DropdownMenuItem
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={`flex items-center gap-2 cursor-pointer ${
                    selectedCity.id === city.id ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <span>{city.flag}</span>
                  <span>{city.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Globe className="w-4 h-4" />
                <span>{selectedLanguage.code}</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background border border-border shadow-lg z-[100]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`flex items-center gap-2 cursor-pointer ${
                    selectedLanguage.id === lang.id ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <span className="font-medium">{lang.code}</span>
                  <span className="text-muted-foreground">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="default" size="sm" className="hidden sm:flex">
            Скачать
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile City Selector */}
            <div className="px-4 py-2 border-t border-border mt-2">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Город
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedCity.id === city.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {city.flag} {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Language Selector */}
            <div className="px-4 py-2">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Язык
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedLanguage.id === lang.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="default" className="mt-4 mx-4">
              Скачать приложение
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
