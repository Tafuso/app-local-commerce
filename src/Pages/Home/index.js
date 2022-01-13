import React, { useState, useEffect } from "react";
import Navbar from '../../Components/Navbar'
import Card from '../../Components/Card'
import Modal from '../../Components/Modal'
import { UserContext } from '../../Context/UserContext'
import api from "../../Services/api"



function Home() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [allProductsData, setAllProductsData] = useState([])

  const [productsByName, setProductsByName] = useState('')
  const [productsByMaxPrice, setProductsByMaxPrice] = useState(Infinity)

  const [filteredProductsData, setFilteredProductsData] = useState([])
  
  useEffect(() => {
    getUserLocation()
  }, [])

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

  useEffect(() => {
    allProductsHandler()
  }, [longitude, latitude])  

  async function allProductsHandler() {
    const allProduct = await api.get(`/products?longitude=${longitude}&latitude=${latitude}`)
    const { data } = allProduct
    setAllProductsData(data)
  }

  useEffect(() => {
    getFilteredProducts()
  }, [allProductsData, productsByName, productsByMaxPrice])

  function getFilteredProducts() {
    const filteredProducts = allProductsData.filter(product =>      
      (!productsByName || product.name.toLowerCase().includes(productsByName.toLowerCase())) &&
      (!productsByMaxPrice || product.price <= productsByMaxPrice)     
      )
      setFilteredProductsData(filteredProducts)
  }

  const [isModalOpen, setModalOpen] = useState(false)

  function setModal() {
    isModalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  return (
    <>
      <Navbar setModal={setModal}/>
      <section className="input-section">
        <form>
          <h1>Pesquisar produtos</h1>
          <div className="form-inputs">
            <input 
            type="text" 
            placeholder="pesquisar por nome do produto"
            value={productsByName}
            onChange={e => setProductsByName(e.target.value)}
            />
            <input 
            type="number" 
            min="0" 
            placeholder="preço máximo"
            value={productsByMaxPrice}
            onChange={e=>setProductsByMaxPrice(e.target.value)}

            />
          </div>
        </form>
      </section>
      <section className="products-section">
        <div className="products-container">
        {filteredProductsData.map(product => (
            <Card 
              key={product._id}
              name={product.name}
              price={product.price}
              userName={product.user.name}
              userNumber={product.user.whatsapp}
            />
          ))}
        </div>
      </section>
      {isModalOpen ? <Modal setModal={setModal}/> : null}
    </>
    )
}

export default Home