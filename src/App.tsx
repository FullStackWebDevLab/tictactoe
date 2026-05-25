import { useState } from 'react';

export default function Game() {
    const [nextMove, setNextMove] = useState<string>('X');
    const [boardState, setBoardState] = useState<(string | null)[]>(Array(9).fill(null));
    const [moveCount, setMoveCount] = useState<number>(0);

    function onCellClick(cellIndex: number) {
        if (gameWon(boardState) || boardState[cellIndex]) return;

        const newBoardState = boardState.slice();
        newBoardState[cellIndex] = nextMove;
        setBoardState(newBoardState);
        setMoveCount(moveCount + 1);

        const newNextMove = (nextMove === "X") ? "O" : "X";
        setNextMove(newNextMove);
    }

    function restartGame() {
        setBoardState(Array(9).fill(null));
        setNextMove("X");
        setMoveCount(0);
    }

    if (gameWon(boardState)) return <>
        <div className="container">
            <div className="message-container">
                <h2 className="win-message">Game Won</h2>
            </div>
            <Board state={boardState} clickHandler={onCellClick} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>;

    if (moveCount === 9) return <>
        <div className="container">
            <div className="message-container">
                <h2 className="draw-message">Draw</h2>
            </div>
            <Board state={boardState} clickHandler={onCellClick} />
            <button className="play-again-button" onClick={restartGame}>Play Again</button>
        </div>
    </>

    return <Board state={boardState} clickHandler={onCellClick} />;
}

interface BoardProps {
    state: (string | null)[];
    clickHandler: (cellIndex: number) => void;
}

function Board({ state, clickHandler }: BoardProps) {
    return (
        <div className="board">
            <Cell value={state[0]} onCellClick={() => clickHandler(0)} />
            <Cell value={state[1]} onCellClick={() => clickHandler(1)} />
            <Cell value={state[2]} onCellClick={() => clickHandler(2)} />
            <Cell value={state[3]} onCellClick={() => clickHandler(3)} />
            <Cell value={state[4]} onCellClick={() => clickHandler(4)} />
            <Cell value={state[5]} onCellClick={() => clickHandler(5)} />
            <Cell value={state[6]} onCellClick={() => clickHandler(6)} />
            <Cell value={state[7]} onCellClick={() => clickHandler(7)} />
            <Cell value={state[8]} onCellClick={() => clickHandler(8)} />
        </div>
    );
}

interface CellProps {
    value: string | null;
    onCellClick: () => void;
}

function Cell({ value, onCellClick }: CellProps) {
    if (value === "X") {
        return <button className="cell x" onClick={onCellClick}>{value}</button>;
    } else {
        return <button className="cell o" onClick={onCellClick}>{value}</button>;
    }
}

function gameWon(boardState: (string | null)[]): boolean {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (boardState[combination[0]] &&
            boardState[combination[0]] === boardState[combination[1]] &&
            boardState[combination[1]] === boardState[combination[2]]) return true;
    }

    return false;
}
