import Image from 'next/image';
import { Button } from './ui/button';
import { Download, Heart, RefreshCw, Share2, ZoomIn, Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type PreviewPanelProps = {
  previewImage: string;
  isGenerating: boolean;
};

export default function PreviewPanel({ previewImage, isGenerating }: PreviewPanelProps) {
  const galleryImages = PlaceHolderImages.filter((img) => img.id.startsWith('gallery-'));

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
              src={previewImage}
              alt="Avatar preview"
              fill
              className="rounded-lg object-cover"
              data-ai-hint="avatar preview"
              key={previewImage}
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
        <Button variant="outline" className="flex-1">
          <Heart className="mr-2 h-4 w-4" /> Save to Gallery
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  'relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-all hover:scale-105',
                  index === 0 && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                )}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
