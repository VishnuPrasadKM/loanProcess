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
    // render the component on virtual dom
    render(<CheckboxDropdown />);
    
    //select the elements you want to interact with
    let dropdownButton = screen.getByTestId("dropdown");
    // const checkbox = screen.getByTestId("increment");
    userEvent.click(screen.getByTestId('dropdown'))
    expect(
        screen.getByRole("button", {
            name: "Flyout button",
            expanded: true,
        })
    ).toBeInTheDocument();
    
    // act(() => {
    //     // button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    //     //interact with those elements
    //     dropdownButton.dispatchEvent(new MouseEvent("click"));
    //   });
    
    // //assert the expected result
    // expect(onChange).toHaveBeenCalledTimes(1);
    // expect(dropdownButton.innerHTML).toHave(screen.getByRole('checkbox'));
    // // expect(dropdown).toHave(screen.getByRole('checkbox'));
    });