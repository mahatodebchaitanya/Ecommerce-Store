// Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaShoppingCartSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { BsBagHeartFill } from "react-icons/bs";
import Login from '../pages/login'; // Make sure this is the correct path to Login
import Registerpage from '../pages/registerpage';
import { Context, useProductContext } from '../context/context';
import SearchModal from './searchmodal';

const Navbar = () => {
    const navigate = useNavigate();
    const {cartItem,setSearchInput,setSearchResults,isSearchModalOpen,setIsSearchModalOpen,searchInput,products}=useProductContext(Context);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModelOpen,setRegisterModelOpen] =useState(false);

  const toggleLoginModal=()=>{
      setLoginModalOpen(!isLoginModalOpen);
      setRegisterModelOpen(false);
  }

  const toggleRegisterModel=()=>{
    setRegisterModelOpen(!isRegisterModelOpen)
    setLoginModalOpen(false);

  }
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
        console.log(products)
        
        const results = products.filter((product) =>
            // console.log(product.title)
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
        setIsSearchModalOpen(results.length > 0);
        console.log('is search model open'+isSearchModalOpen)
    }
    //  else {
    //     setIsSearchModalOpen(false);
    // }
};

   

    return (
        <div id='navbar'>
            <span id='logo'>
                <BsBagHeartFill style={{ cursor: 'pointer' }} />
            </span>
            <div id='input'>
                <IoSearch />
                <input placeholder='Search The Product' value={searchInput} onChange={handleSearchChange}/>
                {isSearchModalOpen && <span onClick={()=>setIsSearchModalOpen(false)} style={{color:'red',cursor:'pointer'}}>X</span>}
            </div>
            <div id='cartholder'>
                <span id='carts' onClick={() => navigate('/shopingcart')} style={{ position: 'relative' }}>
                    
                    <span style={{ position: 'absolute', color: 'white', fontSize: '20px', top: '0', left: '50%', fontWeight: 'bold', backgroundColor: "red", borderRadius: '50%', height: '25px', width: '25px', display: 'flex', justifyContent: "center", alignItems: 'center',cursor:'pointer' }}>{cartItem}</span>
                    <LiaShoppingCartSolid style={{ cursor: 'pointer' }} />
                </span>
                <span id='carts' onClick={toggleLoginModal}>
                    <RiAccountCircleLine style={{ cursor: 'pointer' }} />
                </span>
            </div>
            {/* Modal */}
            {isLoginModalOpen && (<Login
              isModalOpen={isLoginModalOpen}
              toggleModal={toggleLoginModal}
              openRegisterModal={toggleRegisterModel}
            />)}
            {isRegisterModelOpen && (<Registerpage
               isModalOpen={isRegisterModelOpen}
               toggleModal={toggleRegisterModel}
               openLoginModal={toggleLoginModal}
            />)}

            {isSearchModalOpen && 
            <SearchModal/>
            }
        </div>
    );
};

export default Navbar;


