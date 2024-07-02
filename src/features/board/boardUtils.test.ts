import {describe, expect, it} from 'vitest'
import {checkWin, findEmptyCellInCol, isDraw, markCells} from './boardUtils'

describe('boardUtils', () => {
	describe('checkWin', () => {
		it('should return true for a winning horizontal line', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[1, 1, 1, 1, 0, 0, 0],
			]
			expect(checkWin(board, 1, 5, 0)).toEqual({
				isWin: true,
				rowDir: 0,
				colDir: 1,
			})
		})

		it('should return true for a winning horizontal line when starting from the middle', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[1, 1, 1, 1, 0, 0, 0],
			]
			expect(checkWin(board, 1, 5, 2)).toEqual({
				isWin: true,
				rowDir: 0,
				colDir: 1,
			})
		})

		it('should return true for a winning vertical line', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0],
			]
			expect(checkWin(board, 1, 5, 0)).toEqual({
				isWin: true,
				rowDir: 1,
				colDir: 0,
			})
		})

		it('should return true for a winning left diagonal line', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 0, 0, 1],
			]
			expect(checkWin(board, 1, 5, 6)).toEqual({
				isWin: true,
				rowDir: 1,
				colDir: 1,
			})
		})

		it('should return true for a winning right diagonal line', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
				[0, 0, 1, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0],
			]
			expect(checkWin(board, 1, 5, 0)).toEqual({
				isWin: true,
				rowDir: 1,
				colDir: -1,
			})
		})

		it('should return false for no winning line', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[1, 1, 0, 1, 0, 0, 0],
			]
			expect(checkWin(board, 1, 5, 0)).toEqual({
				isWin: false,
			})
		})
	})
	describe('isDraw', () => {
		it('should return true for a draw', () => {
			const board = [
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
			]
			expect(isDraw(board)).toBe(true)
		})

		it('should return false for a non-draw', () => {
			const board = [
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 0],
			]
			expect(isDraw(board)).toBe(false)
		})
	})
	describe('findEmptyCellInCol', () => {
		it('should return the correct row index for an empty cell in a column', () => {
			const board = [
				[1, 2, 1, 2, 1, 2, 0],
				[2, 1, 2, 1, 2, 1, 0],
				[1, 2, 1, 2, 1, 2, 0],
				[2, 1, 2, 1, 2, 1, 3],
				[1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1],
			]
			expect(findEmptyCellInCol(board, 6)).toBe(2)
		})

		it('should return -1 if the column is full', () => {
			const board = [
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2],
			]
			expect(findEmptyCellInCol(board, 6)).toBe(-1)
		})
	})

	describe('markCells', () => {
		it('should mark the correct cells with the winCellValue', () => {
			const board = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 2, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0],
			]
			const expectedBoard = [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 2, 0, 0, 0],
				[0, 0, 0, 3, 0, 0, 0],
				[0, 0, 0, 3, 0, 0, 0],
				[0, 0, 0, 3, 0, 0, 0],
				[0, 0, 0, 3, 0, 0, 0],
			]
			markCells({
				board,
				cellValue: 1,
				winCellValue: 3,
				row: 5,
				col: 3,
				rowDir: 1,
				colDir: 0,
			})
			expect(board).toEqual(expectedBoard)
		})
	})
})
