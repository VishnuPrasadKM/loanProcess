import React from 'react'
import './compStyles.css'
import { Container, Dropdown} from 'react-bootstrap'
import Data from './data';
import Header from './Reusable/header';
import {BsSearch} from 'react-icons/bs'
import { useLocalStore } from "mobx-react-lite";
import { CheckboxDropdown } from './checkbox/checkboxDropdown';
import {FiRefreshCcw} from 'react-icons/fi'


const LandingPage = () => {

  function Click(e) {
    e.preventDefault();
    // further processing happens here
 }

 const state = useLocalStore(() => ({
  items: [
    { id: "em", label: "Loan Number", checked: true },
    { id: "f", label: "Primary Borrower", checked: true },
    { id: "mw", label: "Property Address", checked: true },
    { id: "cp1", label: "City", checked: true },
    { id: "cp2", label: "State", checked: true },
    { id: "cp3", label: "Loan Amount", checked: true },
    { id: "cp4", label: "Loan Type", checked: true },
    { id: "cp5", label: "Product", checked: true },
    { id: "cp6", label: "Status", checked: true },
    { id: "cp7", label: "Days", checked: true },
    ]
}));

// const scrambleAndRefreshAll = useCallback(() => {
//   scramble();
//   var params = {
//     force: isForceRefreshSelected(),
//     suppressFlash: isSuppressFlashSelected(),
//   };
//   gridRef.current.api.refreshCells(params);
// }, []);

  return (
    <div>
    <Header display/>
    <span style={{fontSize:'30px', fontWeight:'bold', padding:'15px 0 5px 40px', display:'flex'}}>All Loans</span>
   
  <form>
    <div className="field">
      <input type="text" name="serch" id="search" 
        placeholder="Loan # | Pool Name | Pool ID | Client Name | Property Address"/>
      <label htmlFor="search">Search</label>
    </div>
    <button className='greyButton' style={{width:'8%', height:'35px', marginLeft:'25px'}} onClick={Click}><BsSearch/>  Search</button>
    <div style={{marginLeft:'32%'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        {/* <button style={{background:'inherit', border:'none'}} onClick={scrambleAndRefreshAll}><FiRefreshCcw style={{marginRight:'8px'}}/></button> */}
        <CheckboxDropdown items={state.items} />
      </div>
    </div>
  </form>
    <Container>
    <div><Data/></div>
    </Container>
    </div>
  )
}

export default LandingPage