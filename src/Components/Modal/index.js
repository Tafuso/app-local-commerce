import React, { useState } from 'react'
import LoginModal from '../../Components/LoginModal'
import RegisterModal from '../../Components/RegisterModal'

function Modal({ setModal }) {
  const [isLogin, setIsLogin] = useState(true)

  function setLoginForm() {
    setIsLogin(true)
  }

  function setRegisterForm() {
    setIsLogin(false)
  }
  
  return (
    <div className="backdrop">
      <button className='close-modal-btn' onClick={setModal}>Fechar</button>
      {isLogin ? <LoginModal setRegisterForm={setRegisterForm}/> : <RegisterModal setLoginForm={setLoginForm}/>}
    </div>
  )
}

export default Modal