import Board from './components/Board'

export default function App() {
	return (
		<div className="container flex flex-col h-screen items-center justify-center">
			<h1 className="text-4xl font-bold mb-4">Connect Four</h1>
			<Board />
			<p className="text-center text-sm text-gray-500 mt-4 max-w-[350px]">
				It’s the classic game you love to play with your friends and family. Can you connect four of
				your coloured disks by dropping them into the holder before your opponent does?
			</p>
		</div>
	)
}
