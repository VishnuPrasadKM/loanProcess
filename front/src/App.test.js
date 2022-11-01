import { render, screen } from '@testing-library/react';
import App from './App';
import Data from './Components/data';
import LandingPage from './Components/landingPage';
import Header from './Components/Reusable/header';

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

// test('dropdown', () => {
//   render(<Data />);
//   const dropdown = screen.getByRole('presentation');
//   expect(dropdown).toBeInTheDocument();
// });