'use client';

import { Button } from '@/components/ui/button';
import { UserCircle, LogOut, User as UserIcon } from 'lucide-react';
import Logo from './logo';
import { useAuth } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Header() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <div className="container flex h-20 max-w-7xl items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="hidden text-sm font-light tracking-wide text-foreground/70 md:block">
            Your identity. Made beautiful.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              <Avatar className="ring-2 ring-lavender/20 ring-offset-2">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-lavender to-sky-blue text-white">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Button 
                asChild 
                variant="ghost"
                className="transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
              >
                <Link href="/login">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button 
                asChild 
                className="relative overflow-hidden bg-gradient-to-r from-lavender via-sky-blue to-light-pink text-white shadow-xl shadow-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 hover:scale-105"
              >
                <Link href="/login">
                  <span className="relative z-10">Create Avatar — Free</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
