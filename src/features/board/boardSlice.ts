import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {CellValue} from '../../types'
import {CellState} from '../../utils'

export interface BoardState {
	board: CellValue[][]
	player: 'red' | 'black'
	isWin: boolean
	isDraw: boolean
}

export const BOARD_HEIGHT = 6
export const BOARD_WIDTH = 7

export const createEmptyBoard = () =>
	Array.from({length: BOARD_HEIGHT}, () => new Array(BOARD_WIDTH).fill(CellState.EMPTY))

const initialState: BoardState = {
	board: createEmptyBoard(),
	player: 'black',
	isWin: false,
	isDraw: false,
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		makeTurn: (state, action: PayloadAction<{col: number}>) => {
			if (state.isWin || state.isDraw) return
			const col = action.payload.col
			const playerCellValue = state.player === 'black' ? CellState.BLACK : CellState.RED
			const winCellValue =
				playerCellValue === CellState.BLACK ? CellState.BLACK_WIN : CellState.RED_WIN

			for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
				if (state.board[row][col] === CellState.EMPTY) {
					state.board[row][col] = playerCellValue

					// check for the win
					// oh way. I should refactor this to generic function
					let count = 0
					// vertical first
					for (let i = row; i < BOARD_HEIGHT; i++) {
						if (count === 4) break
						if (state.board[i][col] === playerCellValue) count++
						else break
					}

					if (count === 4) {
						for (let i = row; i < BOARD_HEIGHT; i++) {
							if (count === 0) break
							if (state.board[i][col] === playerCellValue) {
								state.board[i][col] = winCellValue
								count--
							} else break
						}

						state.isWin = true
						break
					}

					// we are not checking other directions if we already win;

					// horizontal
					count = 0
					for (let i = col; i < BOARD_WIDTH; i++) {
						if (count === 4) break
						if (state.board[row][i] === playerCellValue) count++
						else break
					}

					for (let i = col - 1; i >= 0; i--) {
						if (count === 4) break
						if (state.board[row][i] === playerCellValue) count++
						else break
					}

					if (count === 4) {
						for (let i = col - 1; i >= 0; i--) {
							if (count === 0) break
							if (state.board[row][i] === playerCellValue) {
								state.board[row][i] = winCellValue
								count--
							} else break
						}
						for (let i = col; i < BOARD_WIDTH; i++) {
							if (count === 0) break
							if (state.board[row][i] === playerCellValue) {
								state.board[row][i] = winCellValue
								count--
							} else break
						}
						state.isWin = true
						break
					}

					// diagonal left to rigth
					count = 0
					let colDir = 1
					let rowDir = -1
					for (let i = 0; i < 4; i++) {
						const rowIndex = row + i * rowDir
						const colIndex = col + i * colDir
						if (count === 4) break
						if (state.board[rowIndex]?.[colIndex] === playerCellValue) count++
						else break
					}

					colDir = -1
					rowDir = 1
					// we should skip center;
					// we can do this for both direction and start from next cell. current cell is always good.
					// wow those two loops are the same. now almost. that's cool
					for (let i = 0; i < 4; i++) {
						const rowIndex = row + 1 + i * rowDir
						const colIndex = col - 1 + i * colDir
						if (count === 4) break
						if (state.board[rowIndex]?.[colIndex] === playerCellValue) count++
						else break
					}

					if (count === 4) {
						colDir = 1
						rowDir = -1
						for (let i = 0; i < 4; i++) {
							const rowIndex = row + i * rowDir
							const colIndex = col + i * colDir
							if (count === 0) break
							if (state.board[rowIndex]?.[colIndex] === playerCellValue) {
								state.board[rowIndex][colIndex] = winCellValue
								count--
							} else break
						}
						colDir = -1
						rowDir = 1
						for (let i = 0; i < 4; i++) {
							const rowIndex = row + 1 + i * rowDir
							const colIndex = col - 1 + i * colDir
							if (count === 0) break
							if (state.board[rowIndex]?.[colIndex] === playerCellValue) {
								state.board[rowIndex][colIndex] = winCellValue
								count--
							} else break
						}
						state.isWin = true
						break
					}

					// diagonal right to left
					count = 0
					colDir = -1
					rowDir = -1
					for (let i = 0; i < 4; i++) {
						const rowIndex = row + i * rowDir
						const colIndex = col + i * colDir
						console.log(rowIndex, colIndex, 'diagonal forward')
						if (count === 4) break
						if (state.board[rowIndex]?.[colIndex] === playerCellValue) count++
						else break
					}

					colDir = 1
					rowDir = 1
					// we should skip center;
					// we can do this for both direction and start from next cell. current cell is always good.
					// wow those two loops are the same. now almost. that's cool
					for (let i = 0; i < 4; i++) {
						const rowIndex = row + 1 + i * rowDir
						const colIndex = col + 1 + i * colDir
						console.log(rowIndex, colIndex, 'diagonal backward')
						if (count === 4) break
						if (state.board[rowIndex]?.[colIndex] === playerCellValue) count++
						else break
					}

					if (count === 4) {
						colDir = -1
						rowDir = -1
						for (let i = 0; i < 4; i++) {
							const rowIndex = row + i * rowDir
							const colIndex = col + i * colDir
							if (count === 0) break
							if (state.board[rowIndex]?.[colIndex] === playerCellValue) {
								state.board[rowIndex][colIndex] = winCellValue
								count--
							} else break
						}
						colDir = 1
						rowDir = 1
						for (let i = 0; i < 4; i++) {
							const rowIndex = row + 1 + i * rowDir
							const colIndex = col + 1 + i * colDir
							console.log(rowIndex, colIndex, 'diagonal')
							if (count === 0) break
							if (state.board[rowIndex]?.[colIndex] === playerCellValue) {
								state.board[rowIndex][colIndex] = winCellValue
								count--
							} else break
						}
						state.isWin = true
						break
					}

					// check for draw

					if (state.board.every((row) => row.every((cell) => cell !== CellState.EMPTY))) {
						state.isDraw = true;
						break;
					}

					state.player = state.player === 'black' ? 'red' : 'black'
					break
				}
			}
		},
		restartGame: () => {
			return initialState;
		},
	},
})

export const {makeTurn, restartGame} = boardSlice.actions

export default boardSlice.reducer
