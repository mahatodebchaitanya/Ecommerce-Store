// PaymentPage.js
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import BuyableItems from "../component/buyableitems";
import { useNavigate } from "react-router-dom";
import SingleBuyAbleItem from "../component/singlebuyableitem";
import { Context,useProductContext } from "../context/context";


const Payment = () => {
 const navigate=useNavigate();
 const {cart,subtotal}=useProductContext(Context)
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", postalCode: "" });
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: {
        number: document.getElementById('cardNumber').value,
        exp_month: document.getElementById('cardExpiry').value.split('/')[0],
        exp_year: document.getElementById('cardExpiry').value.split('/')[1],
        cvc: document.getElementById('cardCvc').value,
      },
      billing_details: { name, email, address: { country, state: region, ...address } },
    });

    if (error) {
      setPaymentStatus("Payment failed. Please try again.");
      console.error(error);
    } else {
      setPaymentStatus("Payment successful! Thank you.");
      console.log("Payment Method:", paymentMethod);
    }
  };

  return (
   <div style={{display:'flex',justifyContent:'space-around',height:'100vh',alignItems:'center'}}>
     <div id="in-cart-items" style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
       <div style={{width:'440px',marginBottom:'30px',padding:'10px'}}>
         <button style={{padding:'4px 6px',cursor:'pointer'}} onClick={()=>navigate('/shopingcart')}>back</button>
         <p>Pay</p>
         <h1>$ {subtotal}</h1>
       </div>
       <div style={{maxWidth:'440px',height:'auto'}}>
        {cart.map((item)=>(
            <SingleBuyAbleItem img={item.img} qnt={item.qnt} price={item.price}/>
        ))}
       
       </div>
     </div>
     <div style={{width:'50%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',boxShadow:'-3px 0 5px rgba(0, 0, 0, 0.1)'}}>
    <div style={{ maxWidth: "400px",height:'550px' }}>
      <h2 style={{textAlign:'center'}}>Pay with Card</h2>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <label style={{display:"flex",flexDirection:'column',}}>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{height:'35px'}}/>
        </label>
         
         <div>
            <label>Card Information</label>
         <div style={{display:'flex',flexDirection:'column',gap:'0px'}}>
         <div>
          <input style={{height:'35px',width:'100%'}} type="text" id="cardNumber" placeholder="1234 1234 1234 1234" required />
          </div>
          <div style={{display:'flex'}} >
            <input style={{height:'35px',width:'50%'}} type="text" id="cardExpiry" placeholder="MM/YY" required />
            <input style={{height:'35px',width:'50%'}} type="text" id="cardCvc" placeholder="CVC" required />
          </div>
        </div>
        </div>
        <label style={{display:'flex',flexDirection:'column'}}>Card Holder's Name:
          <input type="text" style={{height:'35px'}} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <div>
        <label style={{display:'flex',flexDirection:'column'}}>Billing Address: </label>
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            required
            style={{height:'35px',width:'100%'}}
          />
       

        
          <input type="text" placeholder="Address line 1" style={{height:'35px',width:'100%'}} value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />

          <input type="text"placeholder="address line 2" style={{height:'35px',width:'100%'}}value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />

          <input type="text"  placeholder='City'style={{height:'35px',width:'50%'}} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />

          <input type="text" placeholder='Postal code'style={{height:'35px',width:'50%'}} value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} required />

          <RegionDropdown
            country={country}
            value={region}
            placeholder='State'
            onChange={(val) => setRegion(val)}
            required
           style={{height:'35px',width:'100%'}}/>

        </div>
        <button type="submit" disabled={!stripe} style={{height:'35px',backgroundColor:'blue',color:'white',cursor:'pointer'}}>Pay Now</button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
    </div>
    </div>
  );
};

export default Payment;
