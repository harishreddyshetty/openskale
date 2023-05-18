import Header from '../Header'

import './index.css'

const HomeRoute = () => {
  const getUserName = () => {
    const loginUserDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const {username} = loginUserDetails

    return username
  }

  const getBalance = () => {
    const loginUserDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const {AccountNo} = loginUserDetails
    const balanceDetails = JSON.parse(localStorage.getItem('userDetails'))
    const activeUser = balanceDetails.find(user => user.AccountNo === AccountNo)

    const {userBalance} = activeUser

    return userBalance
  }

  return (
    <div>
      <Header />

      <div className="home-container">
        <h1>Welcome {getUserName()}</h1>
        <p>Your Current Balance is</p>
        <p className="balance-amount">Rs {getBalance()}</p>
      </div>
    </div>
  )
}

export default HomeRoute
