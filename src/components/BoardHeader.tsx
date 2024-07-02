import {useAppSelector} from '../hooks/store'
import {cn} from '../utils'

export default function BoardHeader() {
	const currentPlayer = useAppSelector((state) => state.board.player)
	const isWin = useAppSelector((state) => state.board.isWin)
	const isDraw = useAppSelector((state) => state.board.isDraw)

	const renderStatusMessage = () => {
		if (isDraw) {
			return 'Draw'
		}

		if (isWin) {
			return (
				<>
					Winner:{' '}
					<span
						className={cn('font-bold', currentPlayer === 'black' ? 'text-black' : 'text-red-500')}>
						{currentPlayer}
					</span>
				</>
			)
		}

		return (
			<>
				Player{' '}
				<span
					className={cn(
						'inline-flex min-w-[92px] justify-center rounded-full bg-gray-200 px-4 align-bottom font-bold',
						currentPlayer === 'black' ? 'text-black' : 'text-red-500',
					)}>
					{currentPlayer}
				</span>{' '}
				turn
			</>
		)
	}

	return <h1 className="mb-4 text-2xl font-bold">{renderStatusMessage()}</h1>
}
