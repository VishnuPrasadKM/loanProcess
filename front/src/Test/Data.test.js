import React from 'react'
import { cleanup, render, screen } from '@testing-library/react';
import {expect, jest, test} from '@jest/globals';
import Data from '../Components/data'
import {BrowserRouter} from 'react-router-dom';

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