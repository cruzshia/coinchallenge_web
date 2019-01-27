import React from 'react'
import { RouteComponentProps } from 'react-router'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Contract from 'web3/eth/contract'
import { ChallengeGroupType } from '@Src/typing/globalTypes'
import Logo from '@Src/images/logo.png'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  newChallengeGroup,
  setCreateResult,
  SetResultProp
} from '@Epics/challengeGroupEpic/action'
import { checkWallet, setPopup, SetPopProps } from '@Epics/commonEpic/action'
import { CommonStateType } from '@Reducers/commonReducer'
import { ChallengeGroupStateType } from '@Reducers/challengeGroupReducer'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import Transaction from '@Components/Transaction'
import { APP_THEME } from '@Src/contants/themeColor'
import { isUrlValid } from '@Src/utils'
import { changeRoute } from '@Utils/index'

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

function isInvalid(val: number) {
  return !(Number(val) >= 0 && Number(val) <= 90)
}

const defaultGroupState = {
  id: '',
  name: '',
  url: '',
  minDays: '',
  maxDays: '',
  maxDelayDays: '',
  minAmount: ''
}

type CreateChallengeGroupProp = {
  contract: Contract | null
  isConfirming: boolean
  txHash?: string
  createResult: ChallengeGroupStateType
  newChallengeGroup: (payload: ChallengeGroupType) => void
  checkWallet: () => void
  setCreateResult: (payload: SetResultProp) => void
  setPopup: (payload: SetPopProps) => void
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
  setPopup: (payload: SetPopProps) => dispatch(setPopup(payload)),
  setCreateResult: (payload: SetResultProp) =>
    dispatch(setCreateResult(payload)),
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
  CreateChallengeGroupProp & InjectedIntlProps & RouteComponentProps,
  StateProp
> {
  static LabelProp = {
    shrink: true
  }

  public state = {
    challengeGroup: { ...defaultGroupState } as ChallengeGroupType,
    error: {} as ErrorProp
  }

  private onTextChange = (key: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[key] = val
    error[key] = val.length <= 0
    this.setState({
      challengeGroup: { ...challengeGroup },
      error: { ...error }
    })
  }

  private onDayChange = (key: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[key] = val
    const minDays = Number(challengeGroup.minDays)
    const maxDays = Number(challengeGroup.maxDays)
    error['minDays'] =
      isInvalid(minDays) || minDays >= Number(challengeGroup.maxDays)
    error['maxDays'] =
      isInvalid(maxDays) || maxDays <= Number(challengeGroup.minDays)
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

  private onAmountChange = (field: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[field] = val
    error[field] = Number(val) <= 0
    this.setState({
      challengeGroup,
      error
    })
  }

  private onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup['url'] = val
    error['url'] = !isUrlValid(val)
    this.setState({
      challengeGroup: { ...challengeGroup },
      error: { ...error }
    })
  }

  private onSubmit = () => {
    let hasError = Object.keys(this.state.error).length === 0
    for (let field in this.state.error) {
      hasError = hasError || this.state.error[field]
    }
    if (hasError) {
      this.props.setPopup({
        showPop: true,
        messageKey: 'createDataError'
      })
      return
    }
    this.props.checkWallet()
    this.props.newChallengeGroup(this.state.challengeGroup)
  }

  public componentDidUpdate() {
    const response = this.props.createResult.get('response')
    if (response.status) {
      this.props.setCreateResult({
        response: {},
        error: false
      })
      this.setState({ challengeGroup: defaultGroupState })
    }
  }

  public componentDidMount() {
    const { history, location } = this.props
    changeRoute({ history, location, match: {} })
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
          onChange={this.onTextChange('id')}
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
          onChange={this.onTextChange('name')}
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
          onChange={this.onUrlChange}
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
          onChange={this.onAmountChange('minAmount')}
          error={error.minAmount}
          variant='outlined'
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        <br />
        {isConfirming ? (
          <WaitingBlk>
            <Transaction txHash={txHash} classNames='progress' />
          </WaitingBlk>
        ) : null}
        <Button variant='contained' className='button' onClick={this.onSubmit}>
          {intl.formatMessage({ id: 'create' })}
        </Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CreateChallengeGroup))
