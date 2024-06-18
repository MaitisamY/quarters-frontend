import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthProvider'

const ProtectedRoute = ({ roles, children }) => {
    const { admin } = useAdminAuth();

    if (!admin) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(admin.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute