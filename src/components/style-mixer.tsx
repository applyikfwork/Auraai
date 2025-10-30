'use client';

import { styleMixerTool } from '@/ai/flows/style-mixer-tool';
import { ART_STYLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

const formSchema = z.object({
  styleA: z.string().min(1, 'Please select the first style.'),
  styleB: z.string().min(1, 'Please select the second style.'),
  weight: z.number().min(0).max(100),
});

type StyleMixerFormValues = z.infer<typeof formSchema>;

type StyleMixerProps = {
  onGeneratedAvatar: (avatarDataUri: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
};

export default function StyleMixer({ onGeneratedAvatar, setIsGenerating }: StyleMixerProps) {
  const { toast } = useToast();
  const [sliderValue, setSliderValue] = useState(50);

  const form = useForm<StyleMixerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      styleA: 'Photoreal',
      styleB: 'Anime',
      weight: 50,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: StyleMixerFormValues) {
    setIsGenerating(true);
    try {
      const result = await styleMixerTool({
        styleA: values.styleA,
        styleB: values.styleB,
        weight: values.weight,
      });
      if (result.avatarDataUri) {
        onGeneratedAvatar(result.avatarDataUri);
        toast({
            title: 'Avatar Generated!',
            description: 'Your style mix was successful.',
        });
      } else {
        throw new Error('No avatar data received.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the mixed style avatar.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Mixer</CardTitle>
        <CardDescription>
          Blend two art styles to create a unique hybrid avatar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="styleA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style A</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ART_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="styleB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style B</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ART_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Blend Weight ({100 - sliderValue}% A, {sliderValue}% B)
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        setSliderValue(value[0]);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mixing...
                </>
              ) : (
                <>
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Create Mix
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
