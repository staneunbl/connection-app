import { Category } from '@/types/categories.types';

export const CATEGORIES: Category[] = [
  {
    id: 'deep-talk',
    emoji: '🌙',
    name: 'Deep Talk',
    description: 'Meaningful questions that spark real conversations.',
    color: '#251845',
    textColor: '#D4CFEE',
    mode: 'chaos',
    questionCount: 40,
  },
  {
    id: 'chaos-mode',
    emoji: '🍻',
    name: 'Chaos Mode',
    description: 'Wild, unhinged questions for chaotic groups.',
    color: '#1A1A1A',
    textColor: '#FFE033',
    mode: 'chaos',
    questionCount: 40,
  },
//   {
//     id: 'first-dates',
//     name: 'First Dates',
//     emoji: '💛',
//     description: 'Break the ice the right way',
//     mode: 'deep',
//     textColor: '#D4CFEE',
//     color: '#B89A00',
//     questionCount: 40,
//   },
//   {
//     id: 'friends-forever',
//     name: 'Old Friends',
//     emoji: '✨',
//     description: 'For people who already know too much',
//     mode: 'chaos',
//     textColor: '#D4CFEE',
//     color: '#4A3F00',
//     questionCount: 40,
//   },
];