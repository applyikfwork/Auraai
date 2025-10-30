'use client';

import { useState } from 'react';
import ControlPanel from '@/components/control-panel';
import PreviewPanel from '@/components/preview-panel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AvatarStudio() {
  const [previewImage, setPreviewImage] = useState(
    PlaceHolderImages.find((img) => img.id === 'avatar-preview-1')?.imageUrl || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratedAvatar = (avatarDataUri: string) => {
    setPreviewImage(avatarDataUri);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lavender/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-light-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        <div className="mb-12 text-center animate-slide-up">
          <h1 className="text-5xl font-light mb-4 gradient-text">
            Create Your Perfect Avatar
          </h1>
          <p className="text-lg text-foreground/60 font-light max-w-2xl mx-auto">
            Transform your identity with AI-powered avatar generation. Choose from stunning styles, mix and match, or create something truly unique.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[450px_1fr]">
          <div className="w-full">
            <ControlPanel
              onGeneratedAvatar={handleGeneratedAvatar}
              setIsGenerating={setIsGenerating}
            />
          </div>
          <div className="relative">
            <PreviewPanel
              previewImage={previewImage}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
