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
    <div className="sticky top-24 flex h-full flex-col gap-6">
      <Card className="flex-1">
        <CardContent className="relative aspect-square w-full p-4">
          {isGenerating ? (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your masterpiece...</p>
              </div>
            </div>
          ) : (
            <Image
              src={selectedGalleryImage || previewImage}
              alt="Avatar preview"
              fill
              className="rounded-lg object-cover"
              data-ai-hint="avatar preview"
              key={selectedGalleryImage || previewImage}
            />
          )}

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <Button variant="secondary" size="icon" className="h-11 w-11 rounded-full shadow-lg">
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="h-11 w-11 rounded-full shadow-lg">
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex-1" onClick={handleSaveToGallery} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Heart className="mr-2 h-4 w-4" />
          )}
          Save to Gallery
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button className="flex-1">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <div className="text-center text-sm text-muted-foreground">
              <p>
                <Link href="/login" className="text-primary underline">
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
                    'relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-all hover:scale-105',
                    (selectedGalleryImage || previewImage) === image.imageUrl && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
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
                <p className="col-span-full text-center text-sm text-muted-foreground">Your saved avatars will appear here.</p>
               )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
