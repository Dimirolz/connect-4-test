import {CellValue} from '../../types'
import {CellState} from '../../utils'

export const BOARD_HEIGHT = 6
export const BOARD_WIDTH = 7

const directions = [
	{rowDir: 0, colDir: 1}, // horizontal
	{rowDir: 1, colDir: 0}, // vertical
	{rowDir: 1, colDir: 1}, // right diagonal
	{rowDir: 1, colDir: -1}, // left diagonal
]

type TLoopBoardProps = {
	board: CellValue[][]
	cellValue: CellValue
	row: number
	col: number
	rowDir: number
	colDir: number
	cb: (rowIndex: number, colIndex: number) => void
}

type TCheckDirectionProps = Omit<TLoopBoardProps, 'cb'>

type TMarkWinCellsProps = Omit<TLoopBoardProps, 'cb'> & {
	winCellValue: CellValue
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

export function checkDirection(props: TCheckDirectionProps) {
	let count = 0
	traverseConsecutiveCells({...props, cb: () => count++})
	return count === 4
}

export function markCells({board, winCellValue, ...props}: TMarkWinCellsProps) {
	traverseConsecutiveCells({
		board,
		...props,
		cb: (rowIndex, colIndex) => {
			board[rowIndex][colIndex] = winCellValue
		},
	})
}

export function isDraw(board: CellState[][]) {
	// @NOTE: we can optimize isDraw check, but I'm fine with current impl
	return board.every((row) => row.every((cell) => cell !== CellState.EMPTY))
}

export function findEmptyCellInCol(board: CellState[][], col: number) {
	for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
		if (board[row][col] === CellState.EMPTY) {
			return row
		}
	}
	return -1
}

export function checkWin(board: CellValue[][], cellValue: CellValue, row: number, col: number) {
	for (const {rowDir, colDir} of directions) {
		if (
			checkDirection({
				board,
				cellValue,
				row,
				col,
				rowDir,
				colDir,
			})
		) {
			return {isWin: true, rowDir, colDir} as const
		}
	}
	return {isWin: false} as const
}
