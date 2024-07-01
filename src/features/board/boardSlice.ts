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

type TLoopBoardProps = {
	board: CellValue[][]
	cellValue: CellValue
	row: number
	col: number
	rowDir: number
	colDir: number
	cb: (rowIndex: number, colIndex: number) => void
}

function traverseConsecutiveCells({
	board,
	cellValue,
	row,
	col,
	rowDir,
	colDir,
	cb,
}: TLoopBoardProps) {
	let changedDir = false
	let leftPointer = 1
	let rightPointer = 0
	let i = 0

	while (i < 4) {
		// @NOTE: wow. ts cannot infer this variable
		const currentPointer: number = changedDir ? leftPointer : rightPointer
		const rowIndex = row + currentPointer * rowDir
		const colIndex = col + currentPointer * colDir

		if (board[rowIndex]?.[colIndex] === cellValue) {
			cb(rowIndex, colIndex)
			i++
			changedDir ? leftPointer++ : rightPointer++
		} else if (!changedDir) {
			// change direction only once
			;[rowDir, colDir] = [-rowDir, -colDir]
			changedDir = true
		} else {
			break // stop if there is a non-matching cell after changing direction
		}
	}
}

type TCheckDirectionProps = Omit<TLoopBoardProps, 'cb'>

function checkDirection(props: TCheckDirectionProps) {
	let count = 0
	traverseConsecutiveCells({...props, cb: () => count++})
	return count === 4
}

type TMarkWinCellsProps = Omit<TLoopBoardProps, 'cb'> & {
	winCellValue: CellValue
}

function markWinCells({board, winCellValue, ...props}: TMarkWinCellsProps) {
	traverseConsecutiveCells({
		board,
		...props,
		cb: (rowIndex, colIndex) => {
			board[rowIndex][colIndex] = winCellValue
		},
	})
}

function isDraw(board: CellState[][]) {
	// @NOTE: we can optimize isDraw check, but I'm fine with current impl
	return board.every((row) => row.every((cell) => cell !== CellState.EMPTY))
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

			outer: for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
				if (state.board[row][col] === CellState.EMPTY) {
					state.board[row][col] = playerCellValue

					const directions = [
						{rowDir: 0, colDir: 1}, // horizontal
						{rowDir: 1, colDir: 0}, // vertical
						{rowDir: 1, colDir: 1}, // right diagonal
						{rowDir: 1, colDir: -1}, // left diagonal
					]

					for (const {rowDir, colDir} of directions) {
						const props = {
							board: state.board,
							cellValue: playerCellValue,
							row,
							col,
							rowDir,
							colDir,
						}
						if (checkDirection(props)) {
							markWinCells({
								...props,
								winCellValue,
							})
							state.isWin = true
							break outer
						}
					}

					if (isDraw(state.board)) {
						state.isDraw = true
					} else {
						state.player = state.player === 'black' ? 'red' : 'black'
					}

					break
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
