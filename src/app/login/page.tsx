'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 7.9 3l6.1-6.1C34.2 2.8 29.5 1 24 1 14.9 1 7.4 6.6 4.1 14.5l7.4 5.7C13.2 14.1 18.2 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.8 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h12.8c-.5 2.9-2.2 5.4-4.7 7.1l7.1 5.5c4.2-3.8 6.6-9.4 6.6-15.8z"></path>
      <path fill="#FBBC05" d="M11.5 28.2c-.5-1.5-.7-3.1-.7-4.7s.2-3.2.7-4.7l-7.4-5.7C2.2 16.9 1 20.3 1 24s1.2 7.1 4.1 10.5l7.4-5.8z"></path>
      <path fill="#34A853" d="M24 47c5.5 0 10.2-1.8 13.6-4.9l-7.1-5.5c-1.8 1.2-4.1 1.9-6.5 1.9-5.8 0-10.8-4.6-12.5-10.7l-7.4 5.7c3.3 7.9 10.8 13.5 19.9 13.5z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  );

  if (loading || user) {
    return null; 
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Aura</CardTitle>
          <CardDescription>Sign in to create and save your avatars.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
