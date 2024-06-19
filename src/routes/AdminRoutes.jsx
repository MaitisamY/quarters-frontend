import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../private/ProtectedRoute'
import Dashboard from '../pages/admin/Dashboard'
import Referral from '../pages/admin/Referrals'
import NotFound from '../pages/admin/NotFound'

const AdminRoutes = () => {
    return (
        <ProtectedRoute roles={['admin']}>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="referrals" element={<Referral />} />
            </Routes>
        </ProtectedRoute>
    )
}

export default AdminRoutes
