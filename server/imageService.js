const Jimp = require('jimp')
const path = require('path')

const sourceTpl = {}
let initialized = false

const initTpl = async () => {
  if (initialized) {
    return
  }
  for (let i = 1; i < 4; i++) {
    sourceTpl[i.toString()] = await Jimp.read(
      path.join(__dirname, `../resource/${i}.jpg`)
    )
  }
  initialized = true
}

function printText(tpl, font, text, textConfig, Align) {
  tpl.print(
    font,
    textConfig.placementX,
    textConfig.placementY,
    {
      text,
      alignmentX: Align || Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    },
    textConfig.maxWidth,
    textConfig.maxHeight
  )
}

exports.generateImage = async group => {
  await initTpl()
  const cloneSourceTpl = sourceTpl[String(group)]
}
