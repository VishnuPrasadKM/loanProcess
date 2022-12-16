import React from 'react'
import './compStyles.css'
import { Container } from 'react-bootstrap'
import Header from './Reusable/header';
import Data from './data'

const LandingPage = () => {
  return (
    <div>
    <Header/>
    <span style={{fontSize:'30px', fontWeight:'bold', padding:'15px 0 5px 40px', display:'flex'}}>All Loans</span>
    <Container>
        <Data/>
    </Container>
    </div>
  )
}

export default LandingPage