import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import Signup from './components/Signup'
import LoginRoute from './components/Login'
import HomeRoute from './components/HomeRoute'
import Transactions from './components/Transactions'
import BankContext from './BankContext/BankContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {balance: 0}

  componentDidMount() {
    this.updateBalance()
  }

  //   updateBalance = () => {
  //     const getDataFromLocal = JSON.parse(
  //       localStorage.getItem('transactionsList'),
  //     )

  //     if (getDataFromLocal !== null) {
  //       const lastTrans = getDataFromLocal[getDataFromLocal.length - 1]
  //       //   console.log(lastTrans, 'lastTrans')
  //       const latestBalance = lastTrans.UpdatedBalance

  //       this.setState({balance: latestBalance})
  //     }
  //   }

  updateBalance = () => {
    const getDataFromLocal = JSON.parse(localStorage.getItem('loginDetails'))

    if (getDataFromLocal !== null) {
      const {userBalance} = getDataFromLocal
      this.setState({balance: userBalance})
    }
  }

  onChangeBalance = data => {
    const {UpdatedBalance} = data
    this.setState({balance: UpdatedBalance})
  }

  render() {
    const {balance} = this.state
    return (
      <BankContext.Provider
        value={{balance, updateBalance: this.onChangeBalance}}
      >
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/home" component={HomeRoute} />
          <Route exact path="/transactions" component={Transactions} />
        </Switch>
      </BankContext.Provider>
    )
  }
}

export default App
