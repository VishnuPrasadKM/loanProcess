import {render, screen} from '@testing-library/react'

test('dropdown', () => {
    render(<Data />);
    const dropdown = screen.getByRole('presentation');
    expect(dropdown).toBeInTheDocument();
  });