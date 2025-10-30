import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import Logo from './logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="hidden text-sm font-medium text-muted-foreground md:block">
            Your identity. Made beautiful.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost">
            <UserCircle className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button className="shadow-sm transition-all hover:shadow-md hover:shadow-primary/30">
            Create Avatar — Free
          </Button>
        </div>
      </div>
    </header>
  );
}
