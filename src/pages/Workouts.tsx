import React, { useEffect, useState } from 'react';
import { Clock, Flame, Play, CheckCircle, Dumbbell, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';

interface Workout {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  calories_burned: number | null;
  workout_type: string;
  completed_at: string;
}

const workoutPlans = [
  {
    id: 'beginner',
    name: 'beginnerPlan',
    duration: 20,
    calories: 150,
    color: 'from-green-500 to-emerald-500',
    exercises: ['Jumping Jacks', 'Squats', 'Push-ups', 'Plank'],
  },
  {
    id: 'intermediate',
    name: 'intermediatePlan',
    duration: 35,
    calories: 300,
    color: 'from-blue-500 to-cyan-500',
    exercises: ['Burpees', 'Lunges', 'Mountain Climbers', 'Dips'],
  },
  {
    id: 'advanced',
    name: 'advancedPlan',
    duration: 50,
    calories: 500,
    color: 'from-purple-500 to-pink-500',
    exercises: ['Box Jumps', 'Deadlifts', 'Pull-ups', 'HIIT Circuit'],
  },
];

const Workouts = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (data) {
        setRecentWorkouts(data);
      }
    };

    fetchWorkouts();
  }, [user]);

  const startWorkout = async (plan: typeof workoutPlans[0]) => {
    if (!user) return;
    setActiveWorkout(plan.id);

    // Simulate workout completion after a few seconds
    setTimeout(async () => {
      const { error } = await supabase.from('workouts').insert({
        user_id: user.id,
        name: t(plan.name),
        description: plan.exercises.join(', '),
        duration_minutes: plan.duration,
        calories_burned: plan.calories,
        workout_type: plan.id,
      });

      if (!error) {
        // Update daily stats
        const today = new Date().toISOString().split('T')[0];
        await supabase.rpc('increment_workout_stats', {
          p_user_id: user.id,
          p_date: today,
          p_calories: plan.calories,
          p_minutes: plan.duration,
        }).catch(() => {
          // RPC might not exist, update directly
          supabase
            .from('daily_stats')
            .update({
              calories_burned: plan.calories,
              active_minutes: plan.duration,
              workouts_completed: 1,
            })
            .eq('user_id', user.id)
            .eq('date', today);
        });

        toast({
          title: t('success'),
          description: `${t(plan.name)} ${t('completed')}!`,
        });

        // Refresh workouts
        const { data } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(5);

        if (data) {
          setRecentWorkouts(data);
        }
      }

      setActiveWorkout(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground font-display">{t('workouts')}</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Workout Plans */}
        <section className="animate-fade-up">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('workoutPlans')}</h2>
          <div className="space-y-4">
            {workoutPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="glass-card p-5 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                        <Dumbbell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{t(plan.name)}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {plan.duration} {t('minutes')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {plan.calories} {t('kcal')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.exercises.map((exercise) => (
                        <span
                          key={exercise}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                        >
                          {exercise}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => startWorkout(plan)}
                    disabled={activeWorkout !== null}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      activeWorkout === plan.id
                        ? 'bg-primary animate-pulse'
                        : `bg-gradient-to-br ${plan.color}`
                    }`}
                  >
                    {activeWorkout === plan.id ? (
                      <Timer className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Workouts */}
        <section className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('recentWorkouts')}</h2>
          {recentWorkouts.length > 0 ? (
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {workout.duration_minutes} {t('minutes')} • {workout.calories_burned} {t('kcal')}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(workout.completed_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('noWorkouts')}</p>
              <p className="text-sm text-muted-foreground mt-1">{t('startFirst')}</p>
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Workouts;
