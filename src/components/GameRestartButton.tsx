import {restartGame} from '../features/board/boardSlice'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import { cn } from '../utils'

export default function GameRestartButton() {
	const dispatch = useAppDispatch()
	const isWin = useAppSelector((state) => state.board.isWin)
	const isDraw = useAppSelector((state) => state.board.isDraw)
	return (
		<button
			className={cn('ml-auto mt-4 rounded-xl p-2', {
				'bg-green-500': isWin || isDraw,
				'bg-gray-200': !isWin && !isDraw,
			})}
			onClick={() => dispatch(restartGame())}>
			Restart
		</button>
	)
}
