import {clsx, ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {CellValue} from './types'

export const cn = (...args: ClassValue[]) => {
	return twMerge(clsx(...args))
}

export enum CellState {
	EMPTY = 0,
	BLACK = 1,
	RED = 2,
	BLACK_WIN = 3,
	RED_WIN = 4,
}

export const cellBgColors = {
	0: 'bg-gray-300',
	1: 'bg-black',
	2: 'bg-red-500',
	3: 'bg-black',
	4: 'bg-red-500',
} as Record<CellValue, string>
