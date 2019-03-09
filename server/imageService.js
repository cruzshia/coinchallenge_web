const Jimp = require('jimp')
const path = require('path')

const translation = {
  en: require('../dist/translation/en.json'),
  'zh-TW': require('../dist/translation/zh_TW.json'),
  'zh-CN': require('../dist/translation/zh_CN.json')
}

// const img = await Jimp.read(ipImg)
//       await img.resize(192, 192).blur(20)
//       cloneSourceTpl.composite(img, 650, 412, [Jimp.BLEND_DESTINATION_OVER])
const sourceTpl = {}
let logoSource
let FONT_BLACK_64
let FONT_BLACK_32
let FONT_WHITE_16

let initialized = false

const initTpl = async () => {
  if (initialized) {
    return
  }
  for (let i = 1; i < 4; i++) {
    sourceTpl[i.toString()] = await Jimp.read(
      path.join(__dirname, `./resource/${i}.jpg`)
    )
  }
  logoSource = await Jimp.read(path.join(__dirname, '../dist/images/logo.png'))
  FONT_BLACK_64 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
  FONT_BLACK_32 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
  FONT_WHITE_16 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
  initialized = true
}

initTpl()

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

let addressFontConfig = {
  maxWidth: 520,
  maxHeight: 30,
  placementX: 0,
  placementY: 480
}
let textConfig = {
  maxWidth: 520,
  maxHeight: 30,
  placementX: 10,
  placementY: 40
}

exports.generateImage = async ({ challengeData, isPreview, cbk, errorCbk }) => {
  await initTpl()
  const cloneSourceTpl = sourceTpl[String(challengeData.groupId)].clone()
  const translate = translation['en']

  const logo = await logoSource.clone().resize(60, 60)
  cloneSourceTpl.composite(logo, 460, 420, [Jimp.BLEND_DESTINATION_OVER])

  printText(
    cloneSourceTpl,
    FONT_WHITE_16,
    challengeData.challenger,
    addressFontConfig,
    Jimp.HORIZONTAL_ALIGN_RIGHT
  )

  printText(cloneSourceTpl, FONT_BLACK_64, challengeData.groupName, textConfig)
  printText(
    cloneSourceTpl,
    FONT_BLACK_32,
    translate['target'] +
      ' ' +
      translate[`group.unit.${challengeData.groupId}`].replace(
        '{goal}',
        challengeData.goal
      ),
    {
      ...textConfig,
      placementY: textConfig.placementY + 55
    }
  )

  printText(
    cloneSourceTpl,
    FONT_BLACK_32,
    translate['amount'] + ' ' + challengeData.amount,
    {
      ...textConfig,
      placementY: textConfig.placementY + 90
    }
  )

  const method = isPreview ? 'getBuffer' : 'getBase64'
  cloneSourceTpl.quality(100)[method](Jimp.MIME_PNG, (err, data) => {
    if (err) {
      errorCbk && errorCbk(err)
    } else {
      cbk && cbk(data)
    }
  })
}
