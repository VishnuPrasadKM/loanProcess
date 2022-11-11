import React, {useEffect, useState} from 'react'
import './compStyles.css'
import { Container } from 'react-bootstrap'
import {BsSearch} from 'react-icons/bs'
import CheckboxDropdown from './CheckboxDropdown'
import Header from './Reusable/header';
import Data from './data'


const LandingPage = () => {

  const [search, setSearch] = useState('')

  function Click(e) {
    console.log(search);
    <Data {...search}/>
    e.preventDefault();
    // further processing happens here
 }

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