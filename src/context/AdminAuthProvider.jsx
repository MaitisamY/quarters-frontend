import { createContext, useContext, useReducer } from 'react'

// Initial state for admin
export const initialAdminState = {
    admin: JSON.parse(localStorage.getItem('admin')) || null,
}

// Reducer function for admin
export const adminAuthReducer = (state, action) => {
    switch (action.type) {
        case 'ADMIN_LOGIN':
            return { ...state, admin: action.payload };
        case 'ADMIN_LOGOUT':
            return { ...state, admin: null };
        case 'ADMIN_REGISTER':
            return { ...state, admin: action.payload };
        default:
            return state;
    }
}

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminAuthReducer, initialAdminState);

    const adminLogin = (adminData) => {
        dispatch({ type: 'ADMIN_LOGIN', payload: adminData });
        localStorage.setItem('admin', JSON.stringify(adminData));
    };

    const adminLogout = () => {
        dispatch({ type: 'ADMIN_LOGOUT' });
        localStorage.removeItem('admin');
    };

    const adminRegister = (adminData) => {
        dispatch({ type: 'ADMIN_REGISTER', payload: adminData });
        localStorage.setItem('admin', JSON.stringify(adminData));
    };

    return (
        <AdminAuthContext.Provider value={{ admin: state.admin, adminLogin, adminLogout, adminRegister }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);