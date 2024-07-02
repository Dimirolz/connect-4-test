import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {CellValue} from '../../types'
import {CellState} from '../../utils'
import {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	checkWin,
	findEmptyCellInCol,
	isDraw,
	markCells,
} from './boardUtils'

export interface BoardState {
	board: CellValue[][]
	player: 'red' | 'black'
	isWin: boolean
	isDraw: boolean
}

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

			const row = findEmptyCellInCol(state.board, col)

			if (row !== -1) {
				state.board[row][col] = playerCellValue

				const {isWin, rowDir, colDir} = checkWin(state.board, playerCellValue, row, col)

				if (isWin) {
					markCells({
						board: state.board,
						cellValue: playerCellValue,
						winCellValue,
						row,
						col,
						rowDir: rowDir,
						colDir: colDir,
					})
					state.isWin = true
				} else if (isDraw(state.board)) {
					state.isDraw = true
				} else {
					state.player = state.player === 'black' ? 'red' : 'black'
				}
			}
		},
		restartGame: () => {
			return initialState
		},
	},
})

export const {makeTurn, restartGame} = boardSlice.actions

export default boardSlice.reducer
