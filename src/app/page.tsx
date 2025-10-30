import AvatarStudio from '@/components/avatar-studio';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AvatarStudio />
      </main>
    </div>
  );
}
