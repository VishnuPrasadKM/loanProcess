import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import RateLock from './rateLock';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useNavigate } from 'react-router-dom';
import Waivers from './waivers';


const ModalComponent = (prams) =>{

  const navigate = useNavigate();

    return(
    <>
    <a onClick={()=>
      {
        // console.log(prams.data.amount);
        let amt = prams.data.amount;
        <RateLock amount={amt} />;
        navigate(`/ratelock/?${prams.value}`)
      }}>
        {prams.value}</a>
    </>)
}

const Data = (props) => {
 
 console.log(props);
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
    {headerName:"Primary Borrower", field: "name", flex:1.2,suppressToolPanel: true},
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

  const showColumn=(value)=>{
    gridColumnApi.setColumnVisible(`${value}`,hideColumn)
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
   fetch('http://localhost:5000/api/data')
   .then(result => result.json())
   .then((rowData) => setRowData(rowData))
 }, []);

 return (
   <div>
    <button onClick={()=>showColumn('loanNum')}>loan Number</button>
    <button onClick={()=>showColumn('name')}>Primary Borrower</button>
    <button onClick={()=>showColumn('address')}>Property Address</button>
    <button onClick={()=>showColumn('city')}>City</button>
    <button onClick={()=>showColumn('state')}>State</button>
    <button onClick={()=>showColumn('amount')}>Loan Amount</button>
    <button onClick={()=>showColumn('type')}>Loan Type</button>
    <button onClick={()=>showColumn('product')}>Product</button>
    <button onClick={()=>showColumn('false')}>Status</button>
    <button onClick={()=>showColumn('days')}>Days</button>

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
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