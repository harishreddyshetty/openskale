import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    localStorage.removeItem('loginDetails')
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="nav-container">
      <Link to="/home">
        <h1>Federal Bank</h1>
      </Link>

      <div className="nav-items-container">
        <Link className="transLink" to="/transactions">
          <p>Transactions</p>
        </Link>

        <button className="button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
