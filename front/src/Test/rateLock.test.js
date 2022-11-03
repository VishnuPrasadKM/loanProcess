import React from 'react';
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup } from '@testing-library/react';
import RateLock from '../Components/rateLock';

afterEach(cleanup)
test('input fields',()=>{
    render(<BrowserRouter><RateLock/></BrowserRouter>);
    const inputFields = screen.getAllByRole('textbox')
    expect(inputFields.length).toBe(2)
})

test('input fields',()=>{
    render(<BrowserRouter><RateLock/></BrowserRouter>);
    const from = screen.getByLabelText(/Valid From/i)
    const to = screen.getByLabelText(/expire/i)
    expect(from && to).toBeTruthy()
})

test('Page Name',()=>{
    render(<BrowserRouter><RateLock/></BrowserRouter>);
    const name = screen.getAllByText(/Rate Lock/i)
    expect(name).toBeTruthy()
})

test('should redirect to landing page', () => {
    render(<BrowserRouter><RateLock/></BrowserRouter>);

    userEvent.click(screen.getByTestId(/cancel/i));
    console.log(window.location.pathname)
    expect(window.location.pathname).toBe('/');
});

test('should redirect to ratelock fs page', () => {
    render(<BrowserRouter><RateLock/></BrowserRouter>);

    userEvent.click(screen.getByTestId(/fs-redirect/i));
    console.log(window.location.pathname)
    expect(window.location.pathname).toBe('/');
});