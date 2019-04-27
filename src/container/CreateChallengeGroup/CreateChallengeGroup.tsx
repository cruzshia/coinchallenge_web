import React from 'react'
import { RouteComponentProps } from 'react-router'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Contract from 'web3/eth/contract'
import {
  ChallengeGroupType,
  ChainType,
  RouteParams
} from '@Src/typing/globalTypes'
import Logo from '@Src/images/logo.png'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  newChallengeGroup,
  setCreateResult,
  SetResultProp
} from '@Epics/challengeGroupEpic/action'
import {
  checkWallet,
  setPopup,
  SetPopProps,
  initContract
} from '@Epics/commonEpic/action'
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
import { APP_COIN } from '@Src/contants/common'

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
    marginTop: '10px',
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
  width: '100%',
  textAlign: 'center'
})

const ErrorTxt = styled('div')({
  fontSize: '12px',
  color: 'red',
  width: '100%',
  maxWidth: '400px',
  paddingLeft: '5px',
  margin: '10px 0 -15px',
  textAlign: 'left'
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

const defaultError = {
  minDays: '',
  maxDays: ''
}

interface CreateChallengeGroupProp
  extends InjectedIntlProps,
    RouteComponentProps {
  contract: Contract | null
  isConfirming: boolean
  txHash?: string
  createResult: ChallengeGroupStateType
  newChallengeGroup: (payload: ChallengeGroupType) => void
  checkWallet: (chain?: string) => void
  setCreateResult: (payload: SetResultProp) => void
  setPopup: (payload: SetPopProps) => void
  initContract: (chain?: string) => void
}

interface ErrorKeys extends ChallengeGroupType {
  agent?: any
}

type ErrorProp = { [s in keyof ErrorKeys]?: string | undefined }
type StateProp = {
  challengeGroup: ChallengeGroupType
  error: ErrorProp
  agent: string
  canSend: boolean
}

const hasError = (val?: string) => val !== undefined && val !== ''

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
  initContract: (chain?: string) => dispatch(initContract(chain)),
  checkWallet: (chain?: string) => dispatch(checkWallet(chain)),
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
  CreateChallengeGroupProp,
  StateProp
> {
  static LabelProp = {
    shrink: true
  }

  public chain: ChainType = 'ethereum'

  public state = {
    challengeGroup: { ...defaultGroupState } as ChallengeGroupType,
    error: {
      ...defaultError
    } as ErrorProp,
    agent: '',
    canSend: false
  }

  constructor(props: CreateChallengeGroupProp) {
    super(props)
    const params = this.props.match.params as RouteParams
    this.chain = params.chain
  }

  private onTextChange = (key: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[key] = val
    error[key] = val.length <= 0 ? `error.invalid.group.${key}` : ''
    this.setState(
      {
        challengeGroup: { ...challengeGroup },
        error: { ...error }
      },
      this.checkForm
    )
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
    error['minDays'] =
      Number(challengeGroup['minDays']) <= 0 ? 'error.empty.min.days' : ''
    error['maxDays'] =
      Number(challengeGroup['maxDays']) <= 0 ? 'error.empty.max.days' : ''
    this.setState(
      {
        challengeGroup: { ...challengeGroup },
        error: {
          ...error
        }
      },
      this.checkForm
    )
  }

  private onDelayDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let val = e.target.value as string
    const { challengeGroup, error } = this.state
    challengeGroup.maxDelayDays = val
    this.setState(
      {
        challengeGroup: { ...challengeGroup },
        error: { ...error }
      },
      this.checkForm
    )
  }

  private onAmountChange = (field: keyof ChallengeGroupType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup[field] = val
    error[field] = Number(val) <= 0 ? 'error.min.amount' : ''
    this.setState(
      {
        challengeGroup,
        error
      },
      this.checkForm
    )
  }

  private onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value as string
    const { challengeGroup, error } = this.state
    challengeGroup['url'] = val
    error['url'] = !isUrlValid(val) ? 'error.invalid.url' : ''
    this.setState(
      {
        challengeGroup: { ...challengeGroup },
        error: { ...error }
      },
      this.checkForm
    )
  }

  private onAgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value as string
    const isEmpty = val === ''
    const { error } = this.state
    error['agent'] =
      !isEmpty && !web3.utils.isAddress(val) ? 'invalidAddress' : ''
    this.setState(
      {
        agent: val,
        error: { ...error }
      },
      this.checkForm
    )
  }

  private checkForm = () => {
    let hasError = false

    for (let field in this.state.challengeGroup) {
      hasError =
        hasError ||
        (field !== 'maxDelayDays' &&
          this.state.challengeGroup[field] === defaultGroupState[field])
      if (hasError) {
        break
      }
    }

    if (!hasError) {
      for (let field in this.state.error) {
        hasError = hasError || this.state.error[field] !== ''
        if (hasError) {
          break
        }
      }
    }

    this.setState({
      canSend: !hasError
    })

    return hasError
  }

  private onSubmit = () => {
    let hasError = this.checkForm()

    if (hasError) {
      this.props.setPopup({
        showPop: true,
        messageKey: 'createDataError'
      })
      return
    }
    this.props.checkWallet(this.chain)
    this.props.newChallengeGroup({
      ...this.state.challengeGroup,
      agent: this.state.agent
    })
  }

  private errorTxt = (key?: string, props?: { [key: string]: any }) => {
    if (key && hasError(key)) {
      props = props || []
      return (
        <ErrorTxt>
          {this.props.intl.formatMessage({ id: key }, { ...props })}
        </ErrorTxt>
      )
    }
    return null
  }

  public componentDidUpdate() {
    const response = this.props.createResult.get('response')
    if (response.status) {
      this.props.setCreateResult({
        response: {},
        error: false
      })
      this.setState({
        challengeGroup: { ...defaultGroupState },
        error: { ...defaultError },
        agent: ''
      })
    }
  }

  public componentDidMount() {
    const { history, location, initContract } = this.props
    changeRoute({ history, location, match: {} })
    initContract(this.chain)
  }

  public render() {
    const { challengeGroup, error, agent } = this.state
    const { intl, isConfirming, txHash } = this.props

    return (
      <Form noValidate autoComplete='off' style={{ padding: '0 10px' }}>
        <Icon src={Logo} />
        {this.errorTxt(error.id)}
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupId' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          type='number'
          placeholder='e.g: 5566'
          value={challengeGroup.id}
          onChange={this.onTextChange('id')}
          error={hasError(error.id)}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        {this.errorTxt(error.name)}
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupName' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          value={challengeGroup.name}
          onChange={this.onTextChange('name')}
          error={hasError(error.name)}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        {this.errorTxt(error.url)}
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'challengeGroupCover' })} />
          }
          className='textField'
          margin='normal'
          variant='outlined'
          value={challengeGroup.url}
          onChange={this.onUrlChange}
          error={hasError(error.url)}
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
        {this.errorTxt(error.minAmount, { coin: APP_COIN(this.chain) })}
        <TextField
          label={
            <Label text={intl.formatMessage({ id: 'minChallengeAmount' })} />
          }
          className='textField'
          type='number'
          margin='normal'
          value={challengeGroup.minAmount}
          onChange={this.onAmountChange('minAmount')}
          error={hasError(error.minAmount)}
          variant='outlined'
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
          required
        />
        {this.errorTxt(error.agent)}
        <TextField
          label={<Label text={intl.formatMessage({ id: 'agent' })} />}
          className='textField'
          margin='normal'
          variant='outlined'
          placeholder='e.g 0xa99CeB4475670cCDF31a78232bfA585848598cBA'
          value={agent}
          onChange={this.onAgentChange}
          error={hasError(error.agent)}
          InputLabelProps={CreateChallengeGroup.LabelProp}
          style={Styles}
        />

        <br />
        {isConfirming ? (
          <WaitingBlk>
            <Transaction txHash={txHash} classNames='progress' />
          </WaitingBlk>
        ) : null}
        <Button
          variant='contained'
          className='button'
          onClick={this.onSubmit}
          disabled={!this.state.canSend}
        >
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
