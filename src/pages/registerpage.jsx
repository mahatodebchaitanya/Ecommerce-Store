// import React,{useState} from 'react';
// import { MdOutlineEmail } from "react-icons/md";
// import { FaRegUser } from "react-icons/fa";
// import { GoEyeClosed, GoEye } from "react-icons/go";
// import Modal from '../component/modal';

// const Registerpage = ({ isModalOpen, toggleModal, openLoginModal }) => {
//     const [registerDetails,setRegisterDetails]=useState({
        
//     })


//     const handleChange=(e)=>{
//         const name=e.target.name
//         const value=e.target.value
//         setRegisterDetails((pre)=>({
//             ...pre,
//             [name]:value,
//         }))
//     }

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         alert(JSON.stringify(registerDetails))
//         toggleModal();
//         setRegisterDetails({});
//     }
//     return (
//         <Modal show={isModalOpen} onClose={toggleModal}>
//             <div id='register-wrapper'>
//                 <form onSubmit={handleSubmit}>
//                     <span onClick={toggleModal} style={{backgroundColor:'red',position:'absolute',top:'-13px',right:'-13px',height:'30px',width:'30px',borderRadius:'50%',fontSize:'25px',display:'flex',justifyContent:'center',alignItems:"center",color:'white',cursor:'pointer'}} >X</span>
//                     <h1>Register</h1>
//                     <div id='input-container'>
//                         <label>Name:</label>
//                         <div id='inputs'>
//                             <input type="text" className='gp1' placeholder='Name' name='name' value={registerDetails.name} onChange={handleChange} />
//                             <FaRegUser />
//                         </div>
//                     </div>
//                     <div id='input-container'>
//                         <label>Email:</label>
//                         <div id='inputs'>
//                             <input type="email" className='gp1' placeholder='Email' name='email' value={registerDetails.email} onChange={handleChange} />
//                             <MdOutlineEmail />
//                         </div>
//                     </div>
//                     <div id='input-container'>
//                         <label>Password:</label>
//                         <div id='inputs'>
//                             <input type="password" className='gp1' placeholder='Password' name='password' value={registerDetails.password} onChange={handleChange} />
//                             <GoEye />
//                         </div>
//                     </div>
//                     <div id='input-container'>
//                         <label>Confirm Password:</label>
//                         <div id='inputs'>
//                             <input type="password" className='gp1' placeholder='Confirm Password' name='confirmpassword' value={registerDetails.confirmpassword} onChange={handleChange} />
//                             <GoEyeClosed />
//                         </div>
//                     </div>
//                     <button id='btn' style={{ cursor: 'pointer' }}>Register</button>
//                     <p>Already have an account? <span onClick={openLoginModal} style={{ cursor: 'pointer' }}>Login</span></p>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default Registerpage;





import React, { useState } from 'react';
import '../App.css';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Modal from '../component/modal';

const Registerpage = ({ isModalOpen, toggleModal, openLoginModal }) => {
    const [registerDetails, setRegisterDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        return email.includes('@gmail.com');
    };

    const validatePassword = (password) => {
        const minLength = /.{6,}/; // At least 6 characters
        // const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
        // const number = /\d/; // At least one digit

        return minLength.test(password);
        // && specialChar.test(password) && number.test(password)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!registerDetails.name) {
            formErrors.name = "Name is required.";
        }

        if (!validateEmail(registerDetails.email)) {
            formErrors.email = "valid Gmail address contain '@gmail.com'.";
        }

        if (!validatePassword(registerDetails.password)) {
            formErrors.password = "Password must be at least 6 characters long";
        }

        if (registerDetails.password !== registerDetails.confirmpassword) {
            formErrors.confirmpassword = "Passwords do not match.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            alert("Registration successful!");
            toggleModal();
            setRegisterDetails({
                name: '',
                email: '',
                password: '',
                confirmpassword: ''
            });
        }
    };

    return (
        <Modal show={isModalOpen} onClose={toggleModal}>
            <div id='register-wrapper'>
                <form onSubmit={handleSubmit}>
                    <span onClick={toggleModal} style={{backgroundColor:'red',position:'absolute',top:'-13px',right:'-13px',height:'30px',width:'30px',borderRadius:'50%',fontSize:'25px',display:'flex',justifyContent:'center',alignItems:"center",color:'white',cursor:'pointer'}} >X</span>
                    <h1>Register</h1>
                    <div id='input-container'>
                        <label>Name:</label>
                        <div id='inputs'>
                            <input 
                                type="text" 
                                className='gp1' 
                                placeholder='Name' 
                                name='name' 
                                value={registerDetails.name} 
                                onChange={handleChange} 
                            />
                            <FaRegUser />
                        </div>
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>
                    <div id='input-container'>
                        <label>Email:</label>
                        <div id='inputs'>
                            <input 
                                type="email" 
                                className='gp1' 
                                placeholder='Email' 
                                name='email' 
                                value={registerDetails.email} 
                                onChange={handleChange} 
                            />
                            <MdOutlineEmail />
                        </div>
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </div>
                    <div id='input-container'>
                        <label>Password:</label>
                        <div id='inputs'>
                            <input 
                                type="password" 
                                className='gp1' 
                                placeholder='Password' 
                                name='password' 
                                value={registerDetails.password} 
                                onChange={handleChange} 
                            />
                            <GoEye />
                        </div>
                        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                    </div>
                    <div id='input-container'>
                        <label>Confirm Password:</label>
                        <div id='inputs'>
                            <input 
                                type="password" 
                                className='gp1' 
                                placeholder='Confirm Password' 
                                name='confirmpassword' 
                                value={registerDetails.confirmpassword} 
                                onChange={handleChange} 
                            />
                            <GoEyeClosed />
                        </div>
                        {errors.confirmpassword && <span style={{ color: 'red' }}>{errors.confirmpassword}</span>}
                    </div>
                    <button id='btn' style={{ cursor: 'pointer' }}>Register</button>
                    <p>Already have an account? <span onClick={openLoginModal} style={{ cursor: 'pointer' }}>Login</span></p>
                </form>
            </div>
        </Modal>
    );
};

export default Registerpage;


