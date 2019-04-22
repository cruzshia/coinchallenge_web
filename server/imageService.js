const Jimp = require('jimp')
const path = require('path')

const resourceDir = path.join(__dirname, './resource/')

const translation = {
  en: require('../dist/translation/en.json'),
  'zh-TW': require('../dist/translation/zh-TW.json'),
  'zh-CN': require('../dist/translation/zh-CN.json')
}

const sourceTpl = {}
let logoSource

let fonts = {
  'ZH-TW': {},
  'ZH-CN': {},
  EN: {}
}
let FONT_WHITE_16

let initialized = false

export const imageDir = path.join(__dirname, './share/')

const initTpl = async () => {
  if (initialized) {
    return
  }
  for (let i = 1; i < 4; i++) {
    sourceTpl[i.toString()] = await Jimp.read(resourceDir + `${i}.jpg`)
  }
  logoSource = await Jimp.read(path.join(__dirname, '../dist/images/logo.png'))
  fonts['EN']['FONT_BLACK_64'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_64_EN/font.fnt'
  )
  fonts['EN']['FONT_BLACK_32'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_32_EN/font.fnt'
  )

  fonts['ZH-TW']['FONT_BLACK_64'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_64_ZH-TW/font.fnt'
  )
  fonts['ZH-TW']['FONT_BLACK_32'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_32_ZH-TW/font.fnt'
  )

  fonts['ZH-CN']['FONT_BLACK_64'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_64_ZH-CN/font.fnt'
  )
  fonts['ZH-CN']['FONT_BLACK_32'] = await Jimp.loadFont(
    resourceDir + 'fonts/BLACK_32_ZH-CN/font.fnt'
  )
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
  maxWidth: 540,
  maxHeight: 30,
  placementX: 80,
  placementY: 482
}
let textConfig = {
  maxWidth: 520,
  maxHeight: 30,
  placementX: 10,
  placementY: 20
}

exports.generateImage = async ({ challengeData, isPreview, cbk, errorCbk }) => {
  await initTpl()
  const { groupId, challenger, round } = challengeData

  let lng = challengeData.lng || 'en'
  let isEn = lng === 'en'
  let isCN = lng === 'zh-CN'
  let translate = translation[lng]
  if (!translate) {
    translate = translation['en']
    lng = 'en'
    isEn = true
  }

  lng = lng.toUpperCase()

  const imageName = `${chain}/${groupId}/${challenger}/${round}-${lng}.png`
  let hasImage = false
  try {
    const image = await Jimp.read(`${imageDir}${imageName}`)
    if (image) {
      image.quality(100)['getBuffer'](Jimp.MIME_PNG, (err, data) => {
        if (!err) {
          hasImage = true
          cbk && cbk(data)
        }
      })
    }
  } catch (error) {
    console.log('generate share image', imageName)
  }

  if (hasImage) return

  const cloneSourceTpl = sourceTpl[String(groupId)].clone()

  const logo = await logoSource.clone().resize(60, 60)
  cloneSourceTpl.composite(logo, 10, 470, [Jimp.BLEND_DESTINATION_OVER])

  printText(
    cloneSourceTpl,
    FONT_WHITE_16,
    challenger,
    addressFontConfig,
    Jimp.HORIZONTAL_ALIGN_LEFT
  )

  printText(
    cloneSourceTpl,
    fonts[lng].FONT_BLACK_32,
    translate[`group.title.${challengeData.groupId}`],
    textConfig
  )
  printText(
    cloneSourceTpl,
    fonts[lng].FONT_BLACK_32,
    translate[`group.unit.${challengeData.groupId}`].replace(
      '{goal}',
      challengeData.goal
    ) +
      (isEn || isCN ? ' / ' : '/') +
      challengeData.totalDays +
      (isEn ? ' ' : '') +
      translate[`days`],
    {
      ...textConfig,
      placementY: textConfig.placementY + 40
    }
  )

  printText(cloneSourceTpl, fonts[lng].FONT_BLACK_64, challengeData.amount, {
    ...textConfig,
    placementY: textConfig.placementY + 95
  })

  const method = isPreview ? 'getBuffer' : 'getBase64'
  cloneSourceTpl.write(`${imageDir}${imageName}`)
  cloneSourceTpl[method](Jimp.MIME_PNG, (err, data) => {
    if (err) {
      errorCbk && errorCbk(err)
    } else {
      cbk && cbk(data)
    }
  })
}
