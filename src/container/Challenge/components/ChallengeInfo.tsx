import React from 'react'
import { CheckCircle, Directions } from '@material-ui/icons'
import styled from 'styled-components'
import ProgressChart from './ProgressChart'
import { APP_LIGHT_BG, APP_FONT_COLOR_DARK } from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { GradientFont } from '@Components/Styled/Common'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles, WithStyles } from '@material-ui/core/styles'

const StyledFont = styled('div')({
  fontSize: '20px',
  color: APP_FONT_COLOR_DARK,
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

const InfoBlk = styled('div')({
  textAlign: 'center',
  background: APP_LIGHT_BG
})
interface InfoCtrProp {
  bgcolor?: string
}
const StyledInfoCtr = styled('div')<InfoCtrProp>`
  display: flex;
  background: ${(props: InfoCtrProp) =>
    props.bgcolor ? props.bgcolor : APP_LIGHT_BG};
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakPoint}) {
    flex-direction: column;
  }
`
const Grid = styled('div')({
  width: '50%',
  padding: '10px 0',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%'
  }
})

const InfoTxt = styled(GradientFont('div'))({
  padding: 5,
  fontSize: 30
})

const styles = (_theme: any) => ({
  lightTooltip: {
    fontSize: 20
  }
})

const Address = styled('div')({
  background: '#fff',
  color: 'rgba(0, 0, 0, 0.4)',
  padding: '10px 0'
})

const Amount = styled('div')({
  fontSize: 40,
  padding: '10px 0'
})
interface ChallengeInfoProp extends InjectedIntlProps, WithStyles {
  address: string
  completeDays: number
  targetDays: number
  totalDays: number
  amount: number
  invalidAddress: boolean
}

const { REACT_APP_COIN } = process.env

function ChallengeInfo({
  address,
  completeDays,
  targetDays,
  totalDays,
  amount,
  intl,
  classes,
  invalidAddress
}: ChallengeInfoProp) {
  return (
    <InfoBlk>
      <Address>{invalidAddress ? '--' : address}</Address>
      <Amount>
        {amount} {REACT_APP_COIN}
      </Amount>
      <StyledInfoCtr>
        <Grid>
          <StyledFont>
            <StyledIcon Icons={CheckCircle} />
            {intl.formatMessage({ id: 'completeDays' })}: {completeDays}
          </StyledFont>
          <StyledFont>
            <StyledIcon Icons={Directions} />
            {intl.formatMessage({ id: 'totalDays' })}: {totalDays}
          </StyledFont>
        </Grid>
        <Grid>
          <CrowdCtr>
            <ProgressChart
              style={{ margin: '0 auto' }}
              width={100}
              height={100}
              value={totalDays ? (completeDays / totalDays) * 100 : 0}
            />
          </CrowdCtr>
        </Grid>
      </StyledInfoCtr>

      <InfoTxt>
        Complete rate grater than{' '}
        {totalDays ? ((targetDays / totalDays) * 100).toFixed(2) + '% ' : '-- '}
        can get{' '}
        <Tooltip
          title={`${amount} from bet , 0 from sponsor`}
          placement='top'
          classes={{ tooltip: classes.lightTooltip }}
        >
          <span style={{ fontSize: '30px' }}>
            {amount}
            {REACT_APP_COIN}
          </span>
        </Tooltip>
      </InfoTxt>
    </InfoBlk>
  )
}

export default withStyles(styles)(injectIntl(ChallengeInfo))
