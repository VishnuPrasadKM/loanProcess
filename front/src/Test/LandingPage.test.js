import { render, screen } from '@testing-library/react';
import LandingPage from '../Components/landingPage';

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