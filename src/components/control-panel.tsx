'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AVATAR_STYLES, CUSTOMIZATION_ACCORDION, PRESETS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import LogoPersonalization from './logo-personalization';
import StyleMixer from './style-mixer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ControlPanelProps = {
  onGeneratedAvatar: (avatarDataUri: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
};

export default function ControlPanel({ onGeneratedAvatar, setIsGenerating }: ControlPanelProps) {
  const [activeStyle, setActiveStyle] = useState('photoreal');

  return (
    <div className="flex h-full flex-col gap-6">
      <Tabs defaultValue="styles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="mixer">Mixer</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
        </TabsList>

        <TabsContent value="styles" className="mt-6">
          <div className="grid grid-cols-3 gap-3">
            {AVATAR_STYLES.map((style) => (
              <TooltipProvider key={style.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveStyle(style.id)}
                      className={cn(
                        'flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm font-medium transition-all hover:bg-secondary',
                        activeStyle === style.id
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                          : 'border-border'
                      )}
                    >
                      <style.icon className="h-6 w-6" />
                      <span>{style.name}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{style.name} Style</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="presets" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRESETS.map((preset) => {
              const presetImage = PlaceHolderImages.find(p => p.id === `preset-${preset.id}`)
              return (
              <Card key={preset.id} className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  {presetImage && <Image src={presetImage.imageUrl} alt={preset.name} width={60} height={60} className="rounded-md" data-ai-hint={presetImage.imageHint} />}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <preset.icon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold">{preset.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{preset.hint}</p>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>
        </TabsContent>

        <TabsContent value="mixer" className="mt-6">
          <StyleMixer onGeneratedAvatar={onGeneratedAvatar} setIsGenerating={setIsGenerating} />
        </TabsContent>

        <TabsContent value="brand" className="mt-6">
          <LogoPersonalization />
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <Accordion type="multiple" defaultValue={['face']} className="w-full">
            {CUSTOMIZATION_ACCORDION.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-base font-semibold">{category.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-6 pt-4">
                    {category.controls.map((control) => (
                      <div key={control.id} className="grid gap-3">
                        <Label htmlFor={control.id} className="font-medium">
                          {control.label}
                        </Label>
                        {control.type === 'slider' && (
                          <div className="flex items-center gap-4">
                            <Slider
                              id={control.id}
                              min={control.min}
                              max={control.max}
                              defaultValue={[control.defaultValue]}
                              step={1}
                            />
                            <span className="text-sm font-medium text-muted-foreground w-12 text-center">
                              {control.defaultValue}
                            </span>
                          </div>
                        )}
                        {control.type === 'select' && (
                          <Select>
                            <SelectTrigger id={control.id}>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {control.options.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {control.type === 'color' && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: '#FF0000' }}></div>
                                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: '#00FF00' }}></div>
                                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: '#0000FF' }}></div>
                                <Button variant="outline" size="sm">+</Button>
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="mt-auto space-y-4 pt-4">
        <Button size="lg" className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Avatar
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Free generation with watermark. Upgrade to Pro for high-res and commercial use.
        </p>
      </div>
    </div>
  );
}
