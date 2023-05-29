import Head from 'next/head'
import '@/style/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '@/component/layout'
import { GalleryProvider } from '@/context/galleries'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Galleria</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <GalleryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GalleryProvider>
    </>
  )
}
