/*
 * Bugs
 * ====
 * + Overwriting cells. When you click on a cell, the current move is written on the cell. When you click the cell again, the next move ovewrites the previous move.
 */
import {useState} from 'react';

export default function App() {
    return <Board/>;
}

function Board() {
    const [nextMove, setNextMove] = useState('X');
    const [boardState, setBoardState] = useState({
        0: null, 1: null, 2: null, 3: null, 4: null,
        5: null, 6: null, 7: null, 8: null
    });

    function handleClick(cellIndex) {
        if (gameWon(boardState) || boardState[cellIndex]) return;

        const newBoardState = {
            ...boardState,
            [cellIndex]: nextMove
        };
        setBoardState(newBoardState);

        if (gameWon(newBoardState)) {
            console.log("Game won.");
            return;
        }

        const newNextMove = (nextMove === "X") ? "O" : "X";
        setNextMove(newNextMove);
    }

    return (
        <div className="board">
            <Cell value={boardState[0]} clickHandler = {() => handleClick(0)} />
            <Cell value={boardState[1]} clickHandler = {() => handleClick(1)} />
            <Cell value={boardState[2]} clickHandler = {() => handleClick(2)} />
            <Cell value={boardState[3]} clickHandler = {() => handleClick(3)} />
            <Cell value={boardState[4]} clickHandler = {() => handleClick(4)} />
            <Cell value={boardState[5]} clickHandler = {() => handleClick(5)} />
            <Cell value={boardState[6]} clickHandler = {() => handleClick(6)} />
            <Cell value={boardState[7]} clickHandler = {() => handleClick(7)} />
            <Cell value={boardState[8]} clickHandler = {() => handleClick(8)} />
        </div>
    );
}

function Cell({value, clickHandler}) {
    return <button className="cell" onClick={clickHandler}>{value}</button>;
}

function gameWon(boardState) {
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
