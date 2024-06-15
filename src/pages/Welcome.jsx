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

const Welcome = () => {

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

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const response = await axios.post('https://reqres.in/api/register', values);
                if (response.status === 200) {
                    toast.success('Account created successfully');
                    setIsLoading(false);
                }
            } catch (error) {
                toast.error(error.response.data.error);
                setIsLoading(false);
            }
        },
    });

    if (!user) {
        navigate('/');
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

                    <div className="outer-app-box-body">
                        <div className="custom-group-verification">
                            <div className="welcome-message">
                                <div className="welcome-icon">
                                    <img src="./images/fav-1.png" alt="Welcome icon" />
                                </div>
                                <div className="paragraph">
                                    <p>
                                        Hi <strong>John Doe</strong>
                                    </p>
                                    <p>
                                        Thank you for signing up to Quarters, 
                                        you are the # <strong>1089th</strong> person on our wait-list!
                                    </p>
                                    <p>
                                        As we prepare for launch we’re offering cash-back to pre-load 
                                        your Quarters Wallet. For every referral that creates an account 
                                        you get $5. The person with the most successful referrals wins $5,000.
                                    </p>
                                    <p> 
                                        We’ve emailed you some information on what you can 
                                        expect as a(n) <strong>Renter</strong> when we launch. 
                                    </p> 
                                    <p>
                                        Let’s change renting together, you can keep the change.
                                    </p>
                                </div>

                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <label htmlFor="email">Refferal Email</label>
                                        <div className="custom-group">
                                            <input
                                                className="field"
                                                id="email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter referrel email"
                                            />
                                        </div>
                                    {formik.touched.email ? <p>{formik.errors.email}</p> : null}

                                    <button
                                        type="submit"
                                        className="custom-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading...' : 'Send Invite'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default Welcome