import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CheckboxDropdown from '../Components/CheckboxDropdown';
import userEvent from '@testing-library/user-event'

afterEach(cleanup)
test('dropdown', () => {
    render(<CheckboxDropdown />);
    let dropdown = screen.getByTestId('dropdown')
    expect(dropdown).toBeInTheDocument();
});

test("increments counter", () => {
    render(<CheckboxDropdown />);
    let dropdownButton = screen.getByTestId("dropdown");
    userEvent.click(dropdownButton)
    expect(screen.getByRole("button")).toBeInTheDocument()
});

test("Check checkbox defined", () => {
    render(<CheckboxDropdown />);
    let dropdownButton = screen.getByTestId("dropdown");
    userEvent.click(dropdownButton)
    expect(userEvent.click(screen.getByRole('button'))).toBeDefined()
});