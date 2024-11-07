module.exports = {
  content: [
    "./components/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/*.vue",
    "./layouts/**/*.vue",
    "./pages/*/*.vue",
    "./pages/**/*.vue",
    "./pages/**/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
