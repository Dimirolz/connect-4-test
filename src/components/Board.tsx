import useGame from '../hooks/useGame'
import Cell from './Cell'

export default function Board() {
	const {winner, board, handleCellClick, handleRestart, getGameStatusMessage} = useGame()

	return (
		<div>
			<div className="flex flex-col items-center">
				<h1 className="mb-4 text-2xl font-bold">{getGameStatusMessage()}</h1>
			</div>
			<div className="grid grid-cols-7">
				{board.map((row, rowIndex) =>
					row.map((_, colIndex) => (
						<Cell
							key={`${rowIndex}-${colIndex}`}
							value={board[rowIndex][colIndex]}
							disabled={!!winner}
							onClick={() => handleCellClick(rowIndex, colIndex)}
						/>
					)),
				)}
			</div>

			<div className="flex">
				<button
					className={`ml-auto mt-4 rounded-xl p-2 ${winner ? 'bg-green-500' : 'bg-gray-200'}`}
					onClick={handleRestart}>
					Restart
				</button>
			</div>
		</div>
	)
}
