// config/apps.ts
import { FaceFrownIcon, FaceSmileIcon, HomeModernIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import React from 'react';

export type AppTag = 'Utility' | 'Game' | 'Education';

export type ColorPalette = 'teal' | 'blue' | 'yellow' | 'purple';

// native -> launch from app folder vs plugin -> launch from iFrame sandbox
export type LaunchType = 'native' | 'plugin'; 

export interface DashboardApp {
  id: string;
  title: string;
  description: string;
  launchType: LaunchType;
  tags: AppTag[]; 
  palette: ColorPalette; // 🎯 The only style-token metadata the data layer provides
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

export const DASHBOARD_REGISTRY: DashboardApp[] = [
  { 
    id: 'shopping-list', 
    title: 'Shopping List', 
    description: 'Keep track of stuff we need in one place.',
    launchType: 'native',
    tags: ['Utility'], 
    palette: 'teal',
    Icon: HomeModernIcon
  },
  { 
    id: 'chore-tracker', 
    title: 'Chore Matrix', 
    description: 'Make sure stuff gets done.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  },
  { 
    id: 'space-shooter', 
    title: 'Space Shooter', 
    description: 'Blast asteroids and break your high score.',
    launchType: 'plugin',
    tags: ['Game'], 
    palette: 'yellow',
    Icon: FaceSmileIcon
  },
  { 
    id: 'capsule', 
    title: 'Capsule', 
    description: 'The world in 60 seconds.',
    launchType: 'plugin',
    tags: ['Education', 'Game'],
    palette: 'purple',
    Icon: AcademicCapIcon
  },
  { 
    id: 'math-blaster', 
    title: 'Math Blaster', 
    description: 'Learning can be fun! Right?',
    launchType: 'plugin',
    tags: ['Education', 'Game'],
    palette: 'purple',
    Icon: AcademicCapIcon
  },
  { 
    id: 'taxes', 
    title: 'Taxes', 
    description: 'Keep track of your financial obligations.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  },
  { 
    id: 'more-taxes', 
    title: 'Taxes', 
    description: 'Keep track of your financial obligations.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  },
  { 
    id: 'even-more-taxes', 
    title: 'Taxes', 
    description: 'Keep track of your financial obligations.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  },
  { 
    id: 'some-more-taxes', 
    title: 'Taxes', 
    description: 'Keep track of your financial obligations.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  },
  { 
    id: 'yet-more-taxes', 
    title: 'Taxes', 
    description: 'Keep track of your financial obligations.',
    launchType: 'plugin',
    tags: ['Utility'],
    palette: 'blue',
    Icon: FaceFrownIcon
  }
];
