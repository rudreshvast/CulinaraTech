'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
  description = 'Please login to your account to continue with this action.',
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
      <DialogContent className="sm:max-w-2xl w-full p-8 md:p-10">
        <div className="space-y-10 py-6">
          {/* Header with Icon */}
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Lock size={40} className="text-primary" />
            </motion.div>
            <div className="space-y-4">
              <DialogTitle className="text-4xl md:text-5xl font-bold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-5 pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full py-4 md:py-5 bg-primary text-primary-foreground rounded-lg font-semibold text-lg md:text-xl flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-200"
            >
              <LogIn size={24} />
              Login to Your Account
            </motion.button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-background text-sm text-muted-foreground uppercase tracking-widest font-medium">
                  or
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignUp}
              className="w-full py-4 md:py-5 bg-secondary/80 text-secondary-foreground rounded-lg font-semibold text-lg md:text-xl hover:bg-secondary hover:shadow-xl transition-all duration-200"
            >
              Create New Account
            </motion.button>
          </div>

          {/* Footer Link */}
          <div className="text-center pt-6">
            <p className="text-muted-foreground text-base md:text-lg">
              Already have an account?{' '}
              <button
                onClick={handleLogin}
                className="text-primary font-bold hover:underline transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
