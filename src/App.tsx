import Board from './components/Board'

export default function App() {
	return (
		<div className="container flex h-screen flex-col items-center justify-center">
			<h1 className="mb-4 text-4xl font-bold">Connect Four</h1>
			<Board />
			<p className="mt-4 max-w-[350px] text-center text-sm text-gray-500">
				It’s the classic game you love to play with your friends and family. Can you connect four of
				your coloured disks by dropping them into the holder before your opponent does?
			</p>
		</div>
	)
}
