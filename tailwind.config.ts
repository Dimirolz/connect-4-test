import {Config} from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			keyframes: {
				fall: {
					'0%': {transform: 'translateY(var(--start-y, -100%))'},
					'100%': {transform: 'translateY(0)'},
				},
			},
			animation: {
				fall: 'fall var(--fall-duration, 0.5s) linear',
			},
		},
	},
	plugins: [],
}

export default config
