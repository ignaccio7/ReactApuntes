
import { useState } from 'react'
import './App.css'

import { Square } from './components/Square'
import { TURNS } from './composables/constants'
import { verifyCheckEndGame, verifyWinner } from './composables/board'
import { WinnerModal } from './components/WinnerModal'

import confetti from 'canvas-confetti'


function App() {
  //!!!!ESTA PROHIBIDO HACER leer el local storage
  //como nota leer del localStorage es sincrono y bloquea
  // const boardFromLocalStorage = JSON.parse(window.localStorage.getItem("board"))
  // if (boardFromLocalStorage) {
  //   const [board, setBoard] = useState(boardFromLocalStorage)
  // }
  //!!! ESTA PROHIBIDO ya que react guarda la posicion de los useState dentro de un array y si lo colocamos dentro de un if pues pierde las posiciones
  //los useStates siempre deben estar en el cuerpo del componente

  // const board = new Array(9).fill(null)
  // const [board, setBoard] = useState(new Array(9).fill(null))
  const [board, setBoard] = useState(()=>{
    const boardFromLocalStorage = window.localStorage.getItem("board")
    return boardFromLocalStorage 
      ? JSON.parse(window.localStorage.getItem("board")) 
      : new Array(9).fill(null) 
  })

  // const [turn, setTurn] = useState(TURNS.X)
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {

    if (board[index] !== null || winner) return;

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    /*para guardar la partida nosotros debemos saber que el localstorage
    te guarda solamente strings por lo cual debemos parsearlo antes ya que si guardamos
    un vector ["a","b","c"] lo que guardara sera "a","b","c"
    */
    window.localStorage.setItem("board",JSON.stringify(newBoard))
    window.localStorage.setItem("turn",newTurn)

    const newWinner = verifyWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (verifyCheckEndGame(newBoard)) {
      setWinner("-")
    }

  }

  const resetGame = ()=>{
    setBoard(new Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)

    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }


  return (
    <div className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <div className="game">
        {board.map((valor, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {valor}
            </Square>
          )
        })}
      </div>
      <div className="turn">
        <Square
          isSelected={turn === TURNS.X}
        >
          {TURNS.X}
        </Square>
        <Square
          isSelected={turn === TURNS.O}
        >
          {TURNS.O}
        </Square>
        {/* <div className="square is-selected">X</div>
        <div className="square">O</div> */}
      </div>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  )
}

export default App
