import React from 'react'
import { CheckCircle, Directions } from '@material-ui/icons'
import styled from 'styled-components'
import ProgressChart from './ProgressChart'
import Podium from '@Src/images/podium.svg'
import css from '../Challenge.module.css'
import { APP_FONT_COLOR } from '@Src/contants/themeColor'

const PodiumImg = styled('img')({
  width: 150
})

const StyledFont = styled('div')({
  fontSize: '20px',
  color: APP_FONT_COLOR,
  textAlign: 'center',
  margin: '10px 0'
})

function StyledIcon({ Icons }: { Icons: React.ComponentType }) {
  const NewStyledIcon = styled(Icons)({
    verticalAlign: 'middle',
    margin: '0 5px 4px 0'
  })
  return <NewStyledIcon />
}

interface ChallengeInfoProp {
  completeDays: number
  targetDays: number
  totalDays: number
  percent: number
}

function ChallengeInfo({
  completeDays,
  targetDays,
  totalDays,
  percent
}: ChallengeInfoProp) {
  return (
    <div>
      <StyledFont>
        <StyledIcon Icons={CheckCircle} />
        CompleteDays: {completeDays}
      </StyledFont>
      <StyledFont>
        <StyledIcon Icons={Directions} />
        TargetDays: {targetDays}
      </StyledFont>
      {percent === 100 ? (
        <PodiumImg src={Podium} className={css.jumpAnimation} />
      ) : (
        <ProgressChart
          style={{ margin: '0 auto' }}
          width={160}
          height={160}
          value={percent}
        />
      )}
    </div>
  )
}

export default ChallengeInfo
