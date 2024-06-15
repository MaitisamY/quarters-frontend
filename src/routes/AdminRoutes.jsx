import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../private/ProtectedRoute'
import Dashboard from '../pages/admin/Dashboard'

const AdminRoutes = () => {
    return (
        <ProtectedRoute roles={['admin']}>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        </ProtectedRoute>
    )
}

export default AdminRoutes
