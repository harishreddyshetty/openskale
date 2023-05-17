import {Component} from 'react'

import './index.css'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    AccountNo: '',
    userBalance: 0,
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateAccount = event => {
    this.setState({AccountNo: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/login')
  }

  getDetailsFromLocal = () => {
    const {username, password, AccountNo, userBalance} = this.state

    const getUserDetailsFromLocal = JSON.parse(
      localStorage.getItem('userDetails'),
    )

    const userData = {username, password, AccountNo, userBalance}
    // console.log(userData)

    let userDetailsArray = []

    if (getUserDetailsFromLocal === null) {
      userDetailsArray = [userData]
      localStorage.setItem('userDetails', JSON.stringify(userDetailsArray))
      const {history} = this.props
      history.replace('/login')
    } else {
      const findUser = getUserDetailsFromLocal.find(
        eachUser => eachUser.AccountNo === AccountNo,
      )

      if (findUser === undefined) {
        userDetailsArray = [...getUserDetailsFromLocal, userData]
        localStorage.setItem('userDetails', JSON.stringify(userDetailsArray))
        const {history} = this.props
        history.replace('/login')
      } else {
        userDetailsArray = getUserDetailsFromLocal
        // eslint-disable-next-line no-alert
        alert('Account Already SignedUp Please Login to continue')
      }
    }

    return userDetailsArray
  }

  onClickSignup = event => {
    event.preventDefault()

    const {username, password, AccountNo} = this.state

    if (username === '' || password === '' || AccountNo === '') {
      this.setState({errorMsg: 'Please enter all the details'})
    } else {
      this.getDetailsFromLocal()
    }
  }

  render() {
    const {username, password, errorMsg, AccountNo} = this.state

    return (
      <div className="signup-container">
        <form className="signUp-form" onSubmit={this.onClickSignup}>
          <h1 className="signup-heading">Signup</h1>
          <label htmlFor="username">USERNAME</label>
          <input
            className="input"
            placeholder="Username"
            onChange={this.updateUsername}
            value={username}
            type="text"
            id="username"
          />

          <label htmlFor="AccountNo">ACCOUNT NO</label>
          <input
            className="input"
            placeholder="Account No"
            onChange={this.updateAccount}
            value={AccountNo}
            type="text"
            id="AccountNo"
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            className="input"
            placeholder="Password"
            onChange={this.updatePassword}
            value={password}
            type="password"
            id="password"
          />

          {errorMsg.length > 0 && <p className="error-msg">*{errorMsg}</p>}

          <button className="signup-btn" type="submit">
            SignUp
          </button>
        </form>
      </div>
    )
  }
}

export default Signup
