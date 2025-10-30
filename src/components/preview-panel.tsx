'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Download, Heart, RefreshCw, Share2, ZoomIn, Loader2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

type PreviewPanelProps = {
  previewImage: string;
  isGenerating: boolean;
};

type GalleryImage = {
  id: string;
  imageUrl: string;
};

export default function PreviewPanel({ previewImage, isGenerating }: PreviewPanelProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'users', user.uid, 'avatars'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
        }));
        setGalleryImages(images);
      });
      return () => unsubscribe();
    } else {
      setGalleryImages([]);
    }
  }, [user]);

  const handleSaveToGallery = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You need to be signed in to save to your gallery.',
      });
      return;
    }
    if (!previewImage || !previewImage.startsWith('data:image')) {
        toast({
            variant: 'destructive',
            title: 'Nothing to save',
            description: 'Please generate an avatar first before saving.',
        });
        return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'avatars'), {
        imageUrl: previewImage,
        createdAt: new Date(),
      });
      toast({
        title: 'Saved to gallery!',
        description: 'Your new avatar is now in your personal gallery.',
      });
    } catch (error) {
      console.error('Error saving to gallery:', error);
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: 'There was a problem saving your avatar. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="sticky top-24 flex h-full flex-col gap-6 animate-fade-in">
      <Card className="flex-1 glass-card border-2 border-white/40 overflow-hidden">
        <CardContent className="relative aspect-square w-full p-6">
          {isGenerating ? (
            <div className="flex h-full w-full items-center justify-center rounded-2xl neuro-inset">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-16 w-16 animate-spin text-lavender" />
                <p className="text-foreground/70 font-light">Generating your masterpiece...</p>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 float">
              <Image
                src={selectedGalleryImage || previewImage}
                alt="Avatar preview"
                fill
                className="rounded-2xl object-cover"
                data-ai-hint="avatar preview"
                key={selectedGalleryImage || previewImage}
              />
            </div>
          )}

          <div className="absolute bottom-8 right-8 flex items-center gap-3">
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full shadow-xl backdrop-blur-xl">
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full shadow-xl backdrop-blur-xl">
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 animate-slide-up">
        <Button variant="outline" className="flex-1 font-light" onClick={handleSaveToGallery} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Heart className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
        <Button variant="outline" className="flex-1 font-light">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button className="flex-1 font-medium">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>

      <Card className="glass-card border-2 border-white/40 animate-slide-up">
        <CardHeader>
          <CardTitle className="font-light text-xl gradient-text">My Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <div className="text-center text-sm text-foreground/60 font-light">
              <p>
                <Link href="/login" className="gradient-text font-medium underline">
                  Sign in
                </Link>{' '}
                to view your personal gallery.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedGalleryImage(image.imageUrl)}
                  className={cn(
                    'relative aspect-square cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30',
                    (selectedGalleryImage || previewImage) === image.imageUrl && 'ring-2 ring-lavender ring-offset-2 ring-offset-background shadow-xl shadow-purple-500/40'
                  )}
                >
                  <Image
                    src={image.imageUrl}
                    alt={'User avatar'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
               {galleryImages.length === 0 && (
                <p className="col-span-full text-center text-sm text-foreground/50 font-light">Your saved avatars will appear here.</p>
               )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
