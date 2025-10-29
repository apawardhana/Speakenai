import { useEffect, useState } from 'react';
import { 
  MessageSquare, Video, CheckCircle2, BarChart3, Mic, 
  Zap, TrendingUp, Trophy, Target, Star, Clock, Award 
} from 'lucide-react';
import { Button } from './ui/button';

interface UserSettings {
  name?: string;
  level?: string;
  streak?: string;
  learningTime?: string;
  streakCount?: number;
  learningTimeValue?: number;
}

export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [user, setUser] = useState<UserSettings>({
    name: 'John',
    level: 'B1',
    streak: '0 Days',
    learningTime: '0.0 hrs',
  });

  // 🧠 Auto sync streak + learning time
  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    let parsed: UserSettings = saved ? JSON.parse(saved) : {};

    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');

    // 🔥 Auto increment streak tiap hari login
    if (lastLogin !== today) {
      const newStreak = (parsed.streakCount ?? 0) + 1;
      parsed.streakCount = newStreak;
      parsed.streak = `${newStreak} Days`;
      localStorage.setItem('lastLoginDate', today);
    }

    // ⏱️ Learning time tracker
    let totalLearningTime = parsed.learningTimeValue ?? 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const minutesPassed = (Date.now() - startTime) / 1000 / 60;
      totalLearningTime += minutesPassed;
      parsed.learningTimeValue = totalLearningTime;
      parsed.learningTime = `${(totalLearningTime / 60).toFixed(1)} hrs`;
      localStorage.setItem('userSettings', JSON.stringify(parsed));
      setUser({ ...parsed });
    }, 60000);

    setUser({
      name: parsed.name || 'John',
      level: parsed.level || 'B1',
      streak: parsed.streak || '1 Day',
      learningTime: parsed.learningTime || '0.0 hrs',
    });

    return () => clearInterval(timer);
  }, []);

  // 🎓 Level description text
  const getLevelDescription = (level?: string) => {
    switch (level?.toUpperCase()) {
      case 'A1': return 'A1 • Beginner';
      case 'A2': return 'A2 • Elementary';
      case 'B1': return 'B1 • Intermediate';
      case 'B2': return 'B2 • Upper Intermediate';
      case 'C1': return 'C1 • Advanced';
      case 'C2': return 'C2 • Mastery';
      default: return level || 'Not Set';
    }
  };

  const firstName = user.name?.split(' ')[0] || 'John';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-xl mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8" />
              <div>
                <h2>Welcome Back, {firstName}!</h2>
                <p className="text-white/90">Keep up the great work on your progress!</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Streak */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Current Streak</p>
                    <p className="text-2xl">{user.streak}</p>
                  </div>
                </div>
              </div>

              {/* Learning Time */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Learning Time</p>
                    <p className="text-2xl">{user.learningTime}</p>
                  </div>
                </div>
              </div>

              {/* Level */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Level</p>
                    <p className="text-2xl">{getLevelDescription(user.level)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Chat Mode */}
          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="mb-3">Chat Mode</h2>
            <p className="text-muted-foreground mb-6">
              Latihan menulis dengan analisis grammar otomatis dan feedback instan.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Grammar correction & suggestions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Vocabulary enhancement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Real-time feedback</span>
              </li>
            </ul>
            <Button onClick={() => onNavigate('chat')} className="w-full py-6 rounded-xl shadow-md hover:shadow-lg">
              Start Chat Mode
            </Button>
          </div>

          {/* Roleplay Mode */}
          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">Featured</span>
            </div>
            <h2 className="mb-3">Roleplay Mode</h2>
            <p className="text-muted-foreground mb-6">
              Video call dengan AI tutor — evaluasi pronunciation & fluency secara real-time.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Pronunciation scoring</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Fluency analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Speech replay & comparison</span>
              </li>
            </ul>
            <Button onClick={() => onNavigate('roleplay')} className="w-full py-6 rounded-xl shadow-md hover:shadow-lg bg-primary">
              Start Roleplay Mode
            </Button>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-md border-2 border-yellow-200 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="mb-1">Daily Challenge</h3>
                <p className="text-muted-foreground">Uji kemampuan bahasa Inggris Anda hari ini! 🎯</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('challenge')}
              className="w-full md:w-auto px-8 py-6 rounded-xl shadow-md hover:shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Challenge
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h2>Evaluasi Pronunciation & Fluency Otomatis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="mb-2">Real-time Analysis</h4>
              <p className="text-muted-foreground">Analisis pronunciation dan fluency secara langsung</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mb-2">Detailed Feedback</h4>
              <p className="text-muted-foreground">Feedback spesifik untuk setiap fonem dan intonasi</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2">Progress Tracking</h4>
              <p className="text-muted-foreground">Pantau perkembangan dari waktu ke waktu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
