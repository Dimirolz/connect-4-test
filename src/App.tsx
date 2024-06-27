import {useState} from 'react'

function App() {
	return (
		<div className="container flex h-screen items-center justify-center">
			<Board />
		</div>
	)
}

function Board() {
	const [winner, setWinner] = useState<'red' | 'black' | 'draw' | null>(null)
	const [currentPlayer, setCurrentPlayer] = useState<'red' | 'black'>('black')
  // @TODO: there is better design around '-win' prefix. I can do this with 3 bits
  // 000 - empty
  // 001 - black
  // 010 - red
  // 011 - black-win
  // 100 - red-win
	const [board, setBoard] = useState<('red' | 'black' | 'red-win' | 'black-win' | '')[][]>([
		['', '', '', '', '', '', ''],
		['', '', '', '', '', '', ''],
		['', '', '', '', '', '', ''],
		['', '', '', '', '', '', ''],
		['', '', '', '', '', '', ''],
		['', '', '', '', '', '', ''],
	])

	function handleCellClick(rowIndex: number, colIndex: number) {
		if (winner) return
		const newBoard = board.map((row) => [...row])
		newBoard[rowIndex][colIndex] = currentPlayer
		setBoard(newBoard)
		setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red')
		checkWinner(newBoard)
    checkDraw(newBoard)
	}

  function checkDraw(board: string[][]) {
    if (board.every(row => row.every(cell => cell !== ''))) {
      setWinner('draw')
    }
  }

	function drawWinnerCells(row: number, col: number, rowDir: number, colDir: number) {
		const newBoard = board.map((row) => [...row])
		for (let i = 0; i < 4; i++) {
			newBoard[row + i * rowDir][col + i * colDir] = (currentPlayer + '-win') as
				| 'black-win'
				| 'red-win'
		}
		setBoard(newBoard)
	}

	const checkWinner = (board: string[][]) => {
		const isConsecutiveFour = (c1: string, c2: string, c3: string, c4: string) => {
			return c1 && c1 === c2 && c1 === c3 && c1 === c4
		}

		const checkDirection = (row: number, col: number, rowDir: number, colDir: number) => {
			const cells = [
				board[row]?.[col],
				board[row + rowDir]?.[col + colDir],
				board[row + 2 * rowDir]?.[col + 2 * colDir],
				board[row + 3 * rowDir]?.[col + 3 * colDir],
			] as const

			if (isConsecutiveFour(...cells)) {
				setWinner(cells[0] as 'red' | 'black')
				drawWinnerCells(row, col, rowDir, colDir)
				return true
			}
			return false
		}

		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				if (
					checkDirection(row, col, 0, 1) || // Horizontal
					checkDirection(row, col, 1, 0) || // Vertical
					checkDirection(row, col, 1, 1) || // Diagonal (top-left to bottom-right)
					checkDirection(row, col, -1, 1) // Diagonal (bottom-left to top-right)
				) {
					return true
				}
			}
		}

    return false
	}

	function handleRestart() {
		setBoard(board.map(() => ['', '', '', '', '', '', '']))
		setCurrentPlayer('black')
		setWinner(null)
	}

  function getTitleMessage() {
    return winner === 'draw' ? 'Draw' :
    winner ? `Winner: ${winner}` :
    `Current Player: ${currentPlayer}`
  }

	return (
		<div>
			<div className="flex flex-col items-center">
				<h1 className="mb-4 text-2xl font-bold">
					{getTitleMessage()}
				</h1>
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

function Cell({
	value,
	disabled,
	...props
}: {
	value: 'red' | 'black' | 'red-win' | 'black-win' | ''
	onClick: () => void
	disabled: boolean
}) {
	const colors = {
		'': 'bg-gray-300',
		black: 'bg-black',
		red: 'bg-red-500',
		'black-win': 'bg-black',
		'red-win': 'bg-red-500',
	} as const

	const color = colors[value as keyof typeof colors]
	const hoverColor = value === '' ? 'bg-gray-400' : ''
	const cursor = value !== '' || disabled ? 'cursor-not-allowed' : 'cursor-pointer'

	return (
		<button className={`group h-12 w-12 ${cursor} p-[2px]`} {...props} disabled={value !== ''}>
			<div
				className={`h-full w-full rounded-full ${color} flex items-center justify-center group-hover:${hoverColor}`}>
				{(value === 'black-win' || value === 'red-win') && <span className="text-white">X</span>}
			</div>
		</button>
	)
}

export default App
