import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LeadTimes from './LeadTimes';

test('sees the Lead Time header', () => {
  render(<LeadTimes />);
  const titleElement = screen.getByText(/^Lead Time$/);
  expect(titleElement).toBeInTheDocument();
});

test('sees "From code to pushed to code deployed: on page', () => {
  render(<LeadTimes />);
  const codePushedElement = screen.getByText(
    /^From code pushed to code deployed:$/
  );
  expect(codePushedElement).toBeInTheDocument();
});

test('sees input element with label of "Change Lead Time (in minutes)"', () => {
  render(<LeadTimes />);
  const labelElement = screen.getByLabelText(/Change Lead Time \(in minutes\)/);
  expect(labelElement).toBeInTheDocument();
});

test('sees button element with label of "Update Lead Time"', () => {
  render(<LeadTimes />);
  const ButtonElement = screen.getByRole('button', {
    name: 'Update Lead Time',
  });
  expect(ButtonElement).toBeInTheDocument();
});

test('when 9 is entered, and the button is clicked, the words: "9 minutes" appears on screen', () => {
  render(<LeadTimes />);
  const buttonElement = screen.getByRole('button', {
    name: 'Update Lead Time',
  });
  const inputElement = screen.getByLabelText(/Change Lead Time \(in minutes\)/);
  userEvent.type(inputElement, '9');
  userEvent.click(buttonElement);
  expect(screen.getByText(/9 minutes/));
});

test('when 1 is entered, and the button is clicked, the words: "1 minute" appears on screen', () => {
  render(<LeadTimes />);
  const buttonElement = screen.getByRole('button', {
    name: 'Update Lead Time',
  });
  const inputElement = screen.getByLabelText(/Change Lead Time \(in minutes\)/);
  userEvent.type(inputElement, '1');
  userEvent.click(buttonElement);
  expect(screen.getByText(/1 minute/));
});

test('when 1 is entered and the button is clicked, and the page is refreshed, the lead time number persists', () => {
  render(<LeadTimes />);
  const buttonElement = screen.getByRole('button', {
    name: 'Update Lead Time',
  });
  const inputElement = screen.getByLabelText(/Change Lead Time \(in minutes\)/);
  userEvent.type(inputElement, '1');
  userEvent.click(buttonElement);
  cleanup();
  render(<LeadTimes />);
  expect(screen.getByText(/1 minute/));
});
