import React, {useState} from "react";
import Square from "../Square/Square";

export type NBoardProps = {
    squares: Array<string|null>, 
} 

export type BoardProps = {
  squares: Array<string|null>,
  onClick: any
}

const Board = (props: BoardProps) =>{
    const [state, setState] = useState<NBoardProps>({
      squares: props.squares,
    });

    
    function renderSquare(i: number) {
        return <Square value={props.squares[i]!} onClick={()=>props.onClick(i)}/>;
    } 

    return (
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
}

export default Board;