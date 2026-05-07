"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/lib/hooks/useAuth";
import { loginSchema, type LoginFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function LoginForm() {
  const router = useRouter();
  const { error: errorToast, success: successToast } = useToast();
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        successToast("Success", "You have been logged in successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      },
      onError: (error: any) => {
        let message = "Something went wrong. Please try again.";

        if (error.message === "User not found") {
          message = "User not found. Please check your email or sign up.";
        } else if (error.message === "Password is wrong") {
          message = "Password is wrong. Please try again.";
        } else if (error.response?.status === 401) {
          message = "Invalid email or password";
        }

        errorToast("Error", message);
      },
    });
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      <section className="w-full md:w-1/2 mx-auto flex flex-col bg-surface relative">
        <div className="flex-1 flex items-center justify-center px-lg py-xl">
          <div className="w-full max-w-[440px]">
            <div className="mb-xl text-center md:text-left">
              {/* <div className="flex items-center gap-xs mb-md justify-center md:justify-start">
<span className="text-primary-container text-4xl material-symbols-outlined" data-icon="fastfood" data-weight="fill">fastfood</span>
<span className="font-h2 text-h2 tracking-tighter text-on-surface">FoodForward</span>
</div> */}
              <h2 className="font-h2 text-h2 text-on-surface">Welcome back</h2>
              <p className="text-on-surface-variant mt-xs">
                Access your learning dashboard and industry network.
              </p>
            </div>
            <form className="space-y-lg" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-xs">
                <label className="block font-label-sm text-on-surface-variant ml-xs">
                  Email Address
                </label>
                <div className="relative group">
                  <span
                    className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors"
                    data-icon="mail"
                  >
                    mail
                  </span>
                  <input
                    {...register("email")}
                    className="w-full pl-[48px] pr-md py-md bg-surface-container-low border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                    placeholder="name@company.com"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 ml-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-xs">
                <div className="flex justify-between items-center ml-xs">
                  <label className="block font-label-sm text-on-surface-variant">
                    Password
                  </label>
                 
                </div>
                <div className="relative group">
                  <span
                    className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors"
                    data-icon="lock"
                  >
                    lock
                  </span>
                  <input
                    {...register("password")}
                    className="w-full pl-[48px] pr-md py-md bg-surface-container-low border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                   <a
                    className="text-label-sm text-primary hover:underline float-right mt-1"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                  <button
                    className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 ml-xs">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center gap-sm">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20"
                  id="remember"
                  type="checkbox"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  checked={rememberMe}
                />
                <label
                  className="text-body-md text-on-surface-variant cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Keep me signed in
                </label>
              </div>
              <button
                disabled={isPending}
                className="w-full py-md bg-primary-container text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(100,64,251,0.25)] hover:shadow-[0_8px_24px_rgba(100,64,251,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    Sign In
                    <span
                      className="material-symbols-outlined text-xl"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
            <div className="relative my-xl">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="px-md bg-surface text-on-surface-variant">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <button className="flex items-center justify-center gap-sm py-md border border-outline-variant rounded-xl hover:bg-surface-container transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="font-medium text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-sm py-md border border-outline-variant rounded-xl hover:bg-surface-container transition-all">
                <svg className="w-5 h-5" fill="#0077b5" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
                <span className="font-medium text-on-surface">LinkedIn</span>
              </button>
            </div>
            <p className="mt-xl text-center text-body-md text-on-surface-variant">
              Don't have an account?
              <a
                className="text-primary font-semibold hover:underline ml-1"
                href="#"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
