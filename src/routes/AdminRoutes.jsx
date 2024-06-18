import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../private/ProtectedRoute'
import Dashboard from '../pages/admin/Dashboard'
import NotFound from '../pages/admin/NorFound'

const AdminRoutes = () => {
    return (
        <ProtectedRoute roles={['admin']}>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        </ProtectedRoute>
    )
}

export default AdminRoutes
