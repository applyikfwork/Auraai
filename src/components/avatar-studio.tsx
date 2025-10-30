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
    <div className="container mx-auto max-w-7xl px-4 py-8">
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
  );
}
