import {restartGame} from '../features/board/boardSlice'
import {useAppDispatch} from '../hooks/store'

export default function GameRestartButton() {
	const dispatch = useAppDispatch()
	return (
		<button
			// className={`ml-auto mt-4 rounded-xl p-2 ${winner ? 'bg-green-500' : 'bg-gray-200'}`}
			onClick={() => dispatch(restartGame())}>
			Restart
		</button>
	)
}
