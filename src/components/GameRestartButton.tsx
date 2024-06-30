import {restartGame} from '../features/board/boardSlice'
import {useAppDispatch, useAppSelector} from '../hooks/store'

export default function GameRestartButton() {
	const dispatch = useAppDispatch()
	const isWin = useAppSelector((state) => state.board.isWin)
	const isDraw = useAppSelector((state) => state.board.isDraw)
	return (
		<button
			className={`ml-auto mt-4 rounded-xl p-2 ${isWin || isDraw ? 'bg-green-500' : 'bg-gray-200'}`}
			onClick={() => dispatch(restartGame())}>
			Restart
		</button>
	)
}
