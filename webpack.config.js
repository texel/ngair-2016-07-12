module.exports = {

  entry: "./src/js/main.ts",
  output: {
    path: __dirname + "/bundles",
    filename: "app.bundle.js"
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  }
};