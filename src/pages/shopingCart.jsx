import React ,{useEffect,useState} from 'react'
import Layout from '../layout/layout'
import SingleCartItem from '../component/singlecartitem'
import { useNavigate } from 'react-router-dom'
import { Context,useProductContext } from '../context/context'
const ShopingCart = () => {
  const navigate=useNavigate();
  const {cart,setCart,cartItem,setCartItem,subtotal,setSubtotal}=useProductContext(Context)
  const [totalprice,setTotalPrice]=useState(0)
  const [discount,setDiscount]=useState(0)
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // setCartItem()
  // const handleInc=(id)=>{
    
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       // alert(item)
  //       item.id === id ? { ...item, qnt: item.qnt + 1 } : item
  //     )
  //   );
  //   setCartItem(cartItem+1)
  //  }
  //  const handleDec=(id)=>{
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id && item.qnt > 1 ? { ...item, qnt: item.qnt - 1 } : item
  //     )
      
  //   );
  //  }

  const update = (id, delta) => {
    setCart(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qnt: Math.max(1, item.qnt + delta) } // Ensures qnt doesn't go below 1
        : item
      )
    );
  };

   // Calculate cart item count whenever cartItems changes
   useEffect(() => {
    const totalCount = cart.reduce((count, item) => count + item.qnt, 0);
    setCartItem(totalCount);


  
  let tp=0;
  let disco=0;
  let subto=0;
  cart.forEach(item=>{
    let ip = Math.floor(item.price * item.qnt); // Original price for item
   let dis = Math.floor(ip * (item.discount / 100)); // Discount amount for item
    let subt = Math.floor(ip - dis); // Price after discount for item
    // alert(subto);
    tp += ip;
    disco += dis;
    subto += subt;
  })
  setTotalPrice(tp)
  setDiscount(disco)
  setSubtotal(subto)
  // alert(discount)
   
  }, [cart]);
  



  
  return (
    <>
      <Layout>
        <div id='shopingcart'>
          <div id='cart-items'>
            <h1>Shoping Cart <span style={{ fontSize: '14px' }}>{cartItem}</span></h1>
            <button onClick={()=>navigate('/')} style={{cursor:'pointer'}}>Continue shoping</button>
          </div>
          <div id='items'>
            <div id="item-wr">
              {cart.map((item)=>(
                 <SingleCartItem id={item.id} price={item.price} discount={item.discount}  img={item.img} onDelete={removeFromCart} color={item.color} qnt={item.qnt} onIncr={()=>update(item.id,1)} onDecr={()=>update(item.id,-1)} disabled={item.qnt<= 1}/>
              ))}
              
            </div>

          </div>
          <div id='ordersummary'>
            <div><h2>Order Summary</h2></div>
            <hr />
            <div style={{display:'flex',flexDirection:'column'}}>
              <span>Price:{totalprice}$</span>
              <span>Delivary:free</span>
              <span>Discount:{discount}$</span>
            </div>
            <hr />
            <div>
              <h3>Sub Total:{subtotal}$</h3>
            </div>
            <div>
            <button onClick={()=>navigate('/payment')} style={{padding:'6px 12px',borderRadius:'5px',fontWeight:'bold',backgroundColor:'#334155',color:"white",fontSize:'14px',cursor:'pointer'}} >proceed to pay</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ShopingCart