'use client';

import { motion } from 'framer-motion';
import { X, Lock, CreditCard, Smartphone, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle?: string;
  price?: string;
  instructor?: string;
  onProceed?: () => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  courseTitle = 'Course Title',
  price = '$49.99',
  instructor = 'Instructor Name',
  onProceed,
}: PaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95%] p-0 gap-0 bg-gradient-to-b from-background to-muted/80" showCloseButton={false}>
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">Complete Your Enrollment</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded-lg transition"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Side - Course Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Course Details</h3>
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Course Title</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{courseTitle}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Instructor</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{instructor}</p>
                </div>
                <div className="pt-3 border-t border-border flex items-baseline justify-between">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold text-primary">{price}</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Lock size={16} className="text-primary flex-shrink-0" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CreditCard size={16} className="text-primary flex-shrink-0" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Zap size={16} className="text-primary flex-shrink-0" />
                <span>Lifetime access to course</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-4">Payment Method</h3>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 border-2 border-primary rounded-lg cursor-pointer bg-primary/5 transition">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <CreditCard size={18} className="ml-3 mr-2 text-primary" />
                  <span className="text-sm font-medium text-foreground">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-3 border-2 border-border rounded-lg cursor-pointer hover:border-muted-foreground/50 transition">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <Smartphone size={18} className="ml-3 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">UPI / Digital Wallet</span>
                </label>
              </div>

              {/* Card Form */}
              <div className="space-y-3 bg-card border border-border rounded-xl p-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 1488 0343 6467"
                    maxLength={19}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <label className="flex items-center mt-4 text-sm text-foreground">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="ml-2">Save card for future purchases</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenChange(false)}
                className="flex-1 py-2.5 bg-muted text-foreground rounded-lg font-semibold text-sm hover:bg-muted/80 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onProceed}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200"
              >
                Enroll Now
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By enrolling, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
