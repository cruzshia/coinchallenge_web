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

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import web3 from 'web3'

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
  width: '100%',
  maxWidth: '400px'
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
  marginBottom: '10px',
  width: '100%'
})

const FormStyle = {
  maxWidth: '400px',
  margin: '20px 0 10px',
  backgroundColor: '#fff'
}

const MenuStyle = {
  style: {
    maxHeight: '300px',
    padding: '0 10px'
  }
}

const SelectStyle = {
  padding: '0 10px 0 15px'
}

function Label({ text }: { text: string }) {
  return <LabelTxt>{text}</LabelTxt>
}

const defaultGroupState = {
  id: '',
  name: '',
  url: '',
  minDays: '0',
  maxDays: '0',
  maxDelayDays: '7',
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

interface ErrorKeys extends ChallengeGroupType {
  agent?: any
}

type ErrorProp = { [s in keyof ErrorKeys]?: boolean }
type StateProp = {
  challengeGroup: ChallengeGroupType
  error: ErrorProp
  agent: string
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
    error: {
      minDays: true,
      maxDays: true
    } as ErrorProp,
    agent: ''
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
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let val = e.target.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[key] = val
    if (Number(challengeGroup['maxDays']) < Number(challengeGroup['minDays'])) {
      challengeGroup['maxDays'] = challengeGroup['minDays']
    }
    error['minDays'] = Number(challengeGroup['minDays']) <= 0
    error['maxDays'] = Number(challengeGroup['maxDays']) <= 0
    this.setState({
      challengeGroup: { ...challengeGroup },
      error: {
        ...error
      }
    })
  }

  private onDelayDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let val = e.target.value as string
    const { challengeGroup, error } = this.state
    challengeGroup.maxDelayDays = val
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

  private onAgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value as string
    const isEmpty = val === ''
    const { error } = this.state
    error['agent'] = !isEmpty && !web3.utils.isAddress(val)
    this.setState({
      agent: val,
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
    this.props.newChallengeGroup({
      ...this.state.challengeGroup,
      agent: this.state.agent
    })
  }

  public componentDidUpdate() {
    const response = this.props.createResult.get('response')
    if (response.status) {
      this.props.setCreateResult({
        response: {},
        error: false
      })
      this.setState({ challengeGroup: defaultGroupState, agent: '' })
    }
  }

  public componentDidMount() {
    const { history, location } = this.props
    changeRoute({ history, location, match: {} })
  }

  public render() {
    const { challengeGroup, error, agent } = this.state
    const { intl, isConfirming, txHash } = this.props

    return (
      <Form noValidate autoComplete='off' style={{ padding: '0 10px' }}>
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

        <FormControl
          variant='outlined'
          fullWidth={true}
          style={FormStyle}
          required
        >
          <InputLabel htmlFor='outlined-age-simple'>
            {intl.formatMessage({ id: 'minChallengeDays' })}{' '}
          </InputLabel>
          <Select
            MenuProps={MenuStyle}
            value={challengeGroup.minDays}
            onChange={this.onDayChange('minDays')}
            style={SelectStyle}
            input={<OutlinedInput labelWidth={150} />}
          >
            {new Array(79).fill(0).map((_data: number, index: number) => (
              <MenuItem key={`option-${index}`} value={index + 12}>
                {index + 12}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant='outlined'
          fullWidth={true}
          style={FormStyle}
          required
        >
          <InputLabel htmlFor='outlined-age-simple'>
            {intl.formatMessage({ id: 'maxChallengeDays' })}
          </InputLabel>
          <Select
            MenuProps={MenuStyle}
            value={challengeGroup.maxDays}
            onChange={this.onDayChange('maxDays')}
            style={SelectStyle}
            input={<OutlinedInput labelWidth={150} />}
          >
            {new Array(90 - Number(challengeGroup.minDays) + 1)
              .fill(0)
              .map((_data: number, index: number) => (
                <MenuItem
                  key={`option-max-${index}`}
                  value={(Number(challengeGroup.minDays) || 12) + index}
                >
                  {(Number(challengeGroup.minDays) || 12) + index}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl
          variant='outlined'
          fullWidth={true}
          style={FormStyle}
          required
        >
          <InputLabel htmlFor='outlined-age-simple'>
            {intl.formatMessage({ id: 'maxDelayDays' })}
          </InputLabel>
          <Select
            MenuProps={MenuStyle}
            value={challengeGroup.maxDelayDays}
            onChange={this.onDelayDayChange}
            style={SelectStyle}
            input={<OutlinedInput labelWidth={140} />}
          >
            {new Array(90).fill(0).map((_data: number, index: number) => (
              <MenuItem key={`option-delay-${index}`} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <TextField
          label={<Label text={intl.formatMessage({ id: 'agent' })} />}
          className='textField'
          margin='normal'
          variant='outlined'
          placeholder='e.g 0xa99CeB4475670cCDF31a78232bfA585848598cBA'
          value={agent}
          onChange={this.onAgentChange}
          error={error.agent}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
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
