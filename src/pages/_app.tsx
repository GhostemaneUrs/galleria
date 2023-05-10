import Head from 'next/head'
import '@/style/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '@/component/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Galleria</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta key='desc' name='description' content='Next.js + Tailwind CSS' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
