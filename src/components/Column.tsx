import {makeTurn} from '../features/board/boardSlice'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import {CellState, cn} from '../utils'

type TColumnProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'button'>> & {
	col: number
	className?: string
}

export default function Column({className, children, col, ...props}: TColumnProps) {
	const dispatch = useAppDispatch()
	const columnIsFull = useAppSelector((state) =>
		state.board.board.every((row) => row[col] !== CellState.EMPTY),
	)

	return (
		<button
			className={cn('flex flex-col rounded px-[2px] gap-1', className, {
				'hover:bg-gray-100': !columnIsFull,
			})}
			onClick={() => dispatch(makeTurn({col}))}
			disabled={columnIsFull}
			{...props}>
			{children}
		</button>
	)
}
