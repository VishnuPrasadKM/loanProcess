import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import RateLock from './rateLock';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineAppstore } from "react-icons/ai";

const CheckboxDropdown = () => {

  const [columnName, setcolumnName] = useState([]);
  const [arr, setArr]=useState([])
  
  useEffect((colStr) => {
    <Data colStr={colStr}/>
   }, [arr]);
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const names = [
  {name:'Loan Number', value:'loanNum' },
  {name:'Primary Borrower', value:'name'},
  {name:'Property Address', value:'address'},
  {name:'City', value:'city'},
  {name:'State', value:'state'},
  {name:'Loan Amount', value:'amount'},
  {name:'Loan Type', value:'type'},
  {name:'Product', value:'product'},
  {name:'Status', value:'status'},
  {name:'Days', value:'days'},
];
const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  const val={value};
    // <Data {...value}/>;
    setArr(arr=>[val])
    setcolumnName(
      typeof value === 'string' ? value.split(',') : value,
      );
}
// console.log(arr);

const handelSubmit = (arr) => {
  // console.log(arr[0].value);
  const colStr= "\'" +(arr[0].value).join("\',\'")+"\'";
  console.log(colStr);
  <Data colStr={colStr}/>
}

return (
  <div style={{display:'flex',alignItems:'center'}}>
    <FormControl sx={{ m: 1, width: 120 }}>
      <Select
        displayEmpty
        multiple
        value={columnName}
        onChange={handleChange}
        MenuProps={MenuProps}
        variant="standard"
        renderValue={()=>{return (<em><AiOutlineAppstore/> COLUMN</em>)}}
        style={{outline:'none',textDecorationLine:'none'}}
      >
        <MenuItem disabled value="">
            <em>Select to hide</em>
          </MenuItem>
        {names.map(({name,value}) => (
          <MenuItem key={name} value={value}>
            <Checkbox checked={columnName.indexOf(value) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
        <MenuItem>
          <button onClick={()=>{handelSubmit(arr)}}>Confirm</button>
        </MenuItem>
      </Select>
    </FormControl>
  </div>
);
}

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

const Data = ({colName}) => {

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

//   const showColumn=(colName)=>{
//     gridColumnApi.setColumnVisible(`${colName}`,hideColumn)
//     setHideColumn(!hideColumn)
//   }
// useEffect(()=>{
//   showColumn(colName)
// },[colName])

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