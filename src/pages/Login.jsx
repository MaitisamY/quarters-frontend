import '../styles/outer-app.css'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';

const Login = () => {
    const { user, login } = useAuth()
    const navigate = useNavigate()

    const [isShown, setIsShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const togglePassword = () => {
        setIsShown((isShown) => !isShown)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
        }),
        onSubmit: async (values) => {
            
            setIsLoading(true)

            try {
                setIsLoading(true)

                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/login`, values)
                setTimeout(() => {
                    login(response.data)
                    setIsLoading(false)
                    navigate(`/${response.data.role}/dashboard`)
                }, 3000)
                
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Login failed';
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
    })

    document.title = 'Quarters | Login'

    if (user) {
        navigate(`/${user.role}/dashboard`)
    }

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
                        <h1>Login</h1>
                    </div>

                    <div className="outer-app-box-body">
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <label htmlFor="email">Email</label>
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
                        
                            <label htmlFor="password">Password</label>
                            <div className="custom-group">
                                <input
                                    className="field"
                                    type={isShown ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formik.values.password} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your password"
                                />
                                <a onClick={togglePassword}>{isShown ? <FaEyeSlash title="Toggle to hide password" /> : <FaEye title="Toggle to show password" />}</a>
                            </div>
                            {formik.touched.password ? <p>{formik.errors.password}</p> : null}
                            
                            <button type="submit" className="custom-button" disabled={isLoading}>
                                {
                                    isLoading ? 
                                    <>Please Wait... <div className="loader"></div></> 
                                    : 'Login'
                                }
                            </button>
                        </form>
                    </div>

                    <div className="outer-app-box-footer">
                        <p>
                            Don't have an account? <Link className="link" to="/signup">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default Login