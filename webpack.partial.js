const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "S3_URL": JSON.stringify(process.env.S3_URL)
    })
  ]
};
