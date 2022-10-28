import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import RateLock from './rateLock';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useNavigate } from 'react-router-dom';
import Waivers from './waivers';
import CheckboxDropdown from './checkboxDropdown';
import { FiRefreshCcw } from 'react-icons/fi';


const ModalComponent = (prams) =>{

  const navigate = useNavigate();

    return(
    <>
    <a onClick={()=>
      {
        let amt = prams.data.amount;
        <RateLock amount={amt} />;
        navigate(`/ratelock/?${prams.value}`)
      }}>
        {prams.value}</a>
    </>)
}

const Data = (props) => {

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

  const showColumn=(colName)=>{
    gridColumnApi.setColumnVisible(`${colName}`,hideColumn)
    setHideColumn(!hideColumn)
  }

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo(()=>({
     sortable: true,
     flex:0.9,
     resizable: true
   }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
   console.log(event.data.amount)
 }, []);

 // Example load data from sever
 useEffect(() => {
  console.log('refreshed');
   fetch('http://localhost:5000/api/data')
   .then(result => result.json())
   .then((rowData) => setRowData(rowData))
 }, [refresh]);

 return (
   <div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <button style={{background:'inherit', border:'none'}} onClick={() => setRefresh(!refresh)}><FiRefreshCcw style={{marginRight:'8px'}}/>Refresh</button>
        <CheckboxDropdown/>
      </div>
    {/* <button className='hiddenButton' onClick={()=>showColumn('loanNum')}>loan Number</button>
    <button className='hiddenButton' onClick={()=>showColumn('name')}>Primary Borrower</button>
    <button className='hiddenButton' onClick={()=>showColumn('address')}>Property Address</button>
    <button className='hiddenButton' onClick={()=>showColumn('city')}>City</button>
    <button className='hiddenButton' onClick={()=>showColumn('state')}>State</button>
    <button className='hiddenButton' onClick={()=>showColumn('amount')}>Loan Amount</button>
    <button className='hiddenButton' onClick={()=>showColumn('type')}>Loan Type</button>
    <button className='hiddenButton' onClick={()=>showColumn('product')}>Product</button>
    <button className='hiddenButton' onClick={()=>showColumn('status')}>Status</button>
    <button className='hiddenButton' onClick={()=>showColumn('days')}>Days</button> */}

     <div className="ag-theme-alpine" style={{height: 400}}>

       <AgGridReact
          //  ref={gridRef}
           rowData={rowData} // Row Data for Rows
           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties
            rowSelection='single' // Options - allows click selection of rows
           onCellClicked={cellClickedListener} // Optional - registering for Grid Event

        //    rowGroupPanelShow={'always'}
           pivotPanelShow={'always'}
           pagination={true}
           paginationPageSize={7}

           onGridReady={onGridReady}
           />
     </div>
   </div>
 );
};

export default Data;