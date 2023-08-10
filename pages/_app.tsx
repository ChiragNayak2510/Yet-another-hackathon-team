import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import {SessionProvider} from 'next-auth/react'

import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
// import Modal from '@/components/Modal'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import Input from '@/components/Input'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* <Modal isOpen title="test modal" actionLabel="Submit"/> */}
    <SessionProvider session = {pageProps.session}>
      <Toaster/>
    <RegisterModal/>
    <LoginModal/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
    </>
    
 )
  }
