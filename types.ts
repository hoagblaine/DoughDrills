
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  importance: string;
}

export interface Step {
  id: number;
  text: string;
  image?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'Bread' | 'Cakes' | 'Cookies' | 'Pastries' | 'Pies';
  difficulty: Difficulty;
  ingredients: Ingredient[];
  steps: Step[];
  bakeTemp?: string;
  bakeTime?: string;
  description: string;
  isUserCreated?: boolean;
}

export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'free-response';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  hint?: string;
  explanation: string;
}

export interface SRSItem {
  question: QuizQuestion;
  recipeId: string;
  recipeName: string;
  intervalIndex: number; // 0, 1, 2, 3... corresponding to days
  nextReviewDate: string; // ISO string
}

export interface UserStats {
  points: number;
  streak: number;
  badges: string[];
  lastCompletedRecipe?: string;
  preferredDifficulty: Difficulty;
  srsItems: SRSItem[];
  userRecipes: Recipe[];
  lastActivityDate?: string; // ISO string
  bestChallengeScore?: number;
}

export interface QuizResult {
  question: QuizQuestion;
  isCorrect: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  recipes: string[]; // recipe IDs
  timeLimit: number; // seconds
  bonusPoints: number;
  category?: string;
}
