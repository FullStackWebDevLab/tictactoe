export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = Array<CellValue>;

interface BoardProps {
    state: Board;
    onCellClick(index: number): void;
}
export interface CellProps {
    value: CellValue;
    onClick(index: number): void;
}
export interface IGameState {
    board: Board;
    winner: Player | null;
}
