var ExtractTextPlugin = require('extract-text-webpack-plugin');

// in the webpack config


module.exports = {
  entry: [
    './app/src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'app/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    // { test: /\.css$/, loader: "style-loader!css-loader" }
    // {
    //   test: /\.css$/, loader: ExtractTextPlugin.extract({
    //     fallbackLoader: "style-loader",
    //     loader: "css-loader"
    //   })
    // }

    { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
};
