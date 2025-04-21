module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"         
  ],
  theme: {
    extend: {
      screens: {
        'xxl': '1600px',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

