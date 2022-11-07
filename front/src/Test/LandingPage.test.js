import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from '../Components/landingPage';

const checkBoxDropDown = jest.fn(()=>({
  __esModule: true,
  default: jest.fn().mockResolvedValue([])
}))

afterEach(cleanup)

test('render search box', () => {
  render(<LandingPage />);
  const searchBox = screen.getAllByRole("searchbox");
  expect(searchBox).toBeTruthy();
});

test('render search button', () => {
  render(<LandingPage />);
  const searchButton = screen.getByLabelText(/search/i);
  expect(searchButton).toBeTruthy();
});

test('to have place holder text', () => {
  render(<LandingPage />);
  const placeholderText = screen.getByPlaceholderText(/loan/i);
  expect(placeholderText).toMatchObject(/name/i && /pool/i && /address/i && /id/i);
});

test('dropdown button to be called',()=>{
  render(<LandingPage/>)
  expect(screen.findByTestId("dropdown-check")).not.toBeNull();
})