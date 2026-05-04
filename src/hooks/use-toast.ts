import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';

export function useToast() {
  const success = useCallback((message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
    });
  }, []);

  const error = useCallback((message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
    });
  }, []);

  const info = useCallback((message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
    });
  }, []);

  const warning = useCallback((message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
    });
  }, []);

  const loading = useCallback((message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
    });
  }, []);

  return { success, error, info, warning, loading };
}
