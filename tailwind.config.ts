import {Config} from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
    container: {
      center: true,
		},
		extend: {},
	},
	plugins: [],
}

export default config
