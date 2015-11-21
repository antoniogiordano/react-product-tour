/**
 * Created by AntonioGiordano on 21/11/15.
 */

var path = require('path')
module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader'
      }
    ]
  }
}
