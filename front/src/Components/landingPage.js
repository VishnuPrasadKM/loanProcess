import React from 'react'
import './compStyles.css'
import { Container } from 'react-bootstrap'
import {BsSearch} from 'react-icons/bs'
import CheckboxDropdown from './CheckboxDropdown'
import Header from './Reusable/header';
import Data from './data'


const LandingPage = () => {

  function Click(e) {
    e.preventDefault();
    // further processing happens here
 }
  return (
    <div>
    <Header/>
    <span style={{fontSize:'30px', fontWeight:'bold', padding:'15px 0 5px 40px', display:'flex'}}>All Loans</span>
   
  <form style={{boxSizing:'border-box'}}>
    <div className="field">
      <input type="search" name="serch" id="search" 
        placeholder="Loan # | Pool Name | Pool ID | Client Name | Property Address"/>
      <label htmlFor="search">Search</label>
    </div>
    <button data-tesid='search-button' type='submit' className='greyButton' style={{width:'8%', height:'35px', marginLeft:'25px'}} onClick={Click}><BsSearch/>  Search</button>
    <div style={{marginLeft:'30%'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <CheckboxDropdown data-tesid='dropdown-check'/>
      </div>
    </div>
  </form>
    <Container>
        <Data/>
    </Container>
    </div>
  )
}

export default LandingPage