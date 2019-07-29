const path = require('path');

module.exports = {
  mode: 'development',
  entry: './map_widget.js',
  watch: false,
  output: {
    path: path.resolve(__dirname, '../../work/scripts'),
    filename: 'map_widget.js'
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};
