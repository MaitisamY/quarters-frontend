import '../styles/outer-app.css';

import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';
import { MdMailOutline } from 'react-icons/md';

const handleInput = (e, nextInput, prevInput) => {
    const { value } = e.target;
    if (value.length >= 1 && nextInput) {
        nextInput.current.focus();
    } else if (value.length === 0 && prevInput) {
        prevInput.current.focus();
    }
};

const Verification = () => {

    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const leftCurveVariants = {
        hidden: { opacity: 0, x: "50%", y: "-50%" },
        visible: {
            opacity: 1,
            x: "0%",
            y: "0%",
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    };
    
    const bottomRightShapeVariants = {
        hidden: { opacity: 0, x: "100%", y: "100%" },
        visible: {
            opacity: 1,
            x: "0%",
            y: "0%",
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 1.5, 
            },
        },
    };

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    document.title = 'Quarters | Verify Email';

    if (!user) {
        navigate('/');
    }

    console.log(user);

    return (
        <>
            <Header />
            <div className="outer-app-container">
                
                <motion.img
                    src="./images/v1.png"
                    className="left-curve"
                    alt="Left curve decoration"
                    initial="hidden"
                    animate="visible"
                    variants={leftCurveVariants}
                />
                <motion.img
                    src="./images/v2.png"
                    className="bottom-right-shape"
                    alt="Bottom right shape decoration"
                    initial="hidden"
                    animate="visible"
                    variants={bottomRightShapeVariants}
                />
                <motion.div 
                    className="outer-app-box"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="outer-app-box-header-center">
                        <div className="envelop">
                            <MdMailOutline  
                                style={{ 
                                    color: '#12B76A'
                                }} 
                            />
                        </div>
                        <h1>Check Your Email</h1>
                        <p>We've sent a verification code to</p>
                    </div>

                    <div className="outer-app-box-body">
                        <form autoComplete="off">
                            <div className="custom-group-verification">
                                <input
                                    className="field"
                                    id="fieldOne"
                                    name="fieldOne"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[1], null)}
                                    ref={inputRefs[0]}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && e.target.value === '') {
                                            if (inputRefs[0].current) inputRefs[0].current.focus();
                                        }
                                    }}
                                    required
                                />
                                <input
                                    className="field"
                                    id="fieldTwo"
                                    name="fieldTwo"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[2], inputRefs[0])}
                                    ref={inputRefs[1]}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && e.target.value === '') {
                                            if (inputRefs[0].current) inputRefs[0].current.focus();
                                        }
                                    }}
                                    required
                                />
                                <input
                                    className="field"
                                    id="fieldThree"
                                    name="fieldThree"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[3], inputRefs[1])}
                                    ref={inputRefs[2]}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && e.target.value === '') {
                                            if (inputRefs[1].current) inputRefs[1].current.focus();
                                        }
                                    }}
                                    required
                                />
                                <input
                                    className="field"
                                    id="fieldFour"
                                    name="fieldFour"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, null, inputRefs[2])}
                                    ref={inputRefs[3]}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && e.target.value === '') {
                                            if (inputRefs[2].current) inputRefs[2].current.focus();
                                        }
                                    }}
                                    required
                                />
                            </div>
                            
                            <div className="row-flex-center">
                                {
                                    inputRefs.some(ref => ref.current && ref.current.value === '') ? (
                                        <button 
                                            type="submit" 
                                            className="custom-button short disabled" 
                                            disabled
                                        >
                                            Verify Email Address
                                        </button>
                                    ) : (
                                        <button 
                                            type="submit" 
                                            className="custom-button short" 
                                            disabled={isLoading}
                                        >
                                            {
                                                isLoading ?
                                                    <>Please Wait... <div className="loader"></div></>
                                                    : 'Verify Email Address'
                                            }
                                        </button>
                                    )
                                }
                            </div>
                            
                        </form>
                    </div>
                    <div className="outer-app-box-footer">
                        <p>
                            Didn't receive the OPT email? {' '}
                            <Link className="link" to="/login">Click to resend</Link>
                        </p>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default Verification;