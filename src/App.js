import React from 'react'
import Routes from './routes/routes';
import './Styles/main.scss'
import { UserProvider } from './Context/UserContext'

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App
