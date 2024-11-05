import React from 'react'
import '../App.css'

const Product = ({image,price,title,discount,onClick}) => {

  function shortenTitle() {
    return title.length >= 22 ? title.slice(0, 22) + '...' : title;
  }

  return (
    <>
     <div id="product" onClick={onClick} style={{}}>
        <div id='img-wr' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <img src={image} alt="" style={{height:'242px',width:'100%'}}/>
         </div>
         <div id='des-wr'>
            <p id='main-des'>{shortenTitle()}</p>
            <div id='des'>
                <s>{Math.floor(price+(price*(discount/100)))}</s>
                <div id='doller'>
                <span id='dol'>$</span>
                <span id='money'>{price}</span>
                </div>
                <div id='off'>
                <span className='of'>{discount}%</span>
                 <span>off</span> 
                 </div>
            </div>
         </div>
        </div>
    </>
  )
}

export default Product