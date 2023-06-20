/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: [
		"./src/**/*.{html,js}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// backgroundImage: {
			//   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			//   'gradient-conic':
			//     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			// },
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					md: "1.5rem",
					lg: "2rem",
				},
			},
			fontSize: {
				sm: "0.8rem",
				base: "1rem",
				xl: "1.25rem",
				"2xl": "1.563rem",
				"3xl": "1.953rem",
				"4xl": "2.441rem",
				"5xl": "3.052rem",
			},
			colors: {
				background: "#100f0f",
				white: "#fff",
				edit: "#1d4ed8",
				delete: "#dc2626",
				nav: "#735f32",
			},
		},
	},
	plugins: [],
});
