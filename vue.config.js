const path = require('path');

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Medical Test Calculator',
    },
  },
  outputDir: path.resolve(__dirname, 'docs'),
}
