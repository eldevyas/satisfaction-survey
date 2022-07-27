// Required Modules for functionality.
import Image from 'next/image';
import Router from 'next/router';
//
// Third Party Components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//
// Required Icons
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
//
// Required Functions and Services
import { pushSuccess } from '/services/alert';
//
// Layout Components
import ContentHeader from './Layout/ContentHeader';
//
// Dashboard Pages
import Statistiques from './Layout/Statistiques';

function ContentPages() {
    return(
        <>
            <Statistiques/>
        </>
    )
}


function Dashboard() {
    return(
        <>
            <ContentHeader />
            <ContentPages/>
        </>
    )
}



export default function PageContent () {
  return (
    <div className="DashboardContent">
        <div className="Content-Container">
            <Dashboard/>
        </div>
    </div>
  );
}