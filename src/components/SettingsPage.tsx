import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Target,
  Settings as SettingsIcon,
} from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";

export function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    learningGoal: "general",
    level: "b1",
    dailyGoal: "30",
    accent: "american",
    voiceSpeed: "normal",
    reminder: true,
    achievement: true,
    weeklyReport: false,
    tips: true,
    theme: "light",
    reduceAnimations: false,
    language: "id",
  });

  // 🧠 Load data dari localStorage pas pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (err) {
        console.error("Failed to load saved settings:", err);
      }
    }
  }, []);

  // 🔧 Update state form
  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 💾 Simpan ke localStorage dan trigger sinkronisasi
  const handleSave = async () => {
    try {
      localStorage.setItem("userSettings", JSON.stringify(formData));

      // 🔄 Trigger event biar App.tsx dapet update tanpa reload
      window.dispatchEvent(new Event("storage"));

      toast.success("✅ Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save settings");
    }
  };

  // 🔁 Reset form ke default
  const handleReset = () => {
    localStorage.removeItem("userSettings");
    window.dispatchEvent(new Event("storage"));
    toast.success("Settings reset to default!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 p-6 pb-24 md:pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Customize your learning experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card className="p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Profile</h3>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{formData.name}</h4>
                <p className="text-muted-foreground text-sm">
                  {formData.email}
                </p>
              </div>
              <Button variant="outline" className="rounded-xl">
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Display Name</Label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label className="mb-2 block">Email</Label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Learning Preferences</h3>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Learning Goal</Label>
                <Select
                  value={formData.learningGoal}
                  onValueChange={(v: any) => handleChange("learningGoal", v)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General English</SelectItem>
                    <SelectItem value="toefl">TOEFL Preparation</SelectItem>
                    <SelectItem value="ielts">IELTS Preparation</SelectItem>
                    <SelectItem value="business">Business English</SelectItem>
                    <SelectItem value="travel">Travel English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Current Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(v: any) => handleChange("level", v)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a1">A1 - Beginner</SelectItem>
                    <SelectItem value="a2">A2 - Elementary</SelectItem>
                    <SelectItem value="b1">B1 - Intermediate</SelectItem>
                    <SelectItem value="b2">B2 - Upper Intermediate</SelectItem>
                    <SelectItem value="c1">C1 - Advanced</SelectItem>
                    <SelectItem value="c2">C2 - Proficient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Daily Goal (minutes)</Label>
                <Select
                  value={formData.dailyGoal}
                  onValueChange={(v: any) => handleChange("dailyGoal", v)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "reminder",
                  label: "Daily Reminder",
                  desc: "Get reminded to practice daily",
                },
                {
                  key: "achievement",
                  label: "Achievement Notifications",
                  desc: "Celebrate your milestones",
                },
                {
                  key: "weeklyReport",
                  label: "Weekly Progress Report",
                  desc: "Receive weekly learning summary",
                },
                {
                  key: "tips",
                  label: "Tips & Suggestions",
                  desc: "Get personalized learning tips",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                  <Switch
                    checked={
                      formData[item.key as keyof typeof formData] as boolean
                    }
                    onCheckedChange={(v: any) => handleChange(item.key, v)}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Save & Reset */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 py-6 rounded-xl shadow-md hover:shadow-lg"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="px-6 py-6 rounded-xl"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
