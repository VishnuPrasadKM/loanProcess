import React from 'react'
import { cleanup, render, screen } from '@testing-library/react';
import {expect, jest, test} from '@jest/globals';
import Data from '../Components/data'
import {BrowserRouter} from 'react-router-dom';

// {const Data = require('../Components/data');
// jest.mock('../Components/data'); 

// const mockMeathod = jest.fn();

// jest.mock('../Components/CheckboxDropdown', () => ({
//   __esModule: true,
//   default: mockFn.mockResolvedValue([]),
// }));
// Data.mockImplementation(() => ({
//   __esModule: true,
//   default: mockFn.mockResolvedValue([]),
// }));

afterEach(cleanup)

test("checks for presenting component", () => {
  render(<BrowserRouter><Data /></BrowserRouter>);
  let label = screen.getAllByRole("presentation");
  expect(label).toBeTruthy()
});

test("checks for button", () => {
  render(<BrowserRouter><Data /></BrowserRouter>);
  let label = screen.getAllByRole("button");
  expect(label).toBeTruthy()
});

// import {AgGridReact} from 'ag-grid-react';
// import {mount} from 'enzyme';
// import {act} from "@testing-library/react";
// import Data from '../Components/data';

// let component = null;
// let agGridReact = null;

// const ensureGridApiHasBeenSet = async (componentRef) => {
//     await act(async () => {
//         await new Promise(function (resolve, reject) {
//             (function waitForGridReady() {
//                 if (componentRef.current.getApi()) {
//                     if (componentRef.current.getApi().getRowNode(8)) {
//                         return resolve();
//                     }

//                 }
//                 setTimeout(waitForGridReady, 10);
//             })();
//         })

//     });
// };

// beforeEach(async () => {
//     const ref = React.createRef()
//     component = mount(<Data ref={ref}/>);
//     agGridReact = component.find(AgGridReact).instance();
//     await ensureGridApiHasBeenSet(ref);
// });

// afterEach(() => {
//     component.unmount();
//     agGridReact = null;
// })