import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const ProtectedRoute = ({ roles, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute