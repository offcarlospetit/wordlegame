import { Exist } from "../../ui-kit/types";

export interface CellStruct {
  x: number;
  y: number;
  value: string;
  exist: Exist; // can be 0=no exist, 1 exist and is the same position, and 2, exist but not in the same position
}

export type Language = 'es' | 'en';

export type GridStruct = CellStruct[][];
export interface GridLayout {
  evaluate: boolean;
  row: Array<CellStruct>;
}

export interface RowResult {
  try: number;
  result: number;
}

export type GridLayoutType = Array<GridLayout>;
export type DailyWord = { word: string; useDate: string; };

export type QwertyType = { letter: string; color: string; textColor: string; };
export type QwertyTypeArray = Array<Array<QwertyType>>;

export interface Game {
  wordOfTheDay?: DailyWord | undefined;
  wordOfTheDayUseDate?: string;
  wordOfTheDayLanguage?: Language;
  retry?: number;
  score?: number;
  time?: number;
  grid?: GridLayoutType;
  actualRow?: number;
  actualColumn?: number;
  evaluatingRow?: boolean;
  isSolved?: boolean;
  attempts?: number;
  totalPoints?: number;
  letters?: Array<CellStruct>;
  qwerty?: QwertyTypeArray;
  dateStart?: string | undefined;
  dateEnd?: string | undefined;
}