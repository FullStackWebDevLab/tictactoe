/*
 * Only the API accesses the game state directly. Everything else uses the api to access the game state.
 *
 * This module exports an instance of the API class. The instance is ready for
 * use without needing to call the constructor. The module exports an instance
 * instead of the actual class so that all other modules using the API use
 * the same GameState instance. If the class was exported, a new GameState
 * instance would be created everytime the constructor method is called.
 * There can only be one GameState instance per game.
 */
import type * as Types from "./types";
import GameState from "./GameState";

class API {
    gameState: GameState;

    constructor() {
        this.gameState = new GameState();
    }

    getState(): Types.IGameState {
        return this.gameState.getState();
    }

    resetState() {
        this.gameState = new GameState();
    }

    play(player: Types.Player, index: number) {
        const state: Types.IGameState = this.gameState.getState();
        state.board[index] = player;
        this.gameState.updateState(state);
    }

    checkWin() {
        const board = this.gameState.getState().board;
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                this.gameState.updateState({ won: true, winner: board[a] });
            }
        }
    }

    checkDraw() {
        const board = this.gameState.getState().board;
        for (const cell of board) {
            if (!cell) return;
        }

        this.gameState.updateState({ draw: true });
    }

    playAndCheckWinAndDraw(player: Types.Player, index: number) {
        this.play(player, index);
        this.checkWin();
        this.checkDraw();
    }
}

const api_instance = new API();
export default api_instance;
