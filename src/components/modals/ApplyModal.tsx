'use client';

import { motion } from 'framer-motion';
import { X, Upload, FileText, LinkIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  company?: string;
  position?: string;
  onSubmit?: (data: ApplyFormData) => void;
}

export interface ApplyFormData {
  resumeUrl: string;
  linkedinUrl?: string;
  message?: string;
}

export function ApplyModal({
  open,
  onOpenChange,
  title = 'Internship Title',
  company = 'Company Name',
  position = 'Position',
  onSubmit,
}: ApplyModalProps) {
  const [resumeTab, setResumeTab] = useState<'upload' | 'linkedin'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const resumeUrl = resumeTab === 'upload'
      ? file?.name || 'resume.pdf'
      : linkedinUrl;

    if (onSubmit) {
      onSubmit({
        resumeUrl,
        linkedinUrl: resumeTab === 'linkedin' ? linkedinUrl : undefined,
        message,
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      // Reset form
      setFile(null);
      setLinkedinUrl('');
      setMessage('');
      setResumeTab('upload');
    }, 1000);
  };

  const canSubmit = resumeTab === 'upload' ? file : linkedinUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95%] p-0 gap-0" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">Apply Now</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded-lg transition"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Side - Position Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-3">Position Details</h3>
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Position</p>
                  <p className="text-sm font-semibold text-foreground">{position}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Company</p>
                  <p className="text-sm font-semibold text-foreground">{company}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Title</p>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-2">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-2">
                <FileText size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Resume Required</p>
                  <p className="text-xs text-muted-foreground">Upload PDF or link LinkedIn profile</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-4">Your Resume</h3>

              {/* Tab Buttons */}
              <div className="flex gap-2 mb-4">
                <motion.button
                  onClick={() => setResumeTab('upload')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition ${
                    resumeTab === 'upload'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload size={14} className="inline mr-2" />
                  Upload Resume
                </motion.button>
                <motion.button
                  onClick={() => setResumeTab('linkedin')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition ${
                    resumeTab === 'linkedin'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <LinkIcon size={14} className="inline mr-2" />
                  LinkedIn
                </motion.button>
              </div>

              {/* Tab Content */}
              {resumeTab === 'upload' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/30 text-center cursor-pointer hover:border-primary/50 transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer block">
                      <Upload size={32} className="mx-auto text-primary mb-2" />
                      <p className="text-sm font-semibold text-foreground">
                        {file ? file.name : 'Click to upload resume'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-2">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">We'll fetch your latest profile</p>
                  </div>
                </div>
              )}

              {/* Message Field */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-2">Cover Message (Optional)</label>
                  <textarea
                    placeholder="Tell us why you're interested in this opportunity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
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
                  whileHover={canSubmit ? { scale: 1.02 } : {}}
                  whileTap={canSubmit ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    canSubmit && !isSubmitting
                      ? 'bg-primary text-white hover:shadow-lg cursor-pointer'
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </motion.button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By applying, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a>
              </p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
