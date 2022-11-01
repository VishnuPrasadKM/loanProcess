import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Data from '../Components/data'

afterEach(cleanup)
test('dropdown', () => {
    render(<Data />);
    const dropdown = screen.getByRole('presentation');
    expect(dropdown).toBeInTheDocument();
  });