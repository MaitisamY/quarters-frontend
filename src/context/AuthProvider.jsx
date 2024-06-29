import { createContext, useContext, useReducer } from 'react';

// Initial state
export const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
};

// Reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'REGISTER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        dispatch({ type: 'LOGIN', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
    };

    const register = (userData) => {
        dispatch({ type: 'REGISTER', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    };

    /* localStorage.removeItem('user'); */

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
