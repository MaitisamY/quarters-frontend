import '../../styles/inner-app.css';
import '../../styles/header.css'
import '../../styles/footer.css'

import { useAuth } from "../../context/AuthProvider"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdLogout } from 'react-icons/md';

import PaginatedItems from '../../components/Pagination';

const Dashboard = () => {

    const { user, logout } = useAuth()

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

    document.title = `Quarters | ${user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || 'Admin'} | Dashboard`;

    if (!user) {
        navigate('/login');
    }

    console.log(user);

    return (
        <>
            <header>
                <img className="site-logo" src="../images/Vector.png" alt="logo" />
            </header>

            <div className="inner-app-container">
                
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
                    className="inner-app-box"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="inner-app-box-header">
                        <h1 
                            style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%', 
                                padding: '10px 0', 
                                borderBottom: '1px solid #f2f2f2' 
                            }}
                        >
                            <span>Dashboard</span>
                            <div style={{ fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                Hi! {user?.name} 
                                <a className="logout-button" onClick={logout}>
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

export default Dashboard