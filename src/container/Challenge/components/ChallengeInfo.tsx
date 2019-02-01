import React from 'react'
import styled from 'styled-components'
import {
  APP_LIGHT_BG,
  APP_FONT_COLOR_DARK,
  APP_THEME
} from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { formatPercent, formatNumber } from '@Src/utils'

const StyledFont = styled('span')({
  fontSize: '40px',
  color: APP_THEME,
  textAlign: 'center'
})

const StyledUnitFont = styled('span')({
  color: APP_FONT_COLOR_DARK,
  opacity: 0.6
})

const StyledContent = styled('div')({
  fontSize: 24,
  color: APP_FONT_COLOR_DARK,
  opacity: 0.6,
  margin: '10px',
  [`@media (max-width: ${breakPoint})`]: {
    fontSize: 20,
    lineHeight: '24px'
  }
})

const CrowdCtr = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center'
})

const InfoBlk = styled('div')({
  textAlign: 'center',
  background: APP_LIGHT_BG,
  padding: '0 10px',
  wordBreak: 'break-all'
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

const InfoTxt = styled('div')({
  color: APP_THEME,
  padding: 5,
  fontSize: 30,
  [`@media (max-width: ${breakPoint})`]: {
    fontSize: 24,
    lineHeight: '30px'
  }
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
  sponsorAmount: number
}

const { REACT_APP_COIN } = process.env

function ChallengeInfo({
  address,
  completeDays,
  targetDays,
  totalDays,
  amount,
  classes,
  intl,
  invalidAddress,
  sponsorAmount
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
            {completeDays}/{totalDays}
          </StyledFont>
          <StyledUnitFont> Days</StyledUnitFont>
        </Grid>
        <Grid>
          <CrowdCtr>
            <StyledUnitFont>Achieve </StyledUnitFont>
            <StyledFont>
              &nbsp;{formatPercent(completeDays, totalDays)}
            </StyledFont>
          </CrowdCtr>
        </Grid>
      </StyledInfoCtr>
      <StyledContent>
        {intl.formatMessage({ id: 'sponsorContent' })}
      </StyledContent>
      <InfoTxt>
        {intl.formatMessage(
          { id: 'challengeDesc' },
          { rate: formatPercent(targetDays, totalDays) }
        )}
        <Tooltip
          title={`${formatNumber(
            amount
          )} ${REACT_APP_COIN} from bet , ${formatNumber(
            sponsorAmount
          )} ${REACT_APP_COIN} from sponsor`}
          placement='top'
          classes={{ tooltip: classes.lightTooltip }}
        >
          <span style={{ fontSize: '30px' }}>
            {' '}
            {formatNumber(amount + sponsorAmount)}
            {REACT_APP_COIN}
          </span>
        </Tooltip>
      </InfoTxt>
    </InfoBlk>
  )
}

export default withStyles(styles)(injectIntl(ChallengeInfo))
