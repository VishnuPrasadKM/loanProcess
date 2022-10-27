import React, {Suspense} from 'react'
import './compStyles.css'
import { Container } from 'react-bootstrap'
import {BsSearch} from 'react-icons/bs'
import {FiRefreshCcw} from 'react-icons/fi'
import Header from './Reusable/header';
import CheckboxDropdown from './checkbox/checkboxDropdown'

const Data = React.lazy(() => import("./data"));


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
      <input type="text" name="serch" id="search" 
        placeholder="Loan # | Pool Name | Pool ID | Client Name | Property Address"/>
      <label htmlFor="search">Search</label>
    </div>
    <button className='greyButton' style={{width:'8%', height:'35px', marginLeft:'25px'}} onClick={Click}><BsSearch/>  Search</button>
    <div style={{marginLeft:'30%'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <button style={{background:'inherit', border:'none'}} onClick={() => window.location.reload(false)}><FiRefreshCcw style={{marginRight:'8px'}}/>Refresh</button>
        <CheckboxDropdown/>
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