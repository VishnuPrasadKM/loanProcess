import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Components/Reusable/header';

afterEach(cleanup)
test('renders Header', () => {
  render(<Header />);
  const headerName = screen.getByText(/Logo/i);
  expect(headerName).toBeInTheDocument();
});

test('renders project title', () => {
  render(<Header />);
  const title = screen.getByText(/project name/i);
  expect(title).toBeInTheDocument();
});