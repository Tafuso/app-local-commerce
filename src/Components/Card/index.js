import React from 'react'


function Card({ name, price, userName, userNumber}) {

  return (
    <div className="cards">
      <h2>{name}</h2>
      <h1>R$ {price.toFixed(2)}</h1>
      <div className="card-info">
        <div className="card-info-detail">      
          <p>{userName}</p>
        </div>
        <div className="card-info-detail">
          <p>{userNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default Card