export interface Checkpoint {
  checkpointX: number;
  pregunta: string;
  opciones: { texto: string; correcta: boolean }[];
  educativo: string;
}

export type GameState = 'START_SCREEN' | 'PLAYING' | 'QUIZ' | 'GAME_OVER' | 'VICTORY';

export interface GameObject {
  id: string;
  type: 'POTHOLE' | 'CONE' | 'CLOCK_BURDEN' | 'COIN' | 'BOOK' | 'HEART';
  x: number; // relative position from right end of viewport
  y: number; // offset from floor
  width: number;
  height: number;
  collected?: boolean;
  scoreValue?: number;
}
