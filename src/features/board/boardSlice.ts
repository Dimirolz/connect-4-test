import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {CellValue} from '../../types'
import {CellState} from '../../utils'

export interface BoardState {
	board: CellValue[][]
	player: 'red' | 'black'
}

export const BOARD_HEIGHT = 6
export const BOARD_WIDTH = 7

export const createEmptyBoard = () =>
	Array.from({length: BOARD_HEIGHT}, () => new Array(BOARD_WIDTH).fill(CellState.EMPTY))

const initialState: BoardState = {
	board: createEmptyBoard(),
	player: 'black',
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		makeTurn: (state, action: PayloadAction<{col: number}>) => {
			const col = action.payload.col
			const playerCellValue = state.player === 'black' ? CellState.BLACK : CellState.RED
			const winCellValue =
				playerCellValue === CellState.BLACK ? CellState.BLACK_WIN : CellState.RED_WIN

			for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
				if (state.board[row][col] === CellState.EMPTY) {
					state.board[row][col] = playerCellValue
					state.player = state.player === 'black' ? 'red' : 'black'

					// check for the win

					let count = 0
					// vertical first
					for (let i = row; i < BOARD_HEIGHT; i++) {
						if (count === 4) break
						if (state.board[i][col] === playerCellValue) count++
						else break
					}

					if (count === 4) {
						for (let i = row; i < BOARD_HEIGHT; i++) {
							state.board[i][col] = winCellValue
						}
					}

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
					}

					count = 0;

					// for (let i = row) // ? CONTINUE THERE. REFACTOR THIS SHIT LATER

					// diagonal left to rigth
					// diagonal right to left

					break
				}
			}
		},
		restartGame: (state) => {
			state.board = createEmptyBoard()
			state.player = 'black'
		},
	},
})

export const {makeTurn, restartGame} = boardSlice.actions

export default boardSlice.reducer
