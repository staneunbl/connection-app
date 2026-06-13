export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  mode: CategoryMode;
  color: string;
  textColor: string;
  questionCount: number;
}

export type CategoryMode = 'deep' | 'chaos';

export interface CardQuestion {
  id: string;
  categoryId: string;
  text: string;
  mode: CategoryMode;
}
 