import '../styles/outer-app.css'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import Header from '../partials/Header';
import Footer from '../partials/Footer';

const NotFound = () => {

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

    return (
        <>
            <Header />
            <div className="outer-app-container">
            <motion.img
                    src="../images/v1.png"
                    className="left-curve"
                    alt="Left curve decoration"
                    initial="hidden"
                    animate="visible"
                    variants={leftCurveVariants}
                />
                <motion.img
                    src="../images/v2.png"
                    className="bottom-right-shape"
                    alt="Bottom right shape decoration"
                    initial="hidden"
                    animate="visible"
                    variants={bottomRightShapeVariants}
                />
                <motion.div 
                    className="not-found"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1>404 - Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link className="link" to="/login">Go to Login</Link>
                </motion.div>
                <Footer />
            </div>
        </>
    )
}

export default NotFound
