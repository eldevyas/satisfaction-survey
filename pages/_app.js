import React from 'react';
import Router from 'next/router';
import Loading from '../components/utils/Loader';
import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/index.css';


export default function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = React.useState(true);


    Router.onRouteChangeStart = (url) => {
        setLoading(false);
    };

    Router.onRouteChangeComplete = (url) => {
        setLoading(false);
    };

    Router.onRouteChangeError = (err, url) => {
        setLoading(false);
    };

    // Set the state to laoding when the page is loading
    React.useEffect(() => {
        if (Router.router.pathname === '/') {
            setTimeout(() => {
                setLoading(false);
            }, 2500);
        }
    });


    return (
        <>
            <Loading loading={loading} />
            <Component {...pageProps} />
        </>
    );
}