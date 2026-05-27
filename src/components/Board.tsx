import type * as Types from "../types";
import Cell from "./Cell";

export default function Board({ state, onCellClick }: Types.BoardProps) {
    return (
        <div className="board">
            {state.map((element, index) => {
                return <Cell value={element} onClick={() => onCellClick(index)} />
            })}
        </div>
    );
}
