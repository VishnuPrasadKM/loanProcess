import React, { useState, useEffect, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import RateLock from './rateLock';
import CheckboxDropdown from './CheckboxDropdown';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useNavigate } from 'react-router-dom';
import {BiHide} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'

const ModalComponent = (prams) =>{

  const navigate = useNavigate();
    return(
    <>
    <a style={{cursor:'pointer', textDecoration:'none'}} className='redirect' onClick={()=>
      {
        <RateLock data={prams.data} />;
        let id = prams.data._id
        navigate(`/ratelock/${id}`)
      }}>
        {prams.value}</a>
    </>)
}

const WaiverModalComponent = (prams) =>{

  const navigate = useNavigate();
    return( 
    <>
    <a style={{cursor:'pointer', textDecoration:'none'}} className='redirect' onClick={()=>
      {
        let id = prams.data._id;
        window.sessionStorage.setItem('amount', prams.data.amount)
        navigate(`/waivers/${id}`)
      }}>
        {prams.value}</a>
    </>)
}

const Data = () => {

 const [gridApi, setGridApi] = useState(null)
 const [gridColumnApi, setGridColumnApi] = useState(null)
 const [hideColumn, setHideColumn] = useState(false)
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
    {
      headerName:"Loan Number", 
      field:"loanNum",
      flex:1,
      cellRenderer: ModalComponent,
    },
    {headerName:"Primary Borrower", field: "name", flex:1.2,},
    {headerName:"Property Address",field: "address", flex:1.3},
    {headerName:"City",field: "city", flex:0.7},
    {headerName:"State",field: "state", flex:0.6},
    {headerName:"Loan Amount",field: "amount", flex:1, cellRenderer: WaiverModalComponent,},
    {headerName:"Loan Type",field: "type"},
    {headerName:"Product",field: "product"},
    {headerName:"Status",field: "status"},
    {headerName:"Days",field: "days", flex:0.6},
 ]);

 const onGridReady = (prams)=>{
    setGridApi(prams.api);
    setGridColumnApi(prams.columnApi);
  };

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value)
  };
  const  Click = (e) => {
    e.preventDefault();
 }

  const showColumn=(e)=>{
    let colHide = JSON.parse(sessionStorage.getItem('colHide'))
    e.preventDefault()
      if(((JSON.stringify(colHide)) === '[]')||(colHide===null)){
        alert('Please Select any Option')
      }
      else{
      gridColumnApi.setColumnsVisible(colHide, hideColumn)
      setHideColumn(!hideColumn)
    }
  }

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo(()=>({
     sortable: true,
     flex:0.9,
     resizable: true
   }));

 // Example load data from sever
 useEffect(() => {
  fetchData()
 }, []);

    const fetchData=()=>{
      fetch('http://localhost:5000/api/data/loandata')
      .then(result => result.json())
      .then((rowData) => setRowData(rowData))
    }



 return (
  <>
  <form >

    <div className="field">
      <input type="search" name="serch" id="search" 
        placeholder="Loan # | Pool Name | Pool ID | Client Name | Property Address" onChange={onFilterTextChange}/>
      <label htmlFor="search">Search</label>
    </div>

    <button data-tesid='search-button' type='submit' className='primary' style={{display:'flex', width:'8%', height:'35px', marginLeft:'25px', borderRadius:'5px', border:'none', backgroundColor:'blue', color:'white', alignItems:'center'}} onClick={(e)=>Click(e)}><BsSearch style={{margin:'6px'}}/> Search</button>
    <div style={{marginLeft:'30%'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <CheckboxDropdown data-tesid='dropdown-check'/>
      </div>
    </div>
        <div>
          <div style={{display:'flex', alignItems:'baseline' , justifyContent:'flex-end'}}>
            <button onClick={(e)=>showColumn(e)} style={{background:'inherit', border:'none', marginBottom: '5px'}}><BiHide/></button>
          </div>
        </div>
  </form>

     <div className="ag-theme-alpine" style={{height: 400}}>

       <AgGridReact
           rowData={rowData} // Row Data for Rows
           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties
            rowSelection='single' // Options - allows click selection of rows

           pivotPanelShow={'always'}
           pagination={true}
           paginationPageSize={7}

           onGridReady={onGridReady}
           />
     </div>
   </>
 );
};
window.onunload = function(){
sessionStorage.clear()
}

export default Data;