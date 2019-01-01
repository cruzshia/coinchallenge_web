import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Contract from 'web3/eth/contract'
import { ChallengeGroupType } from '@Src/typing/globalTypes'
import Logo from '@Src/images/logo.png'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { newChallengeGroup } from '@Epics/challengeGroupEpic/action'
import { checkWallet } from '@Epics/commonEpic/action'
import { CommonStateType } from '@Reducers/commonReducer'
import { ChallengeGroupStateType } from '@Reducers/challengeGroupReducer'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { APP_THEME } from '@Src/contants/themeColor'

const Form = styled('form')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  '.textField': {
    background: '#fff',
    zIndex: 1,
    '&:focus label': {
      color: `${APP_THEME} !important`
    }
  },
  '.button': {
    backgroundColor: APP_THEME,
    color: '#fff',
    padding: '0 40px',
    '&:hover': {
      backgroundColor: APP_THEME,
      opacity: 0.9
    }
  }
})

const Styles = {
  marginTop: '30px',
  minWidth: '400px',
  '@media only screen and (maxWidth: 480px)': {
    width: '95%',
    minWidth: '0'
  }
}

const Icon = styled('img')({
  margin: '20px 0',
  maxWidth: '200px',
  zIndex: 1
})

const LabelTxt = styled('span')({
  fontSize: '20px'
})

const WaitingBlk = styled('div')({
  zIndex: 1,
  '.progress': {
    width: '100%',
    margin: '15px 0'
  }
})

function Label({ text }: { text: string }) {
  return <LabelTxt>{text}</LabelTxt>
}

type CreateChallengeGroupProp = {
  contract: Contract | null
  isConfirming: boolean
  txHash?: string
  createResult: ChallengeGroupStateType
  newChallengeGroup: (payload: ChallengeGroupType) => void
  checkWallet: () => void
}

type ErrorProp = { [s in keyof ChallengeGroupType]?: boolean }
type StateProp = {
  challengeGroup: ChallengeGroupType
  error: ErrorProp
}

const mapStateToProps = (state: Map<string, object>) => {
  const commonReducer = state.get('common') as CommonStateType
  return {
    contract: commonReducer.get('contract'),
    isConfirming: commonReducer.get('isConfirming'),
    txHash: commonReducer.get('txHash'),
    createResult: state.get('challengeGroup') as ChallengeGroupStateType
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkWallet: () => dispatch(checkWallet()),
  newChallengeGroup: (payload: ChallengeGroupType) => {
    dispatch(
      newChallengeGroup({
        ...payload,
        dispatch
      })
    )
  }
})

class CreateChallengeGroup extends React.Component<
  CreateChallengeGroupProp & InjectedIntlProps,
  StateProp
> {
  static LabelProp = {
    shrink: true
  }

  public state = {
    challengeGroup: {
      id: '',
      name: '',
      url: '',
      minDays: '',
      maxDays: '',
      maxDelayDays: '',
      minAmount: ''
    } as ChallengeGroupType,
    error: {} as ErrorProp
  }

  private onDayChange = (key: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[key] = val
    const numVal = Number(val)
    error[key] = !(numVal >= 12 && numVal <= 90)
    if (key === 'maxDays') {
      error[key] = !error[key] && numVal < Number(challengeGroup.minDays)
    }
    this.setState({
      challengeGroup: { ...challengeGroup },
      error: { ...error }
    })
  }

  private onDelayDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup.maxDelayDays = val
    error.maxDelayDays = !(Number(val) >= 0 && Number(val) <= 90)
    this.setState({
      challengeGroup: { ...challengeGroup },
      error: { ...error }
    })
  }

  private onChange = (field: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup } = this.state
    challengeGroup[field] = val
    this.setState({
      challengeGroup
    })
  }

  private onSubmit = () => {
    this.props.checkWallet()
    this.props.newChallengeGroup(this.state.challengeGroup)
  }

  public render() {
    const { challengeGroup, error } = this.state
    const { intl, isConfirming, txHash } = this.props

    return (
      <Form noValidate autoComplete='off'>
        <Icon src={Logo} />
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupId' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          placeholder='e.g: com.coin.challenge'
          value={challengeGroup.id}
          onChange={this.onChange('id')}
          error={error.id}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupName' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          value={challengeGroup.name}
          onChange={this.onChange('name')}
          error={error.name}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupCover' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          value={challengeGroup.url}
          onChange={this.onChange('url')}
          error={error.url}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'minChallengeDays' })} />
          }
          className='textField'
          type='number'
          margin='normal'
          variant='outlined'
          placeholder='12 - 90'
          value={challengeGroup.minDays}
          error={error.minDays}
          onChange={this.onDayChange('minDays')}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />

        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'maxChallengeDays' })} />
          }
          className='textField'
          type='number'
          margin='normal'
          variant='outlined'
          value={challengeGroup.maxDays}
          error={error.maxDays}
          onChange={this.onDayChange('maxDays')}
          placeholder='12 - 90'
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />

        <TextField
          label={<Label text={intl.formatMessage({ id: 'maxDelayDays' })} />}
          className='textField'
          type='number'
          margin='normal'
          value={challengeGroup.maxDelayDays}
          onChange={this.onDelayDayChange}
          error={error.maxDelayDays}
          variant='outlined'
          placeholder='< 90 (day)'
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />

        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'minChallengeAmount' })} />
          }
          className='textField'
          type='number'
          margin='normal'
          value={challengeGroup.minAmount}
          onChange={this.onChange('minAmount')}
          error={error.minAmount}
          variant='outlined'
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        <br />
        {isConfirming ? (
          <WaitingBlk>
            <a
              href={`https://ropsten.etherscan.io/tx/${txHash}`}
              target='_blank'
            >
              Transaction is waiting for confirmation
            </a>
            <LinearProgress color='secondary' className='progress' />
          </WaitingBlk>
        ) : null}
        <Button variant='contained' className='button' onClick={this.onSubmit}>
          Create
        </Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CreateChallengeGroup))
