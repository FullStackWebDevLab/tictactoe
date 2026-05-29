import Board from "./components/Board";
import AIOpponent from "./AIOpponent";
import { useState, useReducer } from "react";
import API from "./API";

const opponent = new AIOpponent();
opponent.playRandom();

export default function App() {
    // This is to force update this component when needed.
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    function clickHandler(index: number) {
        const gameState = API.getState();
        if (gameState.won || gameState.board[index]) return;

        API.playAndCheckWinAndDraw("O", index);
        if (API.getState().won) {
            forceUpdate();
            return;
        }

        opponent.playRandom();
        forceUpdate();
    }

    function restartGame() {
        API.resetState();
        opponent.playRandom();
        forceUpdate();
    }

    const gameState = API.getState();
    
    if (gameState.won) return <>
        <div className="container">
            <div className="message-container">
                <h2 className="win-message">{gameState.winner} Won</h2>
            </div>
            <Board state={gameState.board} clickHandler={clickHandler} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>;

    if (gameState.draw) return <>
        <div className="container">
            <div className="message-container">
                <h2 className="draw-message">Draw</h2>
            </div>
            <Board state={gameState.board} clickHandler={clickHandler} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>;

    return <Board state={gameState.board} onCellClick={clickHandler} />
}
