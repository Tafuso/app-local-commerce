import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../Services/api'

import { UserContext } from '../../Context/UserContext'

function LoginModal({setRegisterForm, setModal}) {
const [userData, setUserData] = useContext(UserContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  async function loginHandler(e) {
  e.preventDefault()

  try {
    const userData = await api.post('session', {
      email,
      password
    })

    const userInfo = userData.data

    setUserData(prevState => ({
      ...prevState,
      isLogged: true,
      email: userInfo.email,
      name: userInfo.name,
      _id: userInfo._id
    }))
    history.push('/dashboard')
  } catch (error) {
    alert('Falha no login, tente novamente.')    
  }
}

  return (
    <div className="modal">
      <Link className='close-modal-login' onClick={setModal}>X</Link>
      <h1>Entrar</h1>
        <form>
          <input 
          type="text"  
          placeholder="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}/>
          <input 
          type="password"  
          placeholder="senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
          <button onClick={loginHandler}>ENTRAR</button>
          <Link onClick={setRegisterForm}>Não tem uma conta? Crie uma!</Link>
        </form>
    </div>
  )
}

export default LoginModal