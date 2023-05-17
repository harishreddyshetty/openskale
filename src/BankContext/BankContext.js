import React from 'react'

const BankContext = React.createContext({
  balance: 0,
  updateBalance: () => {},
})

export default BankContext
