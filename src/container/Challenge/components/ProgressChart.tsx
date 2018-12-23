import React from 'react'
import LiquidFillGauge from 'react-liquid-gauge'
import { APP_FONT_COLOR } from '@Src/contants/themeColor'
interface ChartProp {
  width: number
  height: number
  value: number
  style?: object
  percent?: string
  riseAnimation?: boolean
  waveAnimation?: boolean
  waveFrequency?: number
  waveAmplitude?: number
  fillColor?: string
}

function getColor(value: number) {
  let colorPlate = {
    fillColor: APP_FONT_COLOR,
    fontColor: APP_FONT_COLOR
  }
  return colorPlate
}

const ProgressChart = function(props: ChartProp) {
  const plate = getColor(props.value)
  return (
    <LiquidFillGauge
      {...props}
      textRenderer={(props: any) => {
        const value = Math.round(props.value)
        const radius = Math.min(props.height / 2, props.width / 2)
        const textPixels = (props.textSize * radius) / 2
        const valueStyle = {
          fontSize: textPixels
        }
        const percentStyle = {
          fontSize: textPixels * 0.6
        }

        return (
          <tspan>
            <tspan className='value' style={valueStyle}>
              {value}
            </tspan>
            <tspan style={percentStyle}>{props.percent}</tspan>
          </tspan>
        )
      }}
      gradient
      circleStyle={{
        fill: plate.fillColor
      }}
      waveStyle={{
        fill: plate.fillColor
      }}
      textStyle={{
        fill: plate.fontColor,
        fontFamily: 'Arial'
      }}
      waveTextStyle={{
        fill: plate.fontColor,
        fontFamily: 'Arial'
      }}
    />
  )
}

ProgressChart.defaultProps = {
  percent: '%',
  riseAnimation: true,
  waveAnimation: true,
  waveFrequency: 1,
  waveAmplitude: 3,
  fillColor: '#000000'
}
export default ProgressChart