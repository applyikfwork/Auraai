'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error during Google sign-in:', error);
      toast({
        variant: 'destructive',
        title: 'Sign-in Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>, type: 'signin' | 'signup') => {
    event.preventDefault();
    setIsLoading(true);
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      if (type === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error(`Error during email ${type}:`, error);
      toast({
        variant: 'destructive',
        title: `${type === 'signin' ? 'Sign-in' : 'Sign-up'} Failed`,
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.2 0 5.9 1.1 7.9 3l6.1-6.1C34.2 2.8 29.5 1 24 1 14.9 1 7.4 6.6 4.1 14.5l7.4 5.7C13.2 14.1 18.2 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.8 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h12.8c-.5 2.9-2.2 5.4-4.7 7.1l7.1 5.5c4.2-3.8 6.6-9.4 6.6-15.8z"
      ></path>
      <path
        fill="#FBBC05"
        d="M11.5 28.2c-.5-1.5-.7-3.1-.7-4.7s.2-3.2.7-4.7l-7.4-5.7C2.2 16.9 1 20.3 1 24s1.2 7.1 4.1 10.5l7.4-5.8z"
      ></path>
      <path
        fill="#34A853"
        d="M24 47c5.5 0 10.2-1.8 13.6-4.9l-7.1-5.5c-1.8 1.2-4.1 1.9-6.5 1.9-5.8 0-10.8-4.6-12.5-10.7l-7.4 5.7c3.3 7.9 10.8 13.5 19.9 13.5z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  );

  if (loading || user) {
    return null;
  }

  const AuthForm = ({ type }: { type: 'signin' | 'signup' }) => (
    <form onSubmit={(e) => handleEmailAuth(e, type)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`email-${type}`}>Email</Label>
        <Input id={`email-${type}`} name="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`password-${type}`}>Password</Label>
        <Input id={`password-${type}`} name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {type === 'signin' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Aura</CardTitle>
          <CardDescription>Sign in or create an account to save your avatars.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-4">
              <AuthForm type="signin" />
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <AuthForm type="signup" />
            </TabsContent>
          </Tabs>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button className="w-full" variant="outline" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
