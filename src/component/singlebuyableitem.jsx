import React from 'react'
import { Context,useProductContext } from '../context/context'
const SingleBuyAbleItem = ({img,qnt,price}) => {
  

  return (
    <>
    <div style={{height:'auto',display:'flex',justifyContent:'center',alignItems:'start',gap:'15px',border:'',padding:'10px',borderBottom:"1px solid black"}}>
        
        <div id='img-wrp' style={{height:'80px',width:'100px',display:'flex',justifyContent:'center',alignItems:'start'}}> 
            <img src={img} style={{height:'50%',width:'100%'}} alt='book'/>
        </div>
        <div id='description' style={{display:"flex",widht:'80px',flexDirection:'column',height:'100px',justifyContent:'space-between'}}>
         <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, dolorem!</h4>
         <span>Qnt:{qnt}</span>
        </div>
        <div id='money'style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'80px',border:'',height:'100px'
         }}>
         <span>${price}</span>
         <span>each:${Math.floor(price/qnt)}</span>
        </div>
        </div>
    </>
  )
}

export default SingleBuyAbleItem