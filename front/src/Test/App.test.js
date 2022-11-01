import { render, screen } from '@testing-library/react';
import App from '../App';
import Header from '../Components/Reusable/header';

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