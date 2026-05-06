'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useLogout } from '@/lib/hooks/useAuth';
import Navbar from '@/components/ui/navbar';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const menuItems = [
    {
      icon: Lock,
      label: 'Change Password',
      description: 'Update your password',
      color: 'text-orange-500',
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification preferences',
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      description: 'Control your privacy settings',
      color: 'text-green-500',
    },
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Manage your account',
      color: 'text-purple-500',
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-28 md:pb-0">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-tertiary-500 px-4 py-12 md:py-20">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/80">Manage your account and settings</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground truncate">
                    {user?.name || 'User'}
                  </h2>
                  <p className="text-sm text-muted-foreground truncate">{user?.email || 'email@example.com'}</p>
                  <div className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    Premium Member
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="w-full md:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-border space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground px-2">Settings & Security</h3>

            <div className="grid grid-cols-1 gap-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    onClick={() => console.log(`Clicked on ${item.label}`)}
                    className="w-full bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                          <Icon size={20} />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-semibold text-foreground text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 pt-8 border-t border-border"
          >
            <h3 className="text-lg font-bold text-destructive px-2">Danger Zone</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full bg-destructive/10 border-2 border-destructive/30 rounded-xl p-4 hover:bg-destructive/20 hover:border-destructive transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-2">
                  <LogOut size={20} className="text-destructive" />
                  <span className="font-semibold text-destructive text-sm">Logout</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-destructive/10 border-2 border-destructive/30 rounded-xl p-4 hover:bg-destructive/20 hover:border-destructive transition-all duration-200"
              >
                <span className="font-semibold text-destructive text-sm">Delete Account</span>
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground px-2 text-center">
              These actions cannot be undone. Please be careful.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
          >
            {[
              { label: 'Courses', value: '5' },
              { label: 'Internships', value: '2' },
              { label: 'Certificates', value: '3' },
              { label: 'Learning Hours', value: '48h' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
