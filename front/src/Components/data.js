import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import RateLock from './rateLock';
import CheckboxDropdown from './CheckboxDropdown';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';
import {BiHide} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'

const ModalComponent = (prams) =>{

  const navigate = useNavigate();
  // const [click, setClick] = useState(false)
    return(
    <>
    <a onClick={()=>
      {
        // let amt = prams.data.amount;
        console.log(prams.data);
        let data = prams.data;
        console.log(typeof(data));
        <RateLock {...data} />;
        // console.log(prams)
        // console.log(prams.data._id)
        // setClick(true)
        window.sessionStorage.setItem('clicked', true)
        navigate(`/ratelock/?${prams.data._id}`)
      }}>
        {prams.value}</a>
    </>)
}


const Data = () => {
// console.log('hello')
//  let colHide = sessionStorage.getItem('colHide')


 const [gridApi, setGridApi] = useState(null)
 const [gridColumnApi, setGridColumnApi] = useState(null)
 const [hideColumn, setHideColumn] = useState(false)
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 const [refresh, setRefresh] = useState(false)

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
    // console.log(JSON.stringify(colHide))
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
  // console.log('refreshed');
  fetchData()
  //  sessionStorage.removeItem('colHide')
 }, [refresh]);

    const fetchData=()=>{
      fetch('http://localhost:5000/api/data')
      .then(result => result.json())
      .then((rowData) => setRowData(rowData))
      // rowData.preventDefault() 
    }


    const [search, setSearch] = useState('')

    function Click(e) {
      e.preventDefault();
      console.log(search);
      gridApi.setQuickFilter(search)
      // further processing happens here
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
            {/* <button style={{background:'inherit', border:'none'}} onClick={() => setRefresh(!refresh)}><FiRefreshCcw style={{marginRight:'8px'}}/></button> */}
            <button onClick={(e)=>showColumn(e)} style={{background:'inherit', border:'none'}}><BiHide/></button>
          </div>
        </div>
  </form>

     <div className="ag-theme-alpine" style={{height: 400}}>

       <AgGridReact
          //  ref={gridRef}
           rowData={rowData} // Row Data for Rows
           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties
            rowSelection='single' // Options - allows click selection of rows
          //  onCellClicked={cellClickedListener} // Optional - registering for Grid Event

        //    rowGroupPanelShow={'always'}
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