import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Verification from './pages/Verification'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './private/ProtectedRoute'
import AdminRoutes from './routes/AdminRoutes'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Signup />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify" element={<Verification />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute roles={['admin']}>
                                <AdminRoutes />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App