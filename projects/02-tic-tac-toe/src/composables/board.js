import { WINNER_COMBOS } from "./constants"

export const verifyWinner = (newBoard) => {
    for (const [a, b, c] of WINNER_COMBOS) {
        if (newBoard[a] !== null) {
            if (newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                // console.log("Hay ganador");
                return newBoard[a]
            }
        }
    }
    return false
}

export const verifyCheckEndGame = (newBoard) => {
    return newBoard.every(square => square !== null)
}