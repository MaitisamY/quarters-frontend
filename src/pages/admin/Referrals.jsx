import '../../styles/inner-app.css';
import '../../styles/header.css'
import '../../styles/footer.css'

import V1 from '../../assets/v1.png'
import V2 from '../../assets/v2.png'

import { useAdminAuth } from "../../context/AdminAuthProvider"
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdLogout } from 'react-icons/md';

import PaginatedItems from '../../components/ReferralPagination';

const Referrals = () => {

    const { admin, adminLogout } = useAdminAuth();

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

    document.title = `Quarters | ${admin?.role.charAt(0).toUpperCase() + admin?.role.slice(1) || 'Admin'} | Referrals`;

    if (!admin) {
        navigate('/login');
    }

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
                    className="inner-app-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                >
                    <div className="inner-app-box-header">
                        <h1>
                            <span><Link className="link" to="/admin/dashboard">Dashboard</Link> Referrals</span>
                            <div className="user">
                                Hi! {admin?.name} 
                                <a className="logout-button" onClick={adminLogout}>
                                    <MdLogout size={20} />
                                </a>
                            </div>
                        </h1>
                        <h3>Users raw data</h3>
                    </div>

                    <PaginatedItems itemsPerPage={10} />
                </motion.div>

                <footer>
                    <p>© quarters {new Date().getFullYear()}</p>
                    <p>help@quarters.com</p>
                </footer>
            </div>
        </>
    )
}

export default Referrals