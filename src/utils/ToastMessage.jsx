import { toast } from 'react-toastify';

export const SuccessToastDark = (message, duration) => {
    toast.success(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });
};

export const ErrorToastDark = (message, duration) => {
    toast.error(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });
};

export const SuccessToastLight = (message, duration) => {
    toast.success(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
}

export const ErrorToastLight = (message, duration) => {
    toast.error(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
}

export const SuccessToastColored = (message, duration) => {
    toast.success(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
}

export const ErrorToastColored = (message, duration) => {
    toast.error(message, {
        position: 'bottom-center',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
}