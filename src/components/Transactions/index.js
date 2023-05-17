import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import BankContext from '../../BankContext/BankContext'
import Header from '../Header'
import TransactionItems from '../TransactionItems'

import './index.css'

const transactionTypes = [
  {id: 'WITHDRAW', text: 'Withdraw'},
  {id: 'DEPOSIT', text: 'Deposit'},
  {id: 'TRANSFER', text: 'Transfer'},
]

class Transactions extends Component {
  state = {
    activeOption: transactionTypes[0].id,
    amount: '',
    ReceiversAccountNumber: '',
    transactionsList: [],
  }

  componentDidMount() {
    this.updateTransList()
  }

  updateTransList = () => {
    const getList = JSON.parse(localStorage.getItem('transactionsList'))

    const loggedInUser = JSON.parse(localStorage.getItem('loginDetails'))

    const LoggedAcc = loggedInUser.AccountNo
    // console.log(LoggedAcc)

    if (getList !== null) {
      const filteredTransactions = getList.filter(
        eachTrans =>
          eachTrans.AccountNumber === LoggedAcc ||
          eachTrans.Type === 'TRANSFER',
      )

      // console.log(filteredTransactions, 'filteredTransactions')
      this.setState({transactionsList: filteredTransactions})
    }

    this.setState({
      activeOption: 'WITHDRAW',
      amount: '',
      ReceiversAccountNumber: '',
    })
  }

  onChangeOption = event => {
    this.setState({activeOption: event.target.value})
  }

  getDate = () => {
    const presentDate = new Date()
    const year = presentDate.getFullYear()
    const month = presentDate.getMonth()
    const date = presentDate.getDate()

    return `${date}/${month}/${year}`
  }

  onChangeAccount = event => {
    this.setState({ReceiversAccountNumber: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  render() {
    const {
      activeOption,
      ReceiversAccountNumber,
      amount,
      transactionsList,
    } = this.state

    return (
      <BankContext.Consumer>
        {value => {
          const {balance, updateBalance} = value

          const onClickSubmit = event => {
            event.preventDefault()

            const loginDetails = JSON.parse(
              localStorage.getItem('loginDetails'),
            )

            const {AccountNo} = loginDetails

            let acc
            if (activeOption === 'WITHDRAW' || activeOption === 'DEPOSIT') {
              acc = AccountNo
            } else {
              acc = ReceiversAccountNumber
            }

            const getAllUserDetails = JSON.parse(
              localStorage.getItem('userDetails'),
            )

            const remainingUsers = getAllUserDetails.filter(
              eachUser => eachUser.AccountNo !== AccountNo,
            )

            const activeUser = getAllUserDetails.find(
              eachUser => eachUser.AccountNo === AccountNo,
            )

            console.log(getAllUserDetails, 'getAllUserDetails')
            console.log(remainingUsers, 'remainingUsers')
            console.log(activeUser, 'activeUser')

            let newBalance

            if (activeOption === 'WITHDRAW') {
              newBalance = parseInt(balance) - parseInt(amount)
            } else if (activeOption === 'DEPOSIT') {
              newBalance = parseInt(balance) + parseInt(amount)
            } else {
              newBalance = parseInt(balance) - parseInt(amount)
            }

            const updatedUser = {...activeUser, userBalance: newBalance}

            console.log(updatedUser, 'updatedUsersBalance')

            const updatedUserDetailsList = [...remainingUsers, updatedUser]
            console.log(updatedUserDetailsList, 'updatedUserDetailsList')

            localStorage.setItem(
              'userDetails',
              JSON.stringify(updatedUserDetailsList),
            )

            const singleTransactionDetails = {
              refId: uuidv4(),
              date: this.getDate(),
              amount,
              AccountNumber: acc,
              Type: activeOption,
              UpdatedBalance: newBalance,
            }

            console.log(singleTransactionDetails, 'singleTransactionDetails')

            const getTransList = JSON.parse(
              localStorage.getItem('transactionsList'),
            )
            const transList = [singleTransactionDetails]

            if (getTransList === null) {
              localStorage.setItem(
                'transactionsList',
                JSON.stringify(transList),
              )
            } else {
              const newTransList = [...getTransList, singleTransactionDetails]
              localStorage.setItem(
                'transactionsList',
                JSON.stringify(newTransList),
              )
            }

            updateBalance(singleTransactionDetails)
            this.updateTransList()
          }

          return (
            <div>
              <Header />

              <form onSubmit={onClickSubmit} className="transactions-container">
                <label htmlFor="transType">Type</label>
                <select
                  className="select"
                  value={activeOption}
                  onChange={this.onChangeOption}
                  id="transType"
                >
                  {transactionTypes.map(eachItem => (
                    <option key={eachItem.id} value={eachItem.id}>
                      {eachItem.text}
                    </option>
                  ))}
                </select>

                {activeOption === 'TRANSFER' && (
                  <>
                    <label htmlFor="account No">Account No</label>
                    <input
                      className="input"
                      value={ReceiversAccountNumber}
                      onChange={this.onChangeAccount}
                      id="account No"
                      type="text"
                    />
                  </>
                )}

                <label htmlFor="amount">Amount</label>
                <input
                  className="input"
                  value={amount}
                  onChange={this.onChangeAmount}
                  id="amount"
                  type="text"
                />

                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </form>

              <hr />

              <ul className="trans-list-headings">
                <li className="date">Date</li>
                <li className="ref-id">Reference ID</li>
                <li className="account">Account</li>
                <li className="type">Type</li>
                <li className="amount">Amount</li>
                <li className="balance">Balance</li>
              </ul>

              <ul className="trans-list-container">
                {transactionsList.map(eachItem => (
                  <TransactionItems data={eachItem} key={eachItem.refId} />
                ))}
              </ul>
            </div>
          )
        }}
      </BankContext.Consumer>
    )
  }
}

export default Transactions

// eslint-disable-next-line no-lone-blocks
{
  /* const loggedInUser = JSON.parse(localStorage.getItem('loginDetails'))
          const LoggedAcc = loggedInUser.AccountNo
          console.log(LoggedAcc)

          const filteredTransactions = transactionsList.filter(
            eachTrans =>
              eachTrans.AccountNumber === LoggedAcc ||
              eachTrans.Type === 'TRANSFER',
          )

          console.log(filteredTransactions, 'filteredTransactions') */
}
