import React, { useEffect, useState } from 'react';
import { Camera, Edit2, Target, Scale, Ruler, Calendar, Flame, Dumbbell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  fitness_goal: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  created_at: string;
}

interface WorkoutStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
}

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({ total: 0, thisWeek: 0, thisMonth: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    weight_kg: '',
    height_cm: '',
    fitness_goal: 'general_fitness',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || '',
          weight_kg: data.weight_kg?.toString() || '',
          height_cm: data.height_cm?.toString() || '',
          fitness_goal: data.fitness_goal || 'general_fitness',
        });
      }

      // Fetch workout stats
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const { count: totalCount } = await supabase
        .from('workouts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: weekCount } = await supabase
        .from('workouts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('completed_at', startOfWeek.toISOString());

      const { count: monthCount } = await supabase
        .from('workouts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('completed_at', startOfMonth.toISOString());

      setWorkoutStats({
        total: totalCount || 0,
        thisWeek: weekCount || 0,
        thisMonth: monthCount || 0,
      });
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    await supabase
      .from('profiles')
      .update({
        full_name: editForm.full_name,
        weight_kg: editForm.weight_kg ? parseFloat(editForm.weight_kg) : null,
        height_cm: editForm.height_cm ? parseFloat(editForm.height_cm) : null,
        fitness_goal: editForm.fitness_goal,
      })
      .eq('user_id', user.id);

    setProfile({
      ...profile!,
      full_name: editForm.full_name,
      weight_kg: editForm.weight_kg ? parseFloat(editForm.weight_kg) : null,
      height_cm: editForm.height_cm ? parseFloat(editForm.height_cm) : null,
      fitness_goal: editForm.fitness_goal,
    });
    setIsEditing(false);
  };

  const goalOptions = [
    { value: 'general_fitness', label: t('generalFitness') },
    { value: 'weight_loss', label: t('weightLoss') },
    { value: 'muscle_gain', label: t('muscleGain') },
    { value: 'flexibility', label: t('flexibility') },
    { value: 'endurance', label: t('endurance') },
  ];

  const getGoalLabel = (value: string) => {
    return goalOptions.find(opt => opt.value === value)?.label || value;
  };

  const memberSince = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString() 
    : '';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 h-48 gradient-primary opacity-20" />
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-foreground font-display">{t('profile')}</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-xl bg-card/80 backdrop-blur border border-border"
            >
              <Edit2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        {/* Profile Card */}
        <div className="glass-card p-6 animate-fade-up">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-primary-foreground">
                    {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-secondary flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="input-field text-lg font-bold"
                  placeholder={t('fullName')}
                />
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground">
                    {profile?.full_name || user?.email?.split('@')[0]}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{workoutStats.total}</p>
              <p className="text-xs text-muted-foreground">{t('totalWorkouts')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{workoutStats.thisWeek}</p>
              <p className="text-xs text-muted-foreground">{t('thisWeek')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{workoutStats.thisMonth}</p>
              <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold text-foreground">{t('fitnessGoal')}</h3>
          
          {isEditing ? (
            <select
              value={editForm.fitness_goal}
              onChange={(e) => setEditForm({ ...editForm, fitness_goal: e.target.value })}
              className="input-field"
            >
              {goalOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-medium text-foreground">
                {getGoalLabel(profile?.fitness_goal || 'general_fitness')}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Scale className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('weight')}</span>
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.weight_kg}
                  onChange={(e) => setEditForm({ ...editForm, weight_kg: e.target.value })}
                  className="input-field"
                  placeholder="70"
                />
              ) : (
                <p className="text-xl font-bold text-foreground">
                  {profile?.weight_kg || '—'} <span className="text-sm text-muted-foreground">{t('kg')}</span>
                </p>
              )}
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Ruler className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('height')}</span>
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.height_cm}
                  onChange={(e) => setEditForm({ ...editForm, height_cm: e.target.value })}
                  className="input-field"
                  placeholder="175"
                />
              ) : (
                <p className="text-xl font-bold text-foreground">
                  {profile?.height_cm || '—'} <span className="text-sm text-muted-foreground">{t('cm')}</span>
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4">
              <button onClick={() => setIsEditing(false)} className="flex-1 btn-secondary">
                {t('cancel')}
              </button>
              <button onClick={handleSave} className="flex-1 btn-primary">
                {t('save')}
              </button>
            </div>
          )}

          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('memberSince')}</p>
              <p className="font-medium text-foreground">{memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
