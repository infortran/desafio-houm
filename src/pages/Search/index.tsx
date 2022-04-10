import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Page from './Page'

const Search = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="main">
                <Page />
                <div className="main-background">
                    <img src={require('../../assets/images/background-rm.webp')}/>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Search
