import '../../styles/inner-app.css';
import '../../styles/header.css'
import '../../styles/footer.css'

import V1 from '../../assets/v1.png'
import V2 from '../../assets/v2.png'

import { motion } from 'framer-motion';

const NotFound = () => {

    const goBack = () => {
        window.history.back(); // This will navigate back one step in the browser history
    }

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
            <header>
                <img className="site-logo" src="../images/Vector.png" alt="logo" />
            </header>

            <div className="inner-app-container">
                <motion.img
                    src={V1}
                    className="left-curve"
                    alt="Left curve decoration"
                    initial="hidden"
                    animate="visible"
                    variants={leftCurveVariants}
                />
                <motion.img
                    src={V2}
                    className="bottom-right-shape"
                    alt="Bottom right shape decoration"
                    initial="hidden"
                    animate="visible"
                    variants={bottomRightShapeVariants}
                />
                <motion.div 
                    className="not-found"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                >
                    <h1>404 - Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <a className="link" onClick={goBack}>Go Back</a>
                </motion.div>
                <footer>
                    <p>© quarters {new Date().getFullYear()}</p>
                    <p>help@quarters.com</p>
                </footer>
            </div>
        </>
    )
}

export default NotFound
