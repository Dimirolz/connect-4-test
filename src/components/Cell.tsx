import {CellValue} from '../types'
import {cellBgColors, cellState} from '../utils'

export default function Cell({
	value,
	disabled,
	...props
}: {
	value: CellValue
	onClick: () => void
	disabled: boolean
}) {
	const color = cellBgColors[value]
	const hoverColor = value === cellState.EMPTY ? 'bg-gray-400' : ''
	const cursor = value !== cellState.EMPTY || disabled ? 'cursor-not-allowed' : 'cursor-pointer'

	return (
		<button
			className={`group h-12 w-12 ${cursor} p-[2px]`}
			{...props}
			disabled={value !== cellState.EMPTY}>
			<div
				className={`h-full w-full rounded-full ${color} flex items-center justify-center group-hover:${hoverColor}`}>
				{(value === cellState.BLACK_WIN || value === cellState.RED_WIN) && (
					<span className="text-white">X</span>
				)}
			</div>
		</button>
	)
}
