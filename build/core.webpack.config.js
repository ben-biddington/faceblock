var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'core', 'application.js'),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'faceblock.core.bundle.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'core',
  },
  stats: 'errors-only'
};