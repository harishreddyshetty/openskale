import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const getLoginUser = JSON.parse(localStorage.getItem('loginDetails'))
  console.log(getLoginUser, 'getLoginUser')
  if (getLoginUser === null) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedRoute
