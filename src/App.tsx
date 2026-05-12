export default function App() {
    return <Board />;
}

function Board() {
    return (
        <div className="board">
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
        </div>
    );
}

function Cell() {
    return <button className="cell"></button>;
}
