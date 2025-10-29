import { TrendingUp, Award, Calendar, Target } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function ProgressPage() {
  const storedData = JSON.parse(localStorage.getItem("userProgress") || "null");

  if (!storedData || !storedData.progressData?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-4xl font-semibold mb-4">No Progress Yet</div>
        <p className="text-muted-foreground mb-8">
          Start your first grammar session to see your learning stats here.
        </p>
      </div>
    );
  }

  const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

  const { progressData, skillDistribution, errorFrequency, stats } = storedData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="mb-2">Progress Dashboard</h2>
        <p className="text-muted-foreground mb-6">Track your English learning journey</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: any) => {
            const Icon = { Calendar, Award, TrendingUp, Target }[stat.icon as keyof any];
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <div className="text-3xl">{stat.value}</div>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3 className="mb-6">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pronunciation" stroke="#10b981" strokeWidth={3} name="Pronunciation" />
                <Line type="monotone" dataKey="fluency" stroke="#3b82f6" strokeWidth={3} name="Fluency" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3 className="mb-6">Current Skill Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillDistribution.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Common Errors */}
        <div className="bg-white rounded-3xl p-8 shadow-md">
          <h3 className="mb-6">Most Common Pronunciation Errors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={errorFrequency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="phoneme" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
