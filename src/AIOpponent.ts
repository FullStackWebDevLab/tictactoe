import type * as Types from "./types";
import API from "./API";

export default class AIOponnent {
    playRandom() {
        const board: Types.Board = API.getState().board;
        const availableMoves: number[] = getAvailableMoves(board);
        const randomMoveIndex: number = Math.floor(Math.random() * availableMoves.length);
        const randomMove: number = availableMoves[randomMoveIndex];
        API.play("X", randomMove);
    }
}

function getAvailableMoves(board: Types.Board): Array<number> {
    const availableMoves: Array<number> = [];

    for (let index: number = 0; index < board.length; index++) {
        if (board[index]) continue;
        availableMoves.push(index);
    }

    return availableMoves;
}
