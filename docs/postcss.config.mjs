// PostCSS configuration specifically for docs
// This ensures we don't inherit parent PostCSS config
export default {
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
  },
}
