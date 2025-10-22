import { Camera, Mail, User as UserIcon, Bell, Moon, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useState } from 'react';

export function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState('Pengguna');
  const [email, setEmail] = useState('user@example.com');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-border">
                <AvatarImage src="https://images.unsplash.com/photo-1644904105846-095e45fca990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzYwMzgxNTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="mb-1">Profil Pengguna</h2>
              <p className="text-muted-foreground">Kelola informasi dan preferensi Anda</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="mb-2 block">Nama Lengkap</Label>
              <div className="flex items-center gap-3 bg-secondary rounded-xl px-6 py-4">
                <UserIcon className="w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="mb-2 block">Email</Label>
              <div className="flex items-center gap-3 bg-secondary rounded-xl px-6 py-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-6">
          <h3 className="mb-6">Pengaturan</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="notifications">Notifikasi</Label>
                  <p className="text-muted-foreground">Terima pemberitahuan pesan baru</p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="darkmode">Mode Gelap</Label>
                  <p className="text-muted-foreground">Aktifkan tema gelap</p>
                </div>
              </div>
              <Switch
                id="darkmode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label>Bahasa</Label>
                  <p className="text-muted-foreground">Bahasa Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 py-6 rounded-xl shadow-md hover:shadow-lg">
            Simpan Perubahan
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-6 rounded-xl shadow-sm hover:shadow-md"
          >
            Batalkan
          </Button>
        </div>
      </div>
    </div>
  );
}
