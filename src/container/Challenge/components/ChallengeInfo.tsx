import React from 'react'
import { CheckCircle, Directions } from '@material-ui/icons'
import styled from 'styled-components'
import ProgressChart from './ProgressChart'
import { Wave } from 'react-animated-text'
import DonateImg from '@Src/images/donation-white.svg'
import Podium from '@Src/images/podium.svg'
import css from '../Challenge.module.css'
import { APP_THEME_BACKGROUND, APP_FONT_COLOR } from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import { injectIntl, InjectedIntlProps } from 'react-intl'

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

const CrowdCtr = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const StyledText = styled('span')({
  color: '#fff',
  fontSize: '60px',
  textAlign: 'center'
})

interface InfoCtrProp {
  bgcolor?: string
}
const StyledInfoCtr = styled('div')<InfoCtrProp>`
  display: flex;
  background: ${(props: InfoCtrProp) =>
    props.bgcolor ? props.bgcolor : APP_THEME_BACKGROUND};
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakPoint}) {
    flex-direction: column;
  }
`
const Grid = styled('div')({
  width: '50%',
  paddingBottom: '10px',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%'
  }
})
interface ChallengeInfoProp extends InjectedIntlProps {
  completeDays: number
  targetDays: number
  totalDays: number
  percent: number
}

function ChallengeInfo({
  completeDays,
  targetDays,
  totalDays,
  percent,
  intl
}: ChallengeInfoProp) {
  return (
    <StyledInfoCtr>
      <Grid>
        <StyledFont>
          <StyledIcon Icons={CheckCircle} />
          {intl.formatMessage({ id: 'completeDays' })}: {completeDays}
        </StyledFont>
        <StyledFont>
          <StyledIcon Icons={Directions} />
          {intl.formatMessage({ id: 'targetDays' })}: {targetDays}
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
      </Grid>
      <Grid>
        <CrowdCtr>
          <img src={DonateImg} width='50%' />
          <StyledText>
            +
            <Wave text='5000' speed={2} />
          </StyledText>
        </CrowdCtr>
      </Grid>
    </StyledInfoCtr>
  )
}

export default injectIntl(ChallengeInfo)
