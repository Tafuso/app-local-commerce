import React, { useContext } from "react";
import Logo from '../../assets/logo.png'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

function Navbar({setModal}) {
  const [userData, setUserData] = useContext(UserContext)

  const history = useHistory()

  async function logoutHandler(e) {
    e.preventDefault()

    setUserData(prevState => ({
      ...prevState,
      isLogged: false,
      email: '',
      name: '',
      _id: ''
    }))
  }
  return (
    <nav>
      <div className="nav-container">
        <img 
        src={Logo} 
        alt="Logo do Local Commerce"
        onClick={() => history.push('/')}
        />
        
        {userData.isLogged ? 
        <>
        <p>Olá, {userData.name}</p>
        <button className="red-btn" onClick={logoutHandler}>SAIR</button>
        </> :
        <button onClick={setModal}>ENTRAR</button>}
      </div>
    </nav>
  )
}

export default Navbar