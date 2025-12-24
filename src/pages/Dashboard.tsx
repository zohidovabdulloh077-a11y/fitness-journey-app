import React, { useEffect, useState } from 'react';
import { Flame, Footprints, Clock, Droplets, Dumbbell, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';

interface DailyStats {
  steps: number;
  calories_burned: number;
  active_minutes: number;
  water_glasses: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState<DailyStats>({
    steps: 0,
    calories_burned: 0,
    active_minutes: 0,
    water_glasses: 0,
  });
  const [profile, setProfile] = useState<{ full_name: string | null }>({ full_name: null });
  const [quoteIndex] = useState(Math.floor(Math.random() * 3) + 1);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch or create today's stats
      const today = new Date().toISOString().split('T')[0];
      const { data: statsData } = await supabase
        .from('daily_stats')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (statsData) {
        setStats(statsData);
      } else {
        // Create today's stats
        await supabase.from('daily_stats').insert({
          user_id: user.id,
          date: today,
        });
      }
    };

    fetchData();
  }, [user]);

  const addWater = async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const newWaterCount = stats.water_glasses + 1;
    
    await supabase
      .from('daily_stats')
      .update({ water_glasses: newWaterCount })
      .eq('user_id', user.id)
      .eq('date', today);

    setStats({ ...stats, water_glasses: newWaterCount });
  };

  const statCards = [
    {
      icon: Footprints,
      label: t('steps'),
      value: stats.steps.toLocaleString(),
      target: '10,000',
      color: 'from-blue-500 to-cyan-500',
      progress: (stats.steps / 10000) * 100,
    },
    {
      icon: Flame,
      label: t('calories'),
      value: stats.calories_burned.toString(),
      target: '500',
      unit: t('kcal'),
      color: 'from-orange-500 to-red-500',
      progress: (stats.calories_burned / 500) * 100,
    },
    {
      icon: Clock,
      label: t('activeMinutes'),
      value: stats.active_minutes.toString(),
      target: '60',
      unit: t('minutes'),
      color: 'from-green-500 to-emerald-500',
      progress: (stats.active_minutes / 60) * 100,
    },
    {
      icon: Droplets,
      label: t('water'),
      value: stats.water_glasses.toString(),
      target: '8',
      unit: t('glasses'),
      color: 'from-blue-400 to-blue-600',
      progress: (stats.water_glasses / 8) * 100,
    },
  ];

  const firstName = profile.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="relative px-6 pt-12 pb-8">
          <p className="text-muted-foreground mb-1">{t('welcome')},</p>
          <h1 className="text-3xl font-bold text-foreground font-display">{firstName}</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Daily Stats */}
        <section className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('todayStats')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="stat-card"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                    {stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(stat.progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('quickActions')}</h2>
          <div className="grid grid-cols-3 gap-4">
            <button className="stat-card flex flex-col items-center gap-3 py-6">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{t('startWorkout')}</span>
            </button>
            
            <button onClick={addWater} className="stat-card flex flex-col items-center gap-3 py-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{t('logWater')}</span>
            </button>
            
            <button className="stat-card flex flex-col items-center gap-3 py-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{t('viewProgress')}</span>
            </button>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Sparkles className="w-6 h-6 text-primary opacity-50" />
            </div>
            <h3 className="text-sm font-medium text-primary mb-2">{t('motivationalQuote')}</h3>
            <p className="text-lg font-medium text-foreground italic">
              "{t(`quote${quoteIndex}`)}"
            </p>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
