import type { LucideIcon } from 'lucide-react';

export interface AvatarStyle {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Preset {
    id: string;
    name: string;
    icon: LucideIcon;
    hint: string;
}

type ControlBase = {
    id: string;
    label: string;
}

type SliderControl = ControlBase & {
    type: 'slider';
    min: number;
    max: number;
    defaultValue: number;
}

type SelectControl = ControlBase & {
    type: 'select';
    options: string[];
}

type ColorControl = ControlBase & {
    type: 'color';
}

export type CustomizationControl = SliderControl | SelectControl | ColorControl;

export interface CustomizationAccordion {
    id: string;
    title: string;
    controls: CustomizationControl[];
}
