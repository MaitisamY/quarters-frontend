import '../styles/outer-app.css';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';

const Signup = () => {
    const { register } = useAuth();
    const [isShown, setIsShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };

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

    const formik = useFormik({
        initialValues: {
            role: '',
            fullName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            role: Yup.string(),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/register`, {
                    role: values.role,
                    name: values.fullName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phoneNumber,
                    password: values.password
                });

                setTimeout(() => {
                    register(response.data);
                    setIsLoading(false);
                    toast.success('Your account has been created successfully', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    navigate(`/verify`);
                }, 3000);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Credententials invalidated!';
                console.error('Signup error:', error);
                setTimeout(() => {
                    toast.error(errorMessage, {
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
                }, 3000);
            }
        }
    });

    document.title = 'Quarters | Sign Up';

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
                    <div className="outer-app-box-header">
                        <h1>Sign-up</h1>
                    </div>

                    <div className="outer-app-box-body">
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="row">
                                <div className="column-12">
                                    <div className="row">
                                        <h5 className="radio-title">Are you a:</h5>

                                        <div className="custom-radios-holder">
                                            <input
                                                id="role"
                                                name="role"
                                                type="radio"
                                                value="renter"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.role === 'renter'}
                                            />
                                            <h6>Renter</h6>
                                        </div>

                                        <div className="custom-radios-holder">
                                            <input
                                                id="role"
                                                name="role"
                                                type="radio"
                                                value="landlord"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.role === 'landlord'}
                                            />
                                            <h6>Landlord</h6>
                                        </div>
                                        
                                        <div className="custom-radios-holder">
                                            <input
                                                id="role"
                                                name="role"
                                                type="radio"
                                                value="agent"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.role === 'agent'}
                                            />
                                            <h6>Agent</h6>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    {formik.touched.role ? <p>{formik.errors.role}</p> : null}
                                </div>
                            </div>

                            <label htmlFor="fullName">Full Name*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="fullName"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your name"
                                />
                            </div>
                            {formik.touched.fullName ? <p>{formik.errors.fullName}</p> : null}

                            <label htmlFor="lastName">Last Name*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="lastName"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your last name"
                                />
                            </div>
                            {formik.touched.lastName ? <p>{formik.errors.lastName}</p> : null}

                            <label htmlFor="email">Email*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {formik.touched.email ? <p>{formik.errors.email}</p> : null}

                            <label htmlFor="phoneNumber">Phone Number*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your phone number"
                                    inputMode="numeric"
                                />
                            </div>
                            {formik.touched.phoneNumber ? <p>{formik.errors.phoneNumber}</p> : null}

                            <label htmlFor="password">Password*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="password"
                                    name="password"
                                    type={isShown ? "text" : "password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your password"
                                />
                            </div>
                            {formik.touched.password ? <p>{formik.errors.password}</p> : null}

                            <label htmlFor="confirmPassword">Confirm Password*</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={isShown ? "text" : "password"}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Confirm your password"
                                />
                            </div>
                            {formik.touched.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}

                            <button type="submit" className="custom-button" disabled={isLoading}>
                                {
                                    isLoading ?
                                        <>Please Wait... <div className="loader"></div></>
                                        : 'Get Started'
                                }
                            </button>
                            <button className="google-button">
                                <img src="./images/google.png" alt="google" width={14} />
                                Sign up with Google
                            </button>
                        </form>
                    </div>

                    <div className="outer-app-box-footer">
                        <p>
                            Already have an account? <Link className="link" to="/login">Log in</Link>
                        </p>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
        
    )
}

export default Signup;
