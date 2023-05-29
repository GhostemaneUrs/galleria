import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' href='/icon-128x128.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='apple-touch-icon' href='/icon-128x128.png' />
        <meta key='desc' name='description' content='Next.js + Tailwind CSS' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
