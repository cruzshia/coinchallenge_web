import React from 'react'
import Typography from '@material-ui/core/Typography'
import { CheckCircle, MyLocation, Directions } from '@material-ui/icons'
import { styled } from '@material-ui/styles'
import ProgressChart from './ProgressChart'
import Podium from '@Src/images/podium.svg'
import css from '../Challenge.module.css'

const { REACT_APP_FONT_COLOR } = process.env

const PodiumImg = styled('img')({
  width: 150
})

const StyledTypography = styled(Typography)({
  color: REACT_APP_FONT_COLOR
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
      <StyledTypography variant='h6' gutterBottom>
        <StyledIcon Icons={CheckCircle} />
        CompleteDays
      </StyledTypography>
      <StyledTypography variant='subtitle1' gutterBottom>
        {completeDays}
      </StyledTypography>
      <StyledTypography variant='h6' gutterBottom>
        <StyledIcon Icons={MyLocation} />
        TargetDays
      </StyledTypography>
      <StyledTypography variant='subtitle1' gutterBottom>
        {targetDays}
      </StyledTypography>
      <StyledTypography variant='h6' gutterBottom>
        <StyledIcon Icons={Directions} />
        TotalDays
      </StyledTypography>
      <StyledTypography variant='subtitle1' gutterBottom>
        {totalDays}
      </StyledTypography>
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
