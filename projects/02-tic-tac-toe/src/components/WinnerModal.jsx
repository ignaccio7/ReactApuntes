
import { Square } from "./Square"
export function WinnerModal({ winner, resetGame }) {

    if (winner === null) {
        return
    }

    const winnerText = winner !== "-" ? "El ganador es:" : "Empate"

    return (
        <div className="winner">
            <div className="text">
                <h1>{winnerText}</h1>
                <Square
                >
                    {winner}
                </Square>
                <button
                    onClick={resetGame}
                >
                    Volver a Jugar
                </button>
            </div>
        </div>
    )

}

