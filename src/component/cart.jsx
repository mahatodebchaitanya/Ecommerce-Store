import React from 'react'
import Product from './product'
import '../App.css'
import { useNavigate } from 'react-router-dom'
const Cart = ({displayedProducts}) =>{
    const navigate=useNavigate();
    
    const handleClick=(productId)=>{
      navigate(`/displayedproduct/${productId}`)
    }
    
  return (
    
    <div className='cart-wrapper'>
      {
        displayedProducts.map((item)=>(
          <Product key={item.id} id={item.id} image={item.image} price={item.price} title={item.title} discount={item.discount}onClick={()=>handleClick(item.id)}/>
        ))
      }    
    
    </div>
    
  )
}

export default Cart