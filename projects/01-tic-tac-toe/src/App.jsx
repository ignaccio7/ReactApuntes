/**
 * https://jonmircha.com/react#
 * https://www.reactjs.wiki/es-react-una-biblioteca-o-un-framework-por-que
 * https://react.dev/learn/start-a-new-react-project
 */
import { useState } from 'react'
import './App.css'
//para instalar confetti
//https://www.npmjs.com/package/canvas-confetti
import confetti from 'canvas-confetti'

const TURNS = {
  X: "x",
  O: "o"
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ index, children, updateBoard, isSelected }) => {

  const handleClick = () => {
    // console.log(index);
    updateBoard(index);
  };

  const classSquare = isSelected ? "square is-selected" : "square";

  return (
    // <div className="square"
    <div className={classSquare}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};


function App() {

  // const board = Array(9).fill(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    //este return solo detiene la iteracion actual y no asi la funcion
    // WINNER_COMBOS.forEach(combo => {
    //   let [a, b, c] = [...combo]
    //   // console.log(a,b,c);
    //   if (newBoard[a] !== null
    //     && newBoard[a] === newBoard[b]
    //     && newBoard[a] === newBoard[c]) {
    //     console.log("a");
    //     return true;
    //   }
    // });
    // return false;
    for (const combo of WINNER_COMBOS) {
      let [a, b, c] = [...combo]
      // console.log(a,b,c);
      if (newBoard[a] !== null
        && newBoard[a] === newBoard[b]
        && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return false;
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null);
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

  }

  const updateBoard = (index) => {

    //para que no se modifiquen las casillas
    if (board[index] || winner) return;

    //actualizamos el board
    const newBoard = [...board];    //--> hacemos esto porque los estados son inmutables
    //--> jamas se debe hacer board[index] = turn;0
    newBoard[index] = turn;
    setBoard(newBoard);
    // console.log(board); el manejo del estado es asincrono

    //verificamos si existe un ganador
    //setWinner(checkWinner(newBoard));
    // console.log(checkWinner(newBoard));

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    //cambiamos el turno
    const newTurn = TURNS.X === turn ? TURNS.O : TURNS.X;
    setTurn(newTurn);


  }

  return (
    <main className="board">
      <h1>TiC TaC ToE</h1>
      <button
        onClick={resetGame}
      >
        Reset Game
      </button>
      {/* <!--Tablero de juego --> */}
      <div className="game">
        {
          board.map((value, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {value}
              </Square>
            )
          })
        }
      </div>
      {/* <!--Turnos --> */}
      <div className="turn">
        {/* <div className="square is-selected">X</div>
        <div className="square">O</div> */}
        <Square
          isSelected={turn === TURNS.X}
        >
          X
        </Square>
        <Square
          isSelected={turn === TURNS.O}
        >
          O
        </Square>
      </div>

      {
        winner !== null && (
          <div className="winner">
            <div className="text">
              {/* <h2> {`Win : ${winner}`}</h2> */}
              <h2> {
                winner === false
                  ? ' - Empate - '
                  : `Win : `
              }</h2>
              {
                winner && <Square
                  isSelected={true}
                >
                  {winner}
                </Square>
              }
              <button
                onClick={resetGame}
              >
                Reset Game
              </button>
            </div>
          </div>
        )
      }

    </main>
  )
}

export default App
