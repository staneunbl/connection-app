import { Category } from '@/types/categories.types';

export const CATEGORIES: Category[] = [
  {
    id: 'deep-talk',
    emoji: '🌙',
    name: 'Deep Talk',
    description: 'Meaningful questions that spark real conversations.',
    color: '#251845',
    textColor: '#E6E0FF',
    mode: 'deep',
    questionCount: 40,
  },
  {
    id: 'chaos-mode',
    emoji: '🍻',
    name: 'Chaos Mode',
    description: 'Wild, unhinged questions for chaotic groups.',
    color: '#1A1A1A',
    textColor: '#FFD700',
    mode: 'chaos',
    questionCount: 40,
  },
  {
    id: 'first-dates',
    emoji: '💛',
    name: 'First Dates',
    description: 'Break the ice and avoid awkward silence.',
    color: '#FFE7A3',      // softer warm cream-gold background
    textColor: '#3B2A1A',  // rich warm brown for readability
    mode: 'deep',
    questionCount: 40,
  },
  {
    id: 'friends-forever',
    emoji: '✨',
    name: 'Old Friends',
    description: 'For people who already know too much.',
    color: '#3A2F1F',
    textColor: '#F5E6C8',
    mode: 'chaos',
    questionCount: 40,
  },
];