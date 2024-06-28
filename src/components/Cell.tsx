import {makeTurn} from '../features/board/boardSlice'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import {cellBgColors, CellState} from '../utils'

export default function Cell({row, col}: {row: number; col: number}) {
	const value = useAppSelector((state) => state.board.board[row][col])
	const dispatch = useAppDispatch()
	const color = cellBgColors[value]
	const hoverColor = value === CellState.EMPTY ? 'bg-gray-400' : ''

	return (
		<button
			className={'group h-12 w-12 cursor-pointer p-[2px]'}
			onClick={() =>
				dispatch(
					makeTurn({
						col,
					}),
				)
			}>
			<div
				className={`h-full w-full rounded-full ${color} flex items-center justify-center group-hover:${hoverColor}`}>
				{/* {row}/{col} */}
				{(value === CellState.BLACK_WIN || value === CellState.RED_WIN) && (
					<span className="text-white">X</span>
				)}
			</div>
		</button>
	)
}
