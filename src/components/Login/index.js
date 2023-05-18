import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    password: '',
    errorMsg: '',
    AccountNo: '',
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

  onClickLogin = event => {
    event.preventDefault()

    const {AccountNo, password} = this.state
    const localUserData = JSON.parse(localStorage.getItem('userDetails'))
    const checkUser = localUserData.find(
      eachUser => eachUser.AccountNo === AccountNo,
    )
    console.log(checkUser)

    if (checkUser === undefined) {
      // eslint-disable-next-line no-alert
      alert('No account Found Please sign up')
    } else if (
      AccountNo === checkUser.AccountNo &&
      password === checkUser.password
    ) {
      localStorage.setItem('loginDetails', JSON.stringify(checkUser))

      const {history} = this.props
      history.replace('/home')
    } else {
      this.setState({errorMsg: `Account No and Password didn't match`})
    }
  }

  render() {
    const {password, errorMsg, AccountNo} = this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onClickLogin}>
          <h1 className="login-heading">Login</h1>
          <label className="label" htmlFor="AccountNo">
            ACCOUNT NO
          </label>
          <input
            className="input"
            placeholder="Account No"
            onChange={this.updateAccount}
            value={AccountNo}
            type="text"
            id="AccountNo"
          />

          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="input"
            placeholder="Password"
            onChange={this.updatePassword}
            value={password}
            type="password"
            id="password"
          />

          {errorMsg.length > 0 && <p className="error-msg">*{errorMsg}</p>}

          <button className="Login-btn" type="submit">
            Login
          </button>

          <p>
            Not signed Up ?
            <Link to="/">
              {' '}
              <span>Sign up</span>
            </Link>{' '}
          </p>
        </form>
      </div>
    )
  }
}

export default LoginRoute
