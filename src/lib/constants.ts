import type { AvatarStyle, CustomizationAccordion, Preset } from '@/lib/types';
import { Bot, Clapperboard, Code, Gamepad2, ImageIcon, LandPlot, Palette, Sparkles, User, Wand2 } from 'lucide-react';

export const AVATAR_STYLES: AvatarStyle[] = [
  { id: 'photoreal', name: 'Photoreal', icon: User },
  { id: 'anime', name: 'Anime', icon: Sparkles },
  { id: 'cartoon', name: 'Cartoon', icon: Clapperboard },
  { id: 'vector', name: 'Vector', icon: Palette },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: Bot },
  { id: 'fantasy', name: 'Fantasy', icon: Wand2 },
];

export const PRESETS: Preset[] = [
    { id: 'social', name: 'Social Profile', icon: User, hint: 'Perfect for LinkedIn, Twitter, Facebook' },
    { id: 'streaming', name: 'Streaming', icon: Gamepad2, hint: 'Eye-catching for Twitch, YouTube Gaming' },
    { id: 'corporate', name: 'Corporate', icon: LandPlot, hint: 'Professional look for company websites' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, hint: 'Expressive characters for gaming forums' },
    { id: 'nft', name: 'NFT', icon: Code, hint: 'Unique and collectible digital art' },
];

export const CUSTOMIZATION_ACCORDION: CustomizationAccordion[] = [
    {
        id: 'face',
        title: 'Face',
        controls: [
            { id: 'age', label: 'Age', type: 'slider', min: 18, max: 80, defaultValue: 30 },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Non-binary'] },
            { id: 'skin_tone', label: 'Skin Tone', type: 'color' },
            { id: 'eye_color', label: 'Eye Color', type: 'color' },
            { id: 'expression', label: 'Expression', type: 'select', options: ['Neutral', 'Smiling', 'Serious', 'Surprised'] },
        ]
    },
    {
        id: 'hair',
        title: 'Hair',
        controls: [
            { id: 'hair_style', label: 'Style', type: 'select', options: ['Short', 'Long', 'Curly', 'Straight', 'Bald'] },
            { id: 'hair_color', label: 'Color', type: 'color' },
            { id: 'hair_length', label: 'Length', type: 'slider', min: 0, max: 100, defaultValue: 50 },
        ]
    },
    {
        id: 'outfit',
        title: 'Outfit',
        controls: [
            { id: 'outfit_style', label: 'Style', type: 'select', options: ['Casual', 'Formal', 'Armor', 'Hoodie', 'Futuristic'] },
        ]
    },
    {
        id: 'background',
        title: 'Background',
        controls: [
            { id: 'background_type', label: 'Type', type: 'select', options: ['Color', 'Gradient', 'Bokeh', 'Abstract', 'City', 'Forest'] },
            { id: 'background_color', label: 'Color', type: 'color' },
        ]
    },
    {
        id: 'accessories',
        title: 'Accessories',
        controls: [
            { id: 'glasses', label: 'Glasses', type: 'select', options: ['None', 'Reading', 'Sunglasses'] },
            { id: 'hat', label: 'Hat', type: 'select', options: ['None', 'Beanie', 'Cap', 'Fedora'] },
            { id: 'jewelry', label: 'Jewelry', type: 'select', options: ['None', 'Necklace', 'Earrings'] },
        ]
    }
]

export const ART_STYLES = [
  "Photoreal",
  "Anime",
  "Cartoon",
  "Vector",
  "Cyberpunk",
  "Fantasy",
  "Minimalist",
  "3D Render",
  "Pixel Art",
  "Watercolor",
  "Oil Painting",
  "Impressionist",
  "Pop Art"
];
