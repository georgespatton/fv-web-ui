const path = require('path')

const frontend = path.resolve(__dirname, '..')
const appV2 = path.resolve(frontend, 'app_v2')
const src = path.resolve(appV2, 'src')

const output = path.resolve(appV2, 'public')
const outputScripts = path.join(output, 'scripts')
const outputFonts = path.join(output, 'fonts')
const outputImages = path.join(output, 'images')
const outputStyles = path.join(output, 'styles')

module.exports = {
  appV2,
  frontend,
  output,
  outputFonts,
  outputImages,
  outputScripts,
  outputStyles,
  src,
}
