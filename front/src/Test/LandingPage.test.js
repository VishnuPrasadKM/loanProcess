import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from '../Components/landingPage';
import MockedCheckBox from '../Components/CheckboxDropdown'

jest.mock('../Components/CheckboxDropdown', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([]),
}));

afterEach(cleanup)

test('render search box', () => {
  render(<LandingPage />);
  const searchBox = screen.getAllByRole("searchbox");
  expect(searchBox).toBeTruthy();
});

test('render search button', () => {
  render(<LandingPage />);
  const searchButton = screen.getAllByRole("button");
  expect(searchButton).toBeTruthy();
});

test('to have place holder text', () => {
  render(<LandingPage />);
  const placeholderText = screen.getByPlaceholderText(/loan/i);
  expect(placeholderText).toMatchObject(/name/i && /pool/i && /address/i && /id/i);
});