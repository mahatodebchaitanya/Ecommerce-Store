// import React, { useState } from 'react';
// import '../App.css';
// import { GoEye } from "react-icons/go";
// import { MdOutlineEmail } from "react-icons/md";
// import Modal from '../component/modal';

// const Login = ({ isModalOpen, toggleModal, openRegisterModal }) => {
    
//     const [loginDetails,setLoginDetails]=useState({email:'',password:''})
    
//     const handleChange=(e)=>{
//         const name=e.target.name;
//         const value=e.target.value;
//         setLoginDetails((pre)=>({...pre,
//             [name]:value
//         }))
//     }
    
//     const handleSubmit=(event)=>{
//         event.preventDefault();
//         alert(JSON.stringify(loginDetails));
//         toggleModal();
//     }


//     return (
//         <Modal show={isModalOpen} onClose={toggleModal}>
//             <div id='register-wrapper'>
//                 <form onSubmit={handleSubmit}>
//                     <span onClick={toggleModal} /* Close button styles */style={{ backgroundColor: 'red', position: 'absolute', top: '-13px', right: '-13px', height: '30px', width: '30px', borderRadius: '50%', fontSize: '25px', display: 'flex', justifyContent: 'center', alignItems: "center", color: 'white', cursor: 'pointer' }}>X</span>
//                     <h1>Login</h1>
//                     <div id='input-container'>
//                         <label>Email:</label>
//                         <div id='inputs'>
//                             <input type="email" name='email' className='gp1' placeholder='Email' value={loginDetails.email} onChange={handleChange}/>
//                             <MdOutlineEmail />
//                         </div>
//                     </div>
//                     <div id='input-container'>
//                         <label>Password:</label>
//                         <div id='inputs'>
//                             <input type="password" name='password' className='gp1' placeholder='Password' value={loginDetails.password} onChange={handleChange} />
//                             <GoEye />
//                         </div>
//                     </div>
//                     <button id='btn' style={{ cursor: 'pointer' }}>Login</button>
//                     <div id='demo-ac'>
//                         <p>Don't have an account? <span onClick={openRegisterModal} style={{ cursor: 'pointer' }}>Sign up</span></p>
//                         <p>or</p>
//                         <button id='btn' style={{ cursor: 'pointer' }}>use demo account</button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import '../App.css';
import { GoEye } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import Modal from '../component/modal';

const Login = ({ isModalOpen, toggleModal, openRegisterModal }) => {
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        return email.includes('@') && email.endsWith('gmail.com');
    };

    const validatePassword = (password) => {
        const minLength = /.{6,}/; // At least 6 characters
        // const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
        // const number = /\d/; // At least one digit

        return minLength.test(password);
        //  && specialChar.test(password) && number.test(password)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let formErrors = {};

        if (!validateEmail(loginDetails.email)) {
            formErrors.email = "valid Gmail address contain'@gmail.com'.";
        }

        if (!validatePassword(loginDetails.password)) {
            formErrors.password = "at least 6 characters long.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            alert(JSON.stringify(loginDetails)); // You can replace this with your login logic
            toggleModal(); // Optionally close the modal after successful validation
            setLoginDetails({})
        }
    };

    return (
        <Modal show={isModalOpen} onClose={toggleModal}>
            <div id='register-wrapper'>
                <form onSubmit={handleSubmit}>
                    <span onClick={toggleModal} style={{ backgroundColor: 'red', position: 'absolute', top: '-13px', right: '-13px', height: '30px', width: '30px', borderRadius: '50%', fontSize: '25px', display: 'flex', justifyContent: 'center', alignItems: "center", color: 'white', cursor: 'pointer' }}>X</span>
                    <h1>Login</h1>
                    <div id='input-container'>
                        <label>Email:</label>
                        <div id='inputs'>
                            <input 
                                type="email" 
                                name='email' 
                                className='gp1' 
                                placeholder='Email' 
                                value={loginDetails.email} 
                                onChange={handleChange}
                            />
                            <MdOutlineEmail />
                        </div>
                        {errors.email && <p style={{ color: 'red',wordBreak:'break-word' }}>{errors.email}</p>}
                    </div>
                    <div id='input-container'>
                        <label>Password:</label>
                        <div id='inputs'>
                            <input 
                                type="password" 
                                name='password' 
                                className='gp1' 
                                placeholder='Password' 
                                value={loginDetails.password} 
                                onChange={handleChange}
                            />
                            <GoEye />
                        </div>
                        {errors.password && <p style={{ color: 'red',wordBreak:'break-word' }}>{errors.password}</p>}
                    </div>
                    <button id='btn' style={{ cursor: 'pointer' }}>Login</button>
                    <div id='demo-ac'>
                        <p>Don't have an account? <span onClick={openRegisterModal} style={{ cursor: 'pointer' }}>Sign up</span></p>
                        <p>or</p>
                        <button id='btn' style={{ cursor: 'pointer' }}>Use demo account</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default Login;
