import React, { useEffect, useState } from 'react';
import { Sun, Moon, Globe, Bell, Lock, LogOut, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setNotifications(data.notifications_enabled ?? true);
        if (data.theme === 'light' || data.theme === 'dark') {
          setTheme(data.theme);
        }
        if (data.language && ['en', 'uz', 'ru'].includes(data.language)) {
          setLanguage(data.language as Language);
        }
      }
    };

    fetchSettings();
  }, [user]);

  const updateSetting = async (key: string, value: any) => {
    if (!user) return;
    
    await supabase
      .from('user_settings')
      .update({ [key]: value })
      .eq('user_id', user.id);
  };

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    updateSetting('theme', newTheme);
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled);
    updateSetting('notifications_enabled', enabled);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    updateSetting('language', lang);
    setShowLanguageModal(false);
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({ title: t('error'), description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (passwords.new.length < 6) {
      toast({ title: t('error'), description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: passwords.new });
    
    if (error) {
      toast({ title: t('error'), description: error.message, variant: 'destructive' });
    } else {
      toast({ title: t('success'), description: 'Password updated successfully' });
      setShowPasswordModal(false);
      setPasswords({ current: '', new: '', confirm: '' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'uz' as Language, name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  ];

  const getCurrentLanguage = () => {
    return languages.find(l => l.code === language) || languages[0];
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground font-display">{t('settings')}</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Appearance */}
        <section className="animate-fade-up">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('appearance')}
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-warning" />
                )}
                <span className="font-medium text-foreground">
                  {theme === 'dark' ? t('darkMode') : t('lightMode')}
                </span>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('language')}
          </h2>
          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{getCurrentLanguage().name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getCurrentLanguage().flag}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        </section>

        {/* Notifications */}
        <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('notifications')}
          </h2>
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{t('enableNotifications')}</span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={handleNotificationsChange}
            />
          </div>
        </section>

        {/* Account */}
        <section className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('account')}
          </h2>
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full p-4 flex items-center justify-between border-b border-border"
            >
              <div className="flex items-center gap-4">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{t('changePassword')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full p-4 flex items-center gap-4"
            >
              <LogOut className="w-5 h-5 text-destructive" />
              <span className="font-medium text-destructive">{t('signOut')}</span>
            </button>
          </div>
        </section>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card rounded-t-3xl p-6 animate-slide-in-up">
            <h3 className="text-xl font-bold text-foreground mb-4">{t('language')}</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
                    language === lang.code ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-foreground">{lang.name}</span>
                  </div>
                  {language === lang.code && <Check className="w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-4 btn-secondary"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card rounded-2xl p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-foreground mb-4">{t('changePassword')}</h3>
            <div className="space-y-4">
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder={t('newPassword')}
                className="input-field"
              />
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder={t('confirmPassword')}
                className="input-field"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 btn-secondary"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handlePasswordChange}
                className="flex-1 btn-primary"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Settings;
