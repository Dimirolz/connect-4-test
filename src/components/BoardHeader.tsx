import {useAppSelector} from '../hooks/store'

export default function BoardHeader() {
	const currentPlayer = useAppSelector((state) => state.board.player)

	return <h1 className="mb-4 text-2xl font-bold">Current player: {currentPlayer}</h1>
}
