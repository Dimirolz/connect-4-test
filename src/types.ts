import {CellState} from './utils'

export type CellValue = (typeof CellState)[keyof typeof CellState]
