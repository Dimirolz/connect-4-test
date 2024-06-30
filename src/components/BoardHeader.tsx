import {useAppSelector} from '../hooks/store'

export default function BoardHeader() {
	const currentPlayer = useAppSelector((state) => state.board.player)
	const isWin = useAppSelector((state) => state.board.isWin)
	const isDraw = useAppSelector((state) => state.board.isDraw)

	return (
		<h1 className="mb-4 text-2xl font-bold">
			{isDraw ? 'Draw' : isWin ? `Winner: ${currentPlayer}` : `Current Player: ${currentPlayer}`}
		</h1>
	)
}
