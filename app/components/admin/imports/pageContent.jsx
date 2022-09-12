// Required Modules for functionality.
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
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
import { DashboardContext } from './../dashboard';
//
// Layout Components
import ContentHeader from './Layout/ContentHeader';
//
// Dashboard Pages
import Statistiques from './Layout/Statistiques';
import Gérer from './Layout/Gérer';
import Ajouter from './Layout/Ajouter';

function ContentPages() {


    const MainVariants  = {
        hidden: { opacity: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0},
        exit: { opacity: 0, y: 0, x: 200 }
    }

    // Get the current page from the context
    const { currentPage, navigatePages } = useContext(DashboardContext);


    const pages = {
        Statistiques,
        Gérer,
        Ajouter
    }

    const Page = pages[currentPage];

    return(
        <>

            <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                <motion.div className='Pages' key={ currentPage } initial="hidden"  animate="enter" exit="exit" variants={MainVariants} transition={{ type: 'linear' }}>
                    <Page/>
                </motion.div>
            </AnimatePresence>
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