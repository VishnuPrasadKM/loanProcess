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
    <a onClick={()=>
      {
        <RateLock data={prams.data} />;
        let id = prams.data._id
        navigate(`/ratelock/${id}`)
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
    {headerName:"Loan Amount",field: "amount", flex:1},
    {headerName:"Loan Type",field: "type"},
    {headerName:"Product",field: "product"},
    {headerName:"Status",field: "status"},
    {headerName:"Days",field: "days", flex:0.6},
 ]);

 const onGridReady = (prams)=>{
    setGridApi(prams.api);
    setGridColumnApi(prams.columnApi);
  };

  const showColumn=(e)=>{
    let colHide = JSON.parse(sessionStorage.getItem('colHide'))
    e.preventDefault()
      if((JSON.stringify(colHide)) === '[]'){
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

    const [search, setSearch] = useState('')

    function Click(e) {
      e.preventDefault();
      gridApi.setQuickFilter(search)
   }

 return (
  <>
  <form >

    <div className="field">
      <input type="search" name="serch" id="search" 
        placeholder="Loan # | Pool Name | Pool ID | Client Name | Property Address" onChange={(e)=>{setSearch(e.target.value)}}/>
      <label htmlFor="search">Search</label>
    </div>

    <button data-tesid='search-button' type='submit' className='greyButton' style={{width:'8%', height:'35px', marginLeft:'25px'}} onClick={(e)=>Click(e)}><BsSearch/> Search</button>
    <div style={{marginLeft:'30%'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <CheckboxDropdown data-tesid='dropdown-check'/>
      </div>
    </div>
        <div>
          <div style={{display:'flex', alignItems:'baseline' , justifyContent:'flex-end'}}>
            <button onClick={(e)=>showColumn(e)} style={{background:'inherit', border:'none'}}><BiHide/></button>
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