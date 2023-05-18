import './index.css'

const TransactionItems = props => {
  const {data} = props
  const {refId, date, amount, UpdatedBalance, Type, AccountNumber} = data

  //   const loggedInUser = JSON.parse(localStorage.getItem('loginDetails'))
  //   const allUsers = JSON.parse(localStorage.getItem('userDetails'))

  //   const {AccountNo} = loggedInUser

  //   const findUser = allUsers.find(eachUser => eachUser.AccountNo === AccountNo)

  //   console.log(findUser)

  //   let balance
  //   if (Type === 'TRANSFER' && AccountNumber === AccountNo) {
  //     balance = parseInt(findUser.userBalance) + parseInt(amount)
  //     localStorage.setItem(
  //       'userDetails',
  //       JSON.stringify([...allUsers, {...findUser, userBalance: balance}]),
  //     )
  //   } else {
  //     balance = UpdatedBalance
  //   }

  return (
    <ul className="single-trans-container">
      <li className="date-list">{date}</li>
      <li className="ref-id">{refId}</li>
      <li className="account">{AccountNumber}</li>
      <li className="type">{Type}</li>
      <li className="amount">{amount}</li>
      <li className="balance">{UpdatedBalance}</li>
      {/* <li className="balance">{balance}</li> */}
    </ul>
  )
}

export default TransactionItems
