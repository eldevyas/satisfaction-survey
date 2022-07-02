import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
        <Head>
            <meta charSet="utf-8" />
            <link rel="icon" type="image/x-icon" href="/ico/favicon.ico" />
        </Head>
        <body className="custom_class">
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}