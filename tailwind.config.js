module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Ensures Tailwind scans all React files
    "./public/index.html"          // ✅ Ensures it scans your index.html
  ],
  theme: {
    extend: {
      screens: {
        'xxl': '1600px', // Adds a custom screen breakpoint
      },
      spacing: {
        '128': '32rem', // Adds a custom spacing value
      },
    },
  },
  plugins: [],
};

