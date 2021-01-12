const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode,
  entry: './src/index',
  devtool: 'source-map',
  optimization: {
    minimize: mode === 'production',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'app_v2',
      library: { type: 'var', name: 'app_v2' },
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header',
      },
      // remotes: {
      //   'app_v1': 'app_v1',
      // },
      // shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
