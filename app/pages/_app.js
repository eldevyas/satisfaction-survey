import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/index.css';
import '../styles/404.css';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import $ from 'jquery';
import { AuthContextProvider } from '/contexts/authContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps: { session, ...pageProps }, router}) {

    const url = `http://localhost:3000${router.route}`

    const MainVariants  = {
        hidden: { opacity: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0},
        exit: { opacity: 0, y: 0, x: -200 }
    }

    return (
        <>
            <AuthContextProvider>
                <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                    <motion.div className={"container"} key={router.route} initial="hidden"  animate="enter" exit="exit" variants={MainVariants} transition={{ type: 'linear' }}>
                        <Component {...pageProps} canonical={url} key={url}/>
                    </motion.div>
                </AnimatePresence>

                <ToastContainer 
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={true}
                    pauseOnHover
                    transition= {Flip}
                    limit={3}
                />
            </AuthContextProvider>
        </>
    );
}

