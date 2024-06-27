import { useState } from "react"
import { CellValue } from "../types"
import { cellState } from "../utils"

export default function useGame() {
	const [winner, setWinner] = useState<'red' | 'black' | 'draw' | null>(null)
	const [currentPlayer, setCurrentPlayer] = useState<'red' | 'black'>('black')
	const [board, setBoard] = useState<CellValue[][]>(
		new Array(6).fill(0).map(() => new Array(7).fill(cellState.EMPTY)),
	)

	function handleCellClick(rowIndex: number, colIndex: number) {
		if (winner) return
		const newBoard = board.map((row) => [...row])
		newBoard[rowIndex][colIndex] = currentPlayer === 'red' ? cellState.RED : cellState.BLACK
		setBoard(newBoard)
		setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red')
		if (!checkWinner(newBoard)) {
			checkDraw(newBoard)
		}
	}

	function checkDraw(board: number[][]) {
		if (board.every((row) => row.every((cell) => cell !== cellState.EMPTY))) {
			setWinner('draw')
		}
	}

	function drawWinnerCells(row: number, col: number, rowDir: number, colDir: number) {
		const newBoard = board.map((row) => [...row])
		for (let i = 0; i < 4; i++) {
			newBoard[row + i * rowDir][col + i * colDir] =
				currentPlayer === 'red' ? cellState.RED_WIN : cellState.BLACK_WIN
		}
		setBoard(newBoard)
	}

	const checkWinner = (board: number[][]) => {
		const isConsecutiveFour = (c1: number, c2: number, c3: number, c4: number) => {
			return c1 && c1 === c2 && c1 === c3 && c1 === c4
		}

		const checkDirection = (row: number, col: number, rowDir: number, colDir: number) => {
			const cells = [
				board[row]?.[col],
				board[row + rowDir]?.[col + colDir],
				board[row + 2 * rowDir]?.[col + 2 * colDir],
				board[row + 3 * rowDir]?.[col + 3 * colDir],
			] as const

			if (isConsecutiveFour(...cells)) {
				setWinner(cells[0] === cellState.RED ? 'red' : 'black')
				drawWinnerCells(row, col, rowDir, colDir)
				return true
			}
			return false
		}

		// @TODO: currently, we are naively checking the entire board for simplicity.
		// we can optimize it by getting last state of the board and then check all direction from last cell
		// there is tradeoff between simplicity of the function api and performance
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				if (
					checkDirection(row, col, 0, 1) || // Horizontal
					checkDirection(row, col, 1, 0) || // Vertical
					checkDirection(row, col, 1, 1) || // Diagonal (top-left to bottom-right)
					checkDirection(row, col, -1, 1) // Diagonal (bottom-left to top-right)
				) {
					return true
				}
			}
		}

		return false
	}

	function handleRestart() {
		setBoard(board.map(() => new Array(7).fill(cellState.EMPTY)))
		setCurrentPlayer('black')
		setWinner(null)
	}

	function getGameStatusMessage() {
		return winner === 'draw'
			? 'Draw'
			: winner
				? `Winner: ${winner}`
				: `Current Player: ${currentPlayer}`
	}

    return {
        winner,
        board,
        handleCellClick,
        handleRestart,
        getGameStatusMessage,
    }
}

