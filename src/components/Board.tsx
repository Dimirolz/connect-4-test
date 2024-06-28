import {createEmptyBoard} from '../features/board/boardSlice'
import BoardHeader from './BoardHeader'
import Cell from './Cell'
import GameRestartButton from './GameRestartButton'

export default function Board() {
	const emptyBoard = createEmptyBoard()
	return (
		<div>
			<div className="flex flex-col items-center">
				<BoardHeader />
			</div>
			<div className="flex flex-col">
				{emptyBoard.map((row, rowIndex) => (
					<div className="flex" key={rowIndex}>
						{row.map((_, colIndex) => (
							<Cell key={`${colIndex}-${rowIndex}`} row={rowIndex} col={colIndex} />
						))}
					</div>
				))}
			</div>

			<div className="flex">
				<GameRestartButton />
			</div>
		</div>
	)
}
