import React, { useState } from "react";
import Board from "../Board/Board";

type HistoryProps = {
    squares: Array<Array<string | null>>,
    xIsNext: Boolean,
    stepNumber: number
}

const Game = () => {
    const [history, setHistory] = useState<HistoryProps>({
        squares: [Array<string | null>(9).fill(null)],
        xIsNext: false,
        stepNumber: 0
    });

    function checkWinner(squares: Array<string | null>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) return squares[a];
        }
        return null;
    }

    function jumpTo(step: number){
        setHistory({
            squares: history.squares,
            stepNumber: step,
            xIsNext: (step%2) === 0
        })
    }

    function handleClick(i: number) {
        const ohistory = history.squares.slice(0, history.stepNumber+1);
        const cur = ohistory[ohistory.length - 1];
        const squares = cur.slice();
        if (checkWinner(squares) || squares[i]) return;
        squares[i] = history.xIsNext ? 'X' : 'O';
        setHistory({ squares: ohistory.concat([squares]), xIsNext: !history.xIsNext, stepNumber: ohistory.length });
    }

    function getStatus() {
        const ohistory = history.squares;
        const cur = ohistory[history.stepNumber];
        const winner = checkWinner(cur);
        console.log(ohistory);
        const moves = ohistory.map((step, move)=>{
            const desc = move ?
                'Go to move #'+move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={()=> jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        let status;
        if (winner) status = 'Winner: ' + winner;
        else status = 'Next player: ' + (history.xIsNext ? 'X' : 'O');
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={cur} onClick={(i: number) => handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }

    return getStatus();
};

export default Game;