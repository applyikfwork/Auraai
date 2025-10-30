'use client';

import { suggestAvatarStyles, SuggestAvatarStylesOutput } from '@/ai/flows/logo-driven-personalization';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function LogoPersonalization() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [brandName, setBrandName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestAvatarStylesOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const toDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!logoFile || !brandName) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a brand name and a logo file.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const logoDataUri = await toDataUri(logoFile);
      const response = await suggestAvatarStyles({ brandName, logoDataUri });
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo-Driven Personalization</CardTitle>
        <CardDescription>
          Upload your brand's logo to get AI-powered avatar style and color suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input
              id="brandName"
              placeholder="e.g., Aura"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoUpload">Logo File</Label>
            <Input id="logoUpload" type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Generate Suggestions
              </>
            )}
          </Button>
        </form>

        {isLoading && (
            <div className='mt-6 space-y-4'>
                <Skeleton className='h-8 w-1/3' />
                <div className='flex gap-2'>
                    <Skeleton className='h-10 w-10 rounded-full' />
                    <Skeleton className='h-10 w-10 rounded-full' />
                    <Skeleton className='h-10 w-10 rounded-full' />
                </div>
                <Skeleton className='h-8 w-1/4' />
                <div className='flex flex-col gap-2'>
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-6 w-2/3' />
                </div>
            </div>
        )}

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div>
              <h3 className="font-semibold">Suggested Palette</h3>
              <div className="mt-2 flex gap-2">
                {result.suggestedPalette.map((color) => (
                  <div
                    key={color}
                    className="h-10 w-10 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Suggested Styles</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.suggestedStyles.map((style) => (
                  <div key={style} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                    {style}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Reasoning</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.reasoning}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
