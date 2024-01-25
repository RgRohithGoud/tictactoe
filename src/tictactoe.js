// import logo from './logo.svg';
import './tictactoe.css';
import { useState } from 'react';


function Square({value,onSquareClick}){
  return(
    <button 
      className="square" onClick={onSquareClick}
    >
      {value} 

    </button>
  );
}

function CalculateWinner(squares){
  const A = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let ans = 'no one!';
  for(let i = 0;i<A.length;i++){
    const [a,b,c] = A[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    } 
  }
  for(let i=0;i<squares.length;i++){
    if(!squares[i]) return null;
  }
  return ans;
}
function Board({xIsNext,squares,onPlay}){

    function handleClick(i){
      if(squares[i] || CalculateWinner(squares)) return;
      const nextsquares = squares.slice();
      if(xIsNext){
        nextsquares[i] = 'X';
      }
      else{
        nextsquares[i] = 'O';
      }
      onPlay(nextsquares);
    }
    const winner = CalculateWinner(squares);
    let status;
    if(winner){
        status = 'Winner is '+winner;
    }
    else{
      if(xIsNext) status = 'Next Turn : X';
      else status = 'Next Turn : O';
    }
    return (
      <div className='Main' >
        <div className='Display'>{status}</div>
        <div className='Board-Row'>
          <Square value={squares[0]} onSquareClick={()=> handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={()=> handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={()=> handleClick(2)}/>
        </div>
        <div className='Board-Row'>
          <Square value={squares[3]} onSquareClick={()=> handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={()=> handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={()=> handleClick(5)}/>
        </div>
        <div className='Board-Row'>
          <Square value={squares[6]} onSquareClick={()=> handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={()=> handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={()=> handleClick(8)}/>
        </div>
      </div>
    );
}

function App() {
  const [history,sethistory] = useState([Array(9).fill(null)]);
  const [currMove, setcurrMove] = useState(0);
  const xIsNext = currMove%2 === 0;
  const currSquares = history[currMove];
  function handlePlay(nextsquares){
    const nexthistory = [...history.slice(0,currMove+1),nextsquares];
    sethistory(nexthistory);
    setcurrMove(nexthistory.length-1);
  }
  function jumpto(nextMove){
    setcurrMove(nextMove);
  }
  const moves = history.map((squares,move) =>{
    let description;
    if(move > 0){
      description = 'Go to Move =>'+move;
    }
    else{
      description = 'Go to game start';
    }
    return(
      <li key={move}>
        <button className='MOVES' onClick={()=>jumpto(move)}>{description}</button>
      </li>
    );
  });
  return(
    <div className='Game'>
      <div className='heading'> TIC-TAC-TOE</div>
      <div className='Game-Board'>
        <Board xIsNext={xIsNext} squares={currSquares} onPlay={handlePlay}> </Board>
      </div>
      <div className='Game-info'>
          <ol>{moves}</ol>
      </div>
    </div>
  );
}


export default App;
