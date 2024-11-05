import React from 'react'
import {Context,useProductContext} from '../context/context'

const SingleCartItem = ({img,price,id,onDelete,color,qnt,onIncr,onDecr,disable}) => {
  const {cartItem,setCartItem,cart ,setCart}=useProductContext(Context);

 
 



  return (
    <>
    <div id='item'>
    <label style={{position:'absolute',bottom:'4px',right:'5px'}}>
    <input type="checkbox" id="myCheckbox" name="option1" value="value1" style={{cursor:'pointer'}} />
    
   </label>
        <div id='img-wr'><img src={img} alt="" style={{height:"250px",width:"230px"}}/></div>
        <div id="des">
            <div><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laboriosam tempora accusantium.</h4></div>
            <span>color:{color}</span>
            <span>Price:${price}</span>
            <span style={{color:"green"}}>in stock</span>
            <div style={{display:'flex',gap:'10px'}}>
                <div>Qnt:</div>
                <div style={{display:'flex',border:'1px solid black',}}>
                    <span style={{border:'1px solid black',padding:'2px 6px',cursor:'pointer'}} onClick={onIncr}>+</span>
                    <span style={{border:'1px solid black',padding:'2px 6px'}}>{qnt}</span>
                    <span style={{border:'1px solid black',padding:'2px 6px',cursor:'pointer'}} onClick={onDecr} disable={disable}>-</span></div>
                <div onClick={()=>onDelete(id)} style={{cursor:'pointer'}}>remove</div>
            </div>
        </div>
    </div>

    </>
  )
}

export default SingleCartItem