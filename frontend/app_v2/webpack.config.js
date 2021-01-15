const alias = require('./webpack.alias')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

const config = {
  entry: './src/index',
  resolve: {
    alias: alias,
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
      {
        test: /\.css$/i,
        use: ['style-loader', { loader: 'css-loader', options: { import: true } }, 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_v2',
      library: { type: 'var', name: 'app_v2' },
      filename: 'remoteEntry.js',
      exposes: {
        './HeaderContainer': 'components/Header/HeaderContainer',
      },
      remotes: {
        app_v1: 'app_v1',
      },
      // shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
    }
  }

  return config
}
