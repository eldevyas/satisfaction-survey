import { toast } from 'react-toastify';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';


function pushSuccess(message) {
    return toast.success(`${message}`, {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: CheckCircleIcon,
        // toastId: 'Success'
    });
}

function pushFailure(message) {
    return toast.error(message, {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'Error'
    });
}

function pushWarning(message) {
    return toast.warning(message,{
        icon: <WarningIcon/>,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'warning'
    });
}

export { pushSuccess, pushFailure, pushWarning };