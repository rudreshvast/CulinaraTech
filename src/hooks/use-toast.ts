import { useCallback } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = useCallback((props: Toast) => {
    // Simple implementation - log to console for now
    // In production, this would integrate with a toast UI library
    const message = `${props.title}${props.description ? ': ' + props.description : ''}`;
    if (props.variant === 'destructive') {
      console.error(message);
    } else {
      console.log(message);
    }
  }, []);

  return { toast };
}
