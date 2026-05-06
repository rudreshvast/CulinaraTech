'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface LoginRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function LoginRequiredModal({
  open,
  onOpenChange,
  title = 'Login Required',
  description = 'Please login to your account in order to proceed',
}: LoginRequiredModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push('/auth/login');
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push('/auth/signup');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl w-full p-6 gap-6" showCloseButton={false}>
        {/* Top Message */}
        <div className="text-center space-y-2">
          <DialogTitle className="text-lg font-bold text-foreground">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Login Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-surface-container/50 border border-border"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn size={24} className="text-primary" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-foreground text-sm">Have an account?</h3>
              <p className="text-xs text-muted-foreground">Sign in to your account</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="w-full py-2 bg-primary text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all duration-200"
            >
              Login
            </motion.button>
          </motion.div>

          {/* Sign Up Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-surface-container/50 border border-border"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <UserPlus size={24} className="text-secondary-600" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-foreground text-sm">New user?</h3>
              <p className="text-xs text-muted-foreground">Create a new account</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignUp}
              className="w-full py-2 bg-secondary text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all duration-200"
            >
              Sign Up
            </motion.button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
