/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        350: '350px',
        600: '600px'
        // 추가하고 싶은 높이 값들을 정의합니다.
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
