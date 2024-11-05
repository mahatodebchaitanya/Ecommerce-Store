import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
const Demoproduct = () => {
  const navigate=useNavigate();
  return (
    <div id='demoproduct-wrapper' onClick={()=>navigate('/displayedproduct')} >
     <div id='img-w'>
        <img src="\images\image.png" alt="" />
     </div>
     <div id='con-w'>
        <div>
          <p>Details Lorem ipsum dolor, sit amet....</p>
        </div>
        <div>
          <div>
          <s>15</s>
          <span style={{fontSize:'13px',color:'green',fontWeight:'bold',paddingLeft:'5px'}}>$</span>
          <span style={{fontSize:'13px'}}>10</span>
          </div>
          <div style={{display:'flex',gap:'4px'}}>
            <span style={{height:'25px',width:'25px',borderRadius:'50%',backgroundColor:'red',color:'white',fontSize:'12px',padding:'2px'}}>5%</span>
            <span>off</span>
          </div>
        </div>
     </div>
    </div>
  )
}

export default Demoproduct