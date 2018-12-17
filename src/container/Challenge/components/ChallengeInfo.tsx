import React from 'react'
import Typography from '@material-ui/core/Typography'
import { CheckCircle, MyLocation, Directions } from '@material-ui/icons'
import { styled } from '@material-ui/styles'
import ProgressChart from './ProgressChart'
import Podium from '@Src/images/podium.svg'
import css from '../Challenge.module.css'

const PodiumImg = styled('img')({
  width: 150
})

const StyledTypography1 = styled(Typography)({
  color: '#34314c'
})

const StyledTypography2 = styled(Typography)({
  color: '#ff7473'
})

const StyledTypography3 = styled(Typography)({
  color: '#47b8e0'
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
      <StyledTypography1 variant='h6' gutterBottom>
        <StyledIcon Icons={CheckCircle} />
        CompleteDays
      </StyledTypography1>
      <StyledTypography1 variant='subtitle1' gutterBottom>
        {completeDays}
      </StyledTypography1>
      <StyledTypography2 variant='h6' gutterBottom>
        <StyledIcon Icons={MyLocation} />
        TargetDays
      </StyledTypography2>
      <StyledTypography2 variant='subtitle1' gutterBottom>
        {targetDays}
      </StyledTypography2>
      <StyledTypography3 variant='h6' gutterBottom>
        <StyledIcon Icons={Directions} />
        TotalDays
      </StyledTypography3>
      <StyledTypography3 variant='subtitle1' gutterBottom>
        {totalDays}
      </StyledTypography3>
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
