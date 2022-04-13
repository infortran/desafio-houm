import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Page from './Page'

const Home = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="main">
                <Page />
                <div className="main-background">
                    <img alt="bg-rick-morty" src={require('../../assets/images/background-rm.webp')}/>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home
