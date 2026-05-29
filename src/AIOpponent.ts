import type * as Types from "./types";
import API from "./API";

export default class AIOpponent {
    play() {
        this.playMinimax();
    }

    playRandom() {
        const board: Types.Board = API.getState().board;
        const availableMoves: number[] = this.getAvailableMoves(board);
        const randomMoveIndex: number = Math.floor(Math.random() * availableMoves.length);
        const randomMove: number = availableMoves[randomMoveIndex];
        API.playAndCheckWinAndDraw("X", randomMove);
    }

    playMinimax() {
        const board: Types.Board = API.getState().board;
        const bestMove: number | null = this.getBestMove(board);
        API.playAndCheckWinAndDraw("X", bestMove);
    }

    getBestMove(board: Types.Board): number {
        const availableMoves = this.getAvailableMoves(board);

        let bestScore = -Infinity;
        let bestMove: number | null = null;

        for (const move of availableMoves) {
            const simulatedBoard = this.simulateMove(board, move, "X");
            const score = this.minimax(simulatedBoard, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    minimax(board: Types.Board, isMaximizer: boolean): number {
        const winner = this.checkWinner(board);
        if (winner === "X") return 10;
        if (winner === "O") return -10;
        if (this.isBoardFull(board)) return 0;

        if (isMaximizer) {
            let bestScore = -Infinity;
            
            for (let i = 0; i < board.length; i++) {
                if (board[i] !== null) continue;

                const simulatedBoard = this.simulateMove(board, i, "X");
                const score = this.minimax(simulatedBoard, false);
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } 
        
        else {
            let bestScore = Infinity;
            
            for (let i = 0; i < board.length; i++) {
                if (board[i] !== null) continue;

                const simulatedBoard = this.simulateMove(board, i, "O");
                const score = this.minimax(simulatedBoard, true);
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    }

    simulateMove(board: Types.Board, index: number, player: Types.Player): Types.Board {
        const newBoard = [...board] as Types.Board;
        newBoard[index] = player;
        return newBoard;
    }

    checkWinner(board: Types.Board): Types.Player | null {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    isBoardFull(board: Types.Board): boolean {
        return board.every(cell => cell !== null);
    }

    getAvailableMoves(board: Types.Board): Array<number> {
        const availableMoves: Array<number> = [];

        for (let index: number = 0; index < board.length; index++) {
            if (board[index]) continue;
            availableMoves.push(index);
        }

        return availableMoves;
    }
}
