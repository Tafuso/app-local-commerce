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
      {isLogin ? <LoginModal setRegisterForm={setRegisterForm} setModal={setModal}/> : <RegisterModal setLoginForm={setLoginForm} setModal={setModal}/>}
    </div>
  )
}

export default Modal