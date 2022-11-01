import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from '../Components/landingPage';

afterEach(cleanup)
test('render search box', () => {
  render(<LandingPage />);
  const searchBox = screen.getByRole("searchbox");
  expect(searchBox).toBeInTheDocument();
});

test('render search button', () => {
  render(<LandingPage />);
  const searchButton = screen.getByRole("button");
  expect(searchButton).toBeInTheDocument();
});