import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../Services/api'

import { UserContext } from '../../Context/UserContext'

function RegisterModal({setLoginForm, setModal}) {
  const history = useHistory()
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    getUserLocation()
  }, [])
  async function registrationHandler(e) {
    e.preventDefault()

    try {
      await api.post('user', {
        name,
        whatsapp,
        email,
        password,
        latitude,
        longitude
      })
      loginHandler()
    } catch (error) {
      alert('Erro ao cadastrar usuário, tente novamente.')
    }
  }
  async function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
    }, (error) => {
      console.log(error)
    }, { timeout: 15000, enableHighAccuracy: true }
    ) 
  }

  const [userData, setUserData] = useContext(UserContext)
  

  async function loginHandler() {

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
}

  return (
    <div className="modal">
      <Link className='close-modal-register' onClick={setModal}>X</Link>
      <h1>Cadastrar</h1>
        <form>
          <input 
          type="text"  
          placeholder="nome"
          value={name}
          onChange={e=>setName(e.target.value)}
          />
          <input 
          type="tel"  
          placeholder="telefone"
          value={whatsapp}
          maxLength={11}
          onChange={e=>setWhatsapp(e.target.value)}
          onInput={e=> e.target.value = e.target.value.replace(/[^0-9]/g,'')} 
          />
          <input 
          type="text"
          placeholder="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          />
          <input 
          type="password"  
          placeholder="senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
          <button onClick={registrationHandler}>CADASTRAR</button>
          <Link onClick={setLoginForm}>Já tenho uma conta.</Link>
        </form>
    </div>
  )
}

export default RegisterModal