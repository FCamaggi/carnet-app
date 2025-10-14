/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'team-blue-start': '#0f62fe',
        'team-blue-end': '#2aa4ff',
        'team-red-start': '#ff4d4f',
        'team-red-end': '#ff9a8b',
      },
    },
  },
  plugins: [],
}
