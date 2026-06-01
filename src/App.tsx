import Header from "./components/Header";
import Board from "./components/Board";
import AIOpponent from "./AIOpponent";
import { useState, useReducer } from "react";
import API from "./API";

const GITHUB_REPO = "https://github.com/FullStackWebDevLab/tictactoe";
const opponent = new AIOpponent();

export default function App() {
    // This is to force update this component when needed.
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [humanStart, setHumanStart] = useState(1);

    function clickHandler(index: number) {
        const gameState = API.getState();
        if (gameState.won || gameState.board[index]) return;

        API.playAndCheckWinAndDraw("O", index);
        if (API.getState().won) {
            forceUpdate();
            return;
        }

        opponent.play();
        forceUpdate();
    }

    function restartGame() {
        API.resetState();

        if (humanStart % 2) {
            opponent.playRandom();
        }
        
        setHumanStart(humanStart+1);
    }

    const gameState = API.getState();
    
    if (gameState.won) return <>
        <Header githubRepoUrl={GITHUB_REPO} />
        <div className="container">
            <div className="message-container">
                <h2 className="win-message">{gameState.winner} Won</h2>
            </div>
            <Board state={gameState.board} onCellClick={clickHandler} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>;

    if (gameState.draw) return <>
        <Header githubRepoUrl={GITHUB_REPO} />
        <div className="container">
            <div className="message-container">
                <h2 className="draw-message">Draw</h2>
            </div>
            <Board state={gameState.board} onCellClick={clickHandler} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>;

    return <>
        <Header githubRepoUrl={GITHUB_REPO} />
        <Board state={gameState.board} onCellClick={clickHandler} />
    </>
}
