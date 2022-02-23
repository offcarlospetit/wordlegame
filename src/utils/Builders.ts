import { GridLayout, GridLayoutType } from "../types";

export const gridBuilder = (size: number): GridLayoutType => {
    return [...Array(size)].map((_, x: number): GridLayout => {
        return {
            evaluate: false,
            row: [...Array(5)].map((_, y: number) => {
                return { x, y, value: '', exist: 0 };
            }),
        };
    });
};