import React, { useState, useContext, useEffect } from "react";
import DeletableCard from "../../Components/DeletableCard";
import Navbar from "../../Components/Navbar";
import { UserContext } from '../../Context/UserContext'
import api from "../../Services/api"

function Dashboard() {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0)
  const [productsData, setProductsData] = useState([])

  const [userData] = useContext(UserContext)

  useEffect(() => {    
    getUsersProducts()}, [productsData])

  async function newProductHandler(e) {
    e.preventDefault()
    try {
      await api.post(`${userData._id}/product`, {
        name: productName,
        price: productPrice
      }, {
        headers: {
          auth: userData._id
        }
      })
      alert('Produto cadastrado com sucesso')
      setProductName('')
      setProductPrice('')
    } catch (error) {
      alert('Falha ao adicionar produto, tente novamente')    
    }
  }

  async function getUsersProducts() {
    try {
      const userProductData = await api.get(`/products/${userData._id}`, {
        headers: {
          auth: userData._id
        }
      })
      const { data } = userProductData
      setProductsData(data)
  
    } catch (error) {
      alert('Erro ao carregar produtos, tente novamente')    
    }
  }

  async function deleteProductHandler(product_id) {
    try {
      await api.delete(`${userData._id}/product/${product_id}`, {
        headers: {
          auth: userData._id
        }
      })
      alert('Produto removido com sucesso')
    } catch (error) {
      alert('Erro ao deletar produto, tente novamente')    
    }
  }

  return (
    <>
      <Navbar />
      <section className="input-section">
        <form>
          <h1>Cadastrar Produtos</h1>
          <div className="product-inputs">
            <input 
            type="text" 
            placeholder="Nome do produto"
            value={productName}
            onChange={e=>setProductName(e.target.value)}
            />
            <input 
            type="number" 
            min={0} 
            placeholder="Valor do produto em R$"
            max={1000000}
            value={productPrice}
            onChange={e=>setProductPrice(e.target.value)}
            />
            <button onClick={newProductHandler}>Adicionar Produto</button>
          </div>
        </form>
      </section>
      <section className="products-section">
        <div className="products-container">
          {productsData.map(product => (
            <DeletableCard 
              key={product._id}
              name={product.name}
              price={product.price}
              userName={product.user.name}
              userNumber={product.user.whatsapp}
              deleteProductHandler={()=> {deleteProductHandler(product._id)}}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Dashboard