export type Exist = 0 | 1 | 2;


export interface CellStruct {
    x: number;
    y: number;
    value: string;
    exist: Exist; // can be 0=no exist, 1 exist and is the same position, and 2, exist but not in the same position
}

export type GridStruct = CellStruct[][];
export interface GridLayout {
    evaluate: boolean;
    row: Array<CellStruct>;
}

export type GridLayoutType = Array<GridLayout>;