import {BOARD_HEIGHT, BOARD_WIDTH} from '../features/board/boardUtils'
import BoardHeader from './BoardHeader'
import Cell from './Cell'
import Column from './Column'
import GameRestartButton from './GameRestartButton'

export default function Board() {
	return (
		<div>
			<div className="flex flex-col items-center">
				<BoardHeader />
			</div>
			<div className="flex relative bg-gray-300 rounded overflow-hidden">
				{new Array(BOARD_WIDTH).fill(0).map((_, colIndex) => {
					return (
						<Column col={colIndex} key={colIndex}>
							{new Array(BOARD_HEIGHT).fill(0).map((_, rowIndex) => {
								return <Cell key={`${colIndex}-${rowIndex}`} row={rowIndex} col={colIndex} />
							})}
						</Column>
					)
				})}
			</div>

			<div className="flex">
				<GameRestartButton />
			</div>
		</div>
	)
}
