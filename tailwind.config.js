module.exports = {
  content: [
    "./views/**/*.ejs", // ✅ for your templates
    "./public/**/*.js", // ✅ optional JS files if you use them
    "./partials/**/*.ejs", // ✅ if you store partials separately
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
