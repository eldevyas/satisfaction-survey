import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/index.css';
import '../styles/404.css';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import $ from 'jquery';

export default function MyApp({ Component, pageProps }) {


    return (
        <>
            <Component {...pageProps} />
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
        </>
    );
}