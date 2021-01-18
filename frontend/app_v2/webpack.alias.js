const path = require('path')
const paths = require('./webpack.paths')
const src = paths.src
const appV2 = paths.appV2

module.exports = {
  components: path.resolve(src, 'components'),
  assets: path.resolve(appV2, 'public', 'assets'),
  //   common: path.resolve(src, 'common'),
  //   qa: path.resolve(src, 'qa'),
  //   state: sourceStateDirectory,
  //   dataSources: path.resolve(sourceStateDirectory, 'dataSources'),
  //   operations: path.resolve(sourceStateDirectory, 'operations'),
  //   reducers: path.resolve(sourceStateDirectory, 'reducers'),
  //   images: sourceImagesDirectory,
  //   styles: sourceStylesDirectory,
}
