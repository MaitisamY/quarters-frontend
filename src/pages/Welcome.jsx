import '../styles/outer-app.css';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';
import { SuccessToastColored, ErrorToastColored } from '../utils/ToastMessage';
import { sendReferralEmail } from '../services/api';

const Welcome = () => {

    const { user, logout } = useAuth();
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
                .required('Email is required')
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
                .max(50, 'Email must be less than 50 characters')
                .notOneOf([user?.email], 'You cannot refer yourself')
                .notOneOf([user?.email.toUpperCase()], 'You cannot refer yourself')
                .notOneOf([user?.email.toLowerCase()], 'You cannot refer yourself')
                .notOneOf([user?.email.split('@')[0]], 'You cannot refer yourself')
                .notOneOf([user?.email.split('@')[0].toUpperCase()], 'You cannot refer yourself')
                .notOneOf([user?.email.split('@')[0].toLowerCase()], 'You cannot refer yourself'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {

                // Generate referral code with name's first word and unique ID
                const code = `${user.name.split(' ')[0].toUpperCase()}${user.uniqueId}`;
                const data = {
                    referrer: user?.name, 
                    referrer_email: user?.email, 
                    referred_email: values.email,
                    referral_code: code,
                }

                const response = await sendReferralEmail(data);
                if (response.status === 200) {
                    setTimeout(() => {
                        SuccessToastColored('Referral sent successfully', 5000);
                        formik.resetForm();
                        setIsLoading(false);
                    }, 3000);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Referral processing failed';
                console.error('Error processing referral:', error);
                setTimeout(() => {
                    ErrorToastColored(errorMessage, 5000);
                    setIsLoading(false);
                }, 3000);
            }            
        },
    });

    document.title = 'Quarters | Welcome';

    if (!user) {
        navigate('/signup');
    }

    useEffect(() => {
        if (!user) {
            navigate('/signup');
        }
    }, [user, navigate]);

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

                    <div className="outer-app-box-body">
                        <div className="custom-group-verification">
                            <div className="welcome-message">
                                <div className="welcome-icon">
                                    <img src="./images/fav-1.png" alt="Welcome icon" />
                                </div>
                                <div className="paragraph">
                                    <p>
                                        Hi <strong>{user.name}</strong>
                                    </p>
                                    <p>
                                        Thank you for signing up to Quarters.
                                    </p>
                                    <p> 
                                        You are the <strong>{user.uniqueId}th</strong> on our waitlist!
                                    </p>
                                    <p>
                                        As we prepare for launch we’re offering cash-back so you can preload your Quarters wallet. 
                                    </p>
                                    <p>
                                        For everyone you refer that creates an account you’ll get $5. 
                                        When we launch, the leaderboard will be announced and the 3 users with the most referrals will win an additional $5,000, $2,500 and $1000. 
                                    </p>
                                    <p> 
                                        We’ve emailed you some information on what you can 
                                        expect as {user?.role === 'landlord' ? 'a' : user?.role === 'renter' ? 'a' : 'an'} {' '}
                                        <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong> when we launch. 
                                    </p> 
                                    <p>
                                        Let’s change renting together, you can keep the change.
                                    </p>
                                </div>

                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <label htmlFor="email">Referral Email</label>
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
                                        {
                                            isLoading ?
                                                <>Sending... <div className="loader"></div></>
                                                : 'Send Referral Code'
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="row-flex-center mt-8">
                            <button 
                                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }} 
                                className="link" 
                                onClick={logout}
                            >Close and Return</button>
                        </div>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default Welcome