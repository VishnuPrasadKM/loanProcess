import React, { useState, useEffect, useMemo, useCallback} from 'react';    
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineAppstore } from "react-icons/ai";

const CheckboxDropdown = () => {

  const [columnName, setcolumnName] = useState([]);
  const [arr, setArr]=useState([])
  
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
const HandleChange = (event) => {
  const {
    target: { value },
  } = event;
  const val={value};
    // <Data {...value}/>;
    setArr(arr=>[val])
    setcolumnName(
      typeof value === 'string' ? value.split(',') : value,
      );
        // handelSubmit(arr)
}

// console.log(arr);

const handelSubmit = (arr) => {
//   console.log(arr[0].value);
  sessionStorage.setItem("colHide", JSON.stringify(arr[0].value));
//   <Data data={'pass'}/>
  // Data('data')
//   console.log("occured")
}

return (
  <div style={{display:'flex',alignItems:'center'}}>
    <FormControl sx={{ m: 1, width: 120 }}>
      <Select
        displayEmpty
        multiple
        value={columnName}
        onChange={HandleChange}
        MenuProps={MenuProps}
        variant="standard"
        renderValue={()=>{return (<em><AiOutlineAppstore/> COLUMN</em>)}}
        style={{outline:'none',textDecorationLine:'none'}}
      >
        <MenuItem disabled value="">
            <em>Select and Confirm</em>
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

export default CheckboxDropdown;