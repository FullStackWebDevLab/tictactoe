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
        const newBoardState = {
            ...boardState,
            [cellIndex]: nextMove
        };

        setBoardState(newBoardState);

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
