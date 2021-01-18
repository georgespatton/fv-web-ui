const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  // TODO: Below is for dual bundles
  // https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
  // https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility
  // output: {
  //   filename: 'main.es5.js',
  //   // path: path.resolve(__dirname, 'public'),
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,
  //       loader: require.resolve('babel-loader'),
  //       options: {
  //         presets: [
  //           require.resolve('@babel/preset-react'),
  //           [
  //             '@babel/env',
  //             {
  //               modules: false,
  //               useBuiltIns: 'entry',
  //               corejs: 3,
  //               targets: {
  //                 browsers: [
  //                   '> 1%',
  //                   'last 2 versions',
  //                   'Firefox ESR',
  //                 ],
  //               },
  //             },
  //           ],
  //         ],
  //       },
  //     },
  //   ],
  // },
})
