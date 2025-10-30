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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="hidden text-sm font-medium text-muted-foreground md:block">
            Your identity. Made beautiful.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              <Avatar>
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="shadow-sm transition-all hover:shadow-md hover:shadow-primary/30">
                <Link href="/login">Create Avatar — Free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
