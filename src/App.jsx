import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { AdminAuthProvider } from './context/AdminAuthProvider'
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Verification from './pages/Verification'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import ProtectedRoute from './private/ProtectedRoute'
import AdminRoutes from './routes/AdminRoutes'



const App = () => {
    return (
        <AuthProvider>
            <AdminAuthProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Signup />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify" element={<Verification />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
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
            </AdminAuthProvider>
        </AuthProvider>
    )
}

export default App