import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Web3 from 'web3'
import CoinChallengs from '../../contracts/CoinChallenges.json'
import { ChallengeGroupType } from '../../typing/globalTypes'

import store from '../../store'
import Home from '../../container/Home'

const challengeGroup = {
  id: 'com.1secspeed.walking',
  minDays: 12,
  maxDays: 30,
  maxDelayDays: 20,
  minAmount: 1000
} as ChallengeGroupType

class App extends Component {
  public async componentDidMount() {
    const account = '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2'
    // set the provider of web3
    if (typeof web3 !== 'undefined') {
      console.debug(web3.currentProvider)
      // web3 = new Web3(web3.currentProvider);
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      web3.eth.defaultAccount = account

      var MyContract = new web3.eth.Contract(CoinChallengs.abi, account)

      challengeGroup.agent = account
      await MyContract.methods.createChallenge(...Object.values(challengeGroup))

      //   var a = MyContract.methods
      //     .getBalanceInEth('0x52186eB885f67C802Ac8Ef450a96f4D694edF8f1')
      //     .call()
      //     .then((r: any) => {
      //       console.log(1111)
      //       console.log(r)
      //     })
    } else {
      alert('No currentProvider for web3')
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={() => <div>about</div>} />
            <Route path="/users/" component={() => <div>users</div>} />
          </React.Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App
