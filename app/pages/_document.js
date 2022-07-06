import React, { useEffect } from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import Router from 'next/router';
import Loading from '../components/utils/Loader';




export default function Document() {
    const [loading, setLoading] = React.useState(false);


    Router.onRouteChangeStart = (url) => {
        setLoading(true);
    };

    Router.onRouteChangeComplete = (url) => {
        setLoading(false);
    };

    Router.onRouteChangeError = (err, url) => {
        setLoading(false);
    };


    return (
        <Html lang="id">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/x-icon" href="/ico/favicon.ico" />
                <script type="text/javascript" src="/plugins/jquery-3.6.0.min.js"></script>
            </Head>
            <body>
                <Loading loading={loading} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}