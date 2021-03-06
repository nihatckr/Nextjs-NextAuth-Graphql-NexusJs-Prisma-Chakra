import React from 'react'
import Navbar from '../Navbar'
import Head from 'next/head'
import Image from 'next/image'
interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}</>
    )
}

export default Layout