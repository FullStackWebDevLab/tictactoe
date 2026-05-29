export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = Array<CellValue>;

export interface BoardProps {
    state: Board;
    onCellClick(index: number): void;
}
export interface CellProps {
    value: CellValue;
    onClick(index: number): void;
}
export interface IGameState {
    board: Board;
    won: boolean;
    winner: Player | null;
    draw: boolean;
}
