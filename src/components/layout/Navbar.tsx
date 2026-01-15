'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, UserCircle, Briefcase, Menu, Sun, Moon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <nav className="glass sticky top-0 z-50 w-full overflow-visible">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-primary/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="font-heading font-black text-xl tracking-tight">Contraktor</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border/40">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                    isActive 
                      ? "bg-card text-primary shadow-sm ring-1 ring-border/50" 
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-primary/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button className="hidden sm:flex p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-2xl transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-2xl transition-colors">
              <UserCircle className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 md:hidden text-muted-foreground hover:text-foreground hover:bg-accent rounded-2xl transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed top-16 left-0 right-0 bottom-0 p-4 bg-card/95 backdrop-blur-md border-b border-border shadow-2xl z-50 md:hidden animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-6 py-4 rounded-2xl text-base font-bold transition-all",
                      isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-border/60">
                <button className="w-full px-6 py-4 bg-muted hover:bg-muted/80 rounded-2xl text-left text-sm font-bold text-muted-foreground flex items-center justify-between transition-all">
                  <span>Sign In</span>
                  <UserCircle className="h-5 w-5" />
                </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
