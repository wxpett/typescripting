export type LanguageType = 'java' | 'python' | 'sql' | 'typescript' | 'rust';

export interface Snippet {
  id: string;
  language: LanguageType;
  title: string;
  description: string;
  code: string;
}

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalTyped: number;
  elapsedTime: number;
}

export type GameStatus = 'idle' | 'running' | 'finished';

export interface CharState {
  char: string;
  expectedChar: string;
  status: 'correct' | 'incorrect' | 'pending';
}
