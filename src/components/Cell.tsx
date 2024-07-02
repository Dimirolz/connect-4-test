import {CSSProperties} from 'react'
import {useAppSelector} from '../hooks/store'
import {CellState, cellBgColors, cn} from '../utils'

export default function Cell({row, col}: {row: number; col: number}) {
	const value = useAppSelector((state) => state.board.board[row][col])
	const bgColor = cellBgColors[value]
	const startY = `calc(-${row * 100}% - 44px)`
	const fallDuration = `${Math.max(row * 0.1, 0.15)}s`

	return (
		<div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
			<div
				style={{'--start-y': startY, '--fall-duration': fallDuration} as CSSProperties}
				className={cn('flex h-full w-full items-center justify-center rounded-full', bgColor, {
					'animate-fall': value === CellState.BLACK || value === CellState.RED,
				})}>
				{(value === CellState.BLACK_WIN || value === CellState.RED_WIN) && (
					<span className="text-white">X</span>
				)}
			</div>
		</div>
	)
}
