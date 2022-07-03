import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/index.css';
import '../styles/404.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}