import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta key='desc' name='description' content='Next.js + Tailwind CSS' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
