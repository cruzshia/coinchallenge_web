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
  fontSize: 16,
  color: APP_FONT_COLOR_DARK,
  opacity: 0.6,
  margin: '10px auto',
  lineHeight: '24px',
  textAlign: 'left',
  maxWidth: '80%',
  [`@media (max-width: ${breakPoint})`]: {
    fontSize: 20,
    lineHeight: '24px',
    maxWidth: '100%'
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
    lineHeight: '30px',
    wordBreak: 'break-word'
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

const StyledInfoCtr = styled('div')<InfoCtrProp>`
  display: flex;
  background: ${(props: InfoCtrProp) =>
    props.bgcolor ? props.bgcolor : APP_LIGHT_BG};
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakPoint}) {
    ${StyledFont} {
      font-size: 32px;
    }
  }
`
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
  totalDays,
  amount,
  intl,
  invalidAddress
}: ChallengeInfoProp) {
  return (
    <InfoBlk>
      <Address>{invalidAddress ? '--' : address}</Address>
      <Amount>
        {Number(amount)} {REACT_APP_COIN}
      </Amount>
      <StyledInfoCtr>
        <Grid>
          <StyledFont>
            {completeDays}/{totalDays}
          </StyledFont>
          <StyledUnitFont> {intl.formatMessage({ id: 'days' })}</StyledUnitFont>
        </Grid>
        <Grid>
          <CrowdCtr>
            <StyledUnitFont>
              {intl.formatMessage({ id: 'achieve' })}{' '}
            </StyledUnitFont>
            <StyledFont>
              &nbsp;{Number(formatPercent(completeDays, totalDays))}
            </StyledFont>
          </CrowdCtr>
        </Grid>
      </StyledInfoCtr>
      <StyledContent>
        {intl.formatMessage({ id: 'sponsorContent' })}
      </StyledContent>
    </InfoBlk>
  )
}

export default withStyles(styles)(injectIntl(ChallengeInfo))
