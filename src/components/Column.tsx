import {makeTurn} from '../features/board/boardSlice'
import {useAppDispatch, useAppSelector} from '../hooks'
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
			className={cn('flex flex-col gap-1 px-[2px] py-2 first:pl-2 last:pr-2', className, {
				'hover:bg-[#bdc1c8]': !columnIsFull,
			})}
			onClick={() => dispatch(makeTurn({col}))}
			disabled={columnIsFull}
			{...props}>
			{children}
		</button>
	)
}
