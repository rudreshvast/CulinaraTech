'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Menu, Search, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useCategories, useCourse } from '@/lib/hooks/useCourses';
import { useLogout } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  const { data: categoriesResponse } = useCategories();
  const { mutate: logout } = useLogout();

  const categories = categoriesResponse?.data?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/?categoryId=${categoryId}`);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            CulinaraTech
          </Link>

          {/* Desktop Search + Categories */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-6">
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-md flex-1"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth Actions / User Menu */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost">
                  <Link href="/auth/signup?role=INSTRUCTOR">
                    Teach on CulinaraTech
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                        {user ? getInitials(user.name) : '?'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">My Learning</Link>
                  </DropdownMenuItem>
                  {user?.roles.includes('INSTRUCTOR') && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/instructor">Instructor Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/instructor/courses">My Courses</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="space-y-6 py-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search courses"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          handleCategoryClick(category.id);
                          setIsSheetOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  {!isAuthenticated ? (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Link href="/auth/login">Log in</Link>
                      </Button>
                      <Button
                        className="w-full"
                        asChild
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Link href="/auth/signup">Sign up</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        asChild
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Link href="/auth/signup?role=INSTRUCTOR">
                          Teach on CulinaraTech
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Link href="/dashboard">My Learning</Link>
                      </Button>
                      {user?.roles.includes('INSTRUCTOR') && (
                        <>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <Link href="/instructor">Instructor Dashboard</Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <Link href="/instructor/courses">My Courses</Link>
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Link href="/profile">Profile Settings</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive"
                        onClick={() => {
                          handleLogout();
                          setIsSheetOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
