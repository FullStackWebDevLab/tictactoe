import Board from "./components/Board";
import { useState } from "react";
import AIOpponent from "./AIOpponent";
import API from "./API";

export default function App() {
    const [opponent] = useState(new AIOpponent());
    const [gameState, setGameState] = useState(API.getState());

    function clickHandler(index: number) {
        if (gameState.board[index]) return;

        API.play("O", index);
        opponent.playRandom();
        setGameState(API.getState());
    }

    return <Board state={gameState.board} onCellClick={clickHandler} />
}
