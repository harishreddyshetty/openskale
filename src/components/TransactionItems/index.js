import './index.css'

const TransactionItems = props => {
  const {data} = props
  const {refId, date, amount, UpdatedBalance, Type, AccountNumber} = data

  return (
    <ul className="single-trans-container">
      <li className="date-list">{date}</li>
      <li className="ref-id">{refId}</li>
      <li className="account">{AccountNumber}</li>
      <li className="type">{Type}</li>
      <li className="amount">{amount}</li>
      <li className="balance">{UpdatedBalance}</li>
    </ul>
  )
}

export default TransactionItems
