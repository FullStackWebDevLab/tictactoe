// Keep track of the game state.
import type * as Types from "./types";

export default class GameState {
    state: Types.IGameState;

    constructor() {
        this.state = {
            board: Array(9).fill(null),
            won: false;
            winner: null
            draw: false;
        }
    }

    getState(): Types.IGameState {
        return this.state;
    }

    updateState(newState: Partial<Types.IGameState>) {
        this.state = { ...this.state, ...newState };
    }
}
