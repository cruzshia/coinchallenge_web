import React from 'react'
import styled from 'styled-components'
import {
  APP_LIGHT_BG,
  APP_FONT_COLOR_DARK,
  APP_THEME
} from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { formatPercent } from '@Src/utils'

const StyledFont = styled('span')({
  fontSize: '40px',
  fontWeight: 700,
  color: APP_THEME,
  textAlign: 'center'
})

const StyledUnitFont = styled('span')({
  fontSize: 14,
  color: APP_FONT_COLOR_DARK,
  opacity: 0.6,
  wordBreak: 'keep-all'
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
    fontSize: 16,
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

const styles = (_theme: any) => ({
  lightTooltip: {
    fontSize: 20
  }
})

const Address = styled('div')({
  color: 'rgba(0, 0, 0, 0.4)',
  padding: '10px 0'
})

const Amount = styled('div')({
  fontSize: 40,
  fontWeight: 700,
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
      font-size: 28px;
      word-break: keep-all;
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
  targetDays,
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
              &nbsp;{formatPercent(completeDays, totalDays)}
            </StyledFont>
          </CrowdCtr>
        </Grid>
      </StyledInfoCtr>
      <StyledContent>
        {intl.formatMessage({ id: 'completeDesc' }, { targetDays })}
      </StyledContent>
      <StyledContent>
        {intl.formatMessage({ id: 'sponsorContent' })}
      </StyledContent>
    </InfoBlk>
  )
}

export default withStyles(styles)(injectIntl(ChallengeInfo))
