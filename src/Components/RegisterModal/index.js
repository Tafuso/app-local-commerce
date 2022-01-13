import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../Services/api'

function RegisterModal({setLoginForm}) {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState(0)
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
      alert('Cadastro realizado com sucesso')
    } catch (error) {
      alert('Erro ao cadastrar usuario, tente novamente')
    }
  }
  async function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
    }, (error) => {
      console.log(error)
    }, { timeout: 10000 }
    ) 
  }
  return (
    <div className="modal">
      <h1>Cadastrar</h1>
        <form>
          <input 
          type="text"  
          placeholder="nome"
          value={name}
          onChange={e=>setName(e.target.value)}
          />
          <input 
          type="number"  
          placeholder="whatsapp"
          value={whatsapp}
          maxLength={11}
          onInput={(e)=> {if (e.target.value > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
          }}}
          onChange={e=>setWhatsapp(e.target.value)}
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
          <Link onClick={setLoginForm}>Já tenho uma conta</Link>
        </form>
    </div>
  )
}

export default RegisterModal