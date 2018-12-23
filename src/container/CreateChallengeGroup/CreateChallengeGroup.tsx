import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { TouchApp } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'
import { ChallengeGroupType } from '@Src/typing/globalTypes'
import Logo from '@Src/images/logo.png'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { newChallengeGroup } from '@Epics/challengeGroupEpic/action'
import { CommonStateType } from '@Reducers/commonReducer'
import { ChallengeGroupStateType } from '@Reducers/challengeGroupReducer'

const Form = styled('form')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center'
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
  maxWidth: '200px'
})

const LabelTxt = styled('span')({
  fontSize: '20px'
})

function Label({ text }: { text: string }) {
  return <LabelTxt>{text}</LabelTxt>
}

type CreateChallengeGroupProp = {
  contract: Web3 | null
  createResult: ChallengeGroupStateType
  newChallengeGroup: (payload: ChallengeGroupType) => void
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
    createResult: state.get('challengeGroup') as ChallengeGroupStateType
  }
}

const mapDispatchToProps = (dispath: Dispatch) => ({
  newChallengeGroup: (payload: ChallengeGroupType) =>
    dispath(newChallengeGroup(payload))
})

class CreateChallengeGroup extends React.Component<
  CreateChallengeGroupProp,
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
    this.props.newChallengeGroup(this.state.challengeGroup)
  }

  public render() {
    const { challengeGroup, error } = this.state
    return (
      <Form noValidate autoComplete='off'>
        <Icon src={Logo} />
        <TextField
          label={<Label text='Challenge Group id' />}
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
          label={<Label text='Challenge Group name' />}
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
          label={<Label text='Cover image url' />}
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
          label={<Label text='Min days' />}
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
          label={<Label text='Max days' />}
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
          label={<Label text='Max delay days' />}
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
          label={<Label text='Min Challenge Coin' />}
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
        <Button variant='contained' color='default' onClick={this.onSubmit}>
          Create
          <TouchApp />
        </Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChallengeGroup)
