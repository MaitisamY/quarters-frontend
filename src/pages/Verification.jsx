import '../styles/outer-app.css';

import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';
import { MdMailOutline } from 'react-icons/md';
import axios from 'axios';

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

    const formik = useFormik({
        initialValues: {
            code1: '',
            code2: '',
            code3: '',
            code4: '',
        },
        validationSchema: Yup.object({
            code1: Yup.string().required('Required'),
            code2: Yup.string().required('Required'),
            code3: Yup.string().required('Required'),
            code4: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const enteredCode = `${values.code1}${values.code2}${values.code3}${values.code4}`;
            if (enteredCode === user.verificationCode) {
                try {
                    await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/welcome`, {
                        email: user.email,
                    });
                    setTimeout(() => {
                        navigate('/welcome'); // Redirect to a welcome page or dashboard
                    }, 2000);
                } catch (error) {
                    console.error('Error sending welcome email:', error);
                    toast.error('Error sending welcome email', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setIsLoading(false);
                }
            } else {
                setTimeout(() => {
                    toast.error('Verification code is incorrect', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setIsLoading(false);
                }, 2000);
            }
        },
    });

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

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        const values = text.split('');
        formik.setFieldValue('code1', values[0]);
        formik.setFieldValue('code2', values[1]);
        formik.setFieldValue('code3', values[2]);
        formik.setFieldValue('code4', values[3]);
    };

    document.title = 'Quarters | Verify Email';

    if (!user) {
        navigate('/signup');
    }

    useEffect(() => {
        if (!user) {
            navigate('/signup');
        }
    }, [user, navigate]);

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
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
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
                        <p>We've sent a verification code to your email</p>
                    </div>

                    <div className="outer-app-box-body">
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="custom-group-verification">
                                <input
                                    className="field"
                                    id="code1"
                                    name="code1"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[1], null)}
                                    ref={inputRefs[0]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code1}
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
                                    onPaste={handlePaste}
                                />
                                <input
                                    className="field"
                                    id="code2"
                                    name="code2"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[2], inputRefs[0])}
                                    ref={inputRefs[1]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code2}
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
                                    onPaste={handlePaste}
                                />
                                <input
                                    className="field"
                                    id="code3"
                                    name="code3"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, inputRefs[3], inputRefs[1])}
                                    ref={inputRefs[2]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code3}
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
                                    onPaste={handlePaste}
                                />
                                <input
                                    className="field"
                                    id="code4"
                                    name="code4"
                                    type="text"
                                    maxLength={1}
                                    onInput={(e) => handleInput(e, null, inputRefs[2])}
                                    ref={inputRefs[3]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code4}
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
                                    onPaste={handlePaste}
                                />
                            </div>
                            
                            <div className="row-flex-center">
                                <button 
                                    type="submit" 
                                    className="custom-button short" 
                                    disabled={isLoading || formik.values.code1 === '' || formik.values.code2 === '' || formik.values.code3 === '' || formik.values.code4 === ''}
                                >
                                    {
                                        isLoading ?
                                            <>Please Wait... <div className="loader"></div></>
                                            : 'Verify Email Address'
                                    }
                                </button>
                            </div>
                            
                        </form>
                    </div>
                    <div className="outer-app-box-footer">
                        <p>
                            Didn't receive the OTP email? {' '}
                            <Link className="link" to="/resend">Click to resend</Link>
                        </p>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default Verification;
