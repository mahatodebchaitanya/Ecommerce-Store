import React from 'react'
import { BsBagHeartFill } from "react-icons/bs";
import { useNavigate,useParams } from 'react-router-dom';
import {useEffect ,useState} from 'react';
import { Context, useProductContext } from '../context/context';
import axios from 'axios';
import Popup from './popup';

const DisplayedProduct = () => {
   const {setCartItem,cartItem,cart,setCart}=useProductContext(Context)
   console.log(cartItem)
   const {productId}=useParams()
   const navigate=useNavigate()
   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);
   const [inCart, setInCart] = useState(false); // Track if the product is in the cart
   const [showPopup, setShowPopup] = useState(false);//show popup when a product is added to cart

   const handleClick = (product) => {
    const {title,price,discount,id,img,color}=product;
    if (inCart) {
        navigate('/shopingcart'); // Navigate to cart page
    } else {
        setCartItem(cartItem + 1);
        console.log("CART ITEM:"+cartItem);
        setInCart(true); // Set inCart to true when adding to cart
        // Show the popup
       setShowPopup(true);

      // Automatically close the popup after 3 seconds
       setTimeout(() => {
      setShowPopup(false);
       }, 3000);

       setCart((prevCart) => {
        // Check if the product already exists in the cart
        const exists = prevCart.find((item) => item.id === id);
        if (exists) {
          return prevCart; // If already in the cart, return unchanged
        }
        // Otherwise, add product to cart
        return [...prevCart, { title, price, discount, id,color,img,qnt:1}];
      });

    }
};
   
   
   // Fetch products data
   const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
        // console.log(response.data.product)
        setProduct(response.data.product) // Assuming response.data contains the products array
        
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      }
    };
  
    // Fetch data on component mount
    useEffect(() => {
      fetchProduct();      
    }, [productId]);

    if (!product) {
      return <p>Loading...</p>; // Or any placeholder you prefer
    }

    // function shortenDescription() {
    //   return product.description.length >= 70 ? product.description.slice(0, 70) + '...' : product.description;
    // }

  return (
    <div  style={{height:'100vh',width:'100wh',position:'relative',display:'flex',justifyContent:'center',alignItems:'center'}} >
      {/* Render the popup if showPopup is true */}
      {showPopup && <Popup message="Item added to cart!" onClose={() => setShowPopup(false)} />}

        <div style={{height:'80%',width:'80%',border:'2px solid black',display:'flex',flexDirection:'column',padding:'20px'}}>
        <div style={{display:'flex',justifyContent:'flex-end'}}><span style={{fontSize:'30px',backgroundColor:'red',color:'white',height:'35px',width:'35px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={()=>navigate('/')}> X</span></div>
        <div style={{border:'',display:'flex',paddingTop:'0px',gap:'30px',alignItems:'center'}}>
            <div style={{width:'40%',border:''}} >
                <img src={product.image} alt="" height='80%'width='100%' />
            </div>
            <div style={{display:'flex',flexDirection:'column',width:'50%',gap:'20px'}}>
             <div style={{fontSize:'25px',wordWrap:'break-word'}}>
               {product.title}
             </div>
             <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
                <s>{product.price + 50}</s><h2>${product.price}</h2><span style={{height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',color:'white',display:'flex',alignItems:'center'}}>19%</span><span>off</span>
             </div>
             <div>
                <p>BRAND:{product.brand}</p>
                <p>MODEL:{product.model}</p>
                <p>color:{product.color}</p>
             </div>
             <div>
                <h5>About this product:</h5>
                <p>{(product.description.length >= 431) ? product.description.slice(0,431) +'...':product.description}</p>
             </div>
             <div>
                <button style={{padding:'5px 10px',cursor:"pointer"}} onClick={()=>handleClick({ title: product.title, price: product.price, discount: product.discount, id: product.id,color:product.color,img:product.image,qnt:1 })}>{inCart?'Go to Cart':(<span style={{display:'flex',gap:'7px'}}><BsBagHeartFill /><span>Add to Cart</span></span>)}</button>
             </div>

            </div>
        </div>
        
        </div>
        
    </div>
  )
}

export default DisplayedProduct