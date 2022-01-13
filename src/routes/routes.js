import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Pages/Home/index'
import Dashboard from '../Pages/Dashboard/index'

import { UserContext } from '../Context/UserContext'

function Routes() {
  const [userData, setUserData] = useContext(UserContext)

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/dashboard'>
            {userData.isLogged ? <Dashboard />: <Redirect to="/"/>}
        </Route>    
      </Switch>
    </BrowserRouter>
  )
}

export default Routes