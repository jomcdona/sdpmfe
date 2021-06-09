import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Deployments from './Deployments';

test('sees the Deployments header', () => {
  render(<Deployments />);
  const titleElement = screen.getByText(/^Deployments$/);
  expect(titleElement).toBeInTheDocument();
});

test('sees input element with label of "Deployment Date"', () => {
  render(<Deployments />);
  const labelElement = screen.getByLabelText(/Deployment Date/);
  expect(labelElement).toBeInTheDocument();
});

test('sees input element with label "Deployment Time"', () => {
  render(<Deployments />);
  const labelElement = screen.getByLabelText(/Deployment Time/);
  expect(labelElement).toBeInTheDocument();
});
test('sees a button element with the name of "Add Deployment"', () => {
  render(<Deployments />);
  const buttonElement = screen.getByRole('button', { name: 'Add Deployment' });
  expect(buttonElement).toBeInTheDocument();
});

test('enters date 01/02/2021', () => {
  render(<Deployments />);

  const inputElement = screen.getByLabelText(/^Deployment Date$/);
  userEvent.type(inputElement, '2021-10-22');
  expect(inputElement.value).toBe('2021-10-22');
});

test('enters time 010203AM', () => {
  render(<Deployments />);

  const inputElement = screen.getByLabelText(/^Deployment Time$/);
  userEvent.type(inputElement, '01:02');
  expect(inputElement.value).toBe('01:02');
});

test('clicking the button makes the date appear in list', () => {
  render(<Deployments />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  userEvent.type(dateElement, '2021-10-22');
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  userEvent.type(timeElement, '0102');
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('10/22/2021 1:02:00 AM'));
});

test('see "Frequency:" on page', () => {
  render(<Deployments />);
  const frequencyElement = screen.getByText(/Frequency:/);
  expect(frequencyElement).toBeVisible();
});

test('see 4/week after adding 4 deployments on the same day', () => {
  render(<Deployments />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 4; i++) {
    userEvent.type(dateElement, '2021-10-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button'));
  }
  expect(screen.getByText(/4\/week/));
});

test('see 4/week after adding 4 deployments on the same day', () => {
  render(<Deployments />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 2; i++) {
    userEvent.type(dateElement, '2021-10-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button'));
  }
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2021-11-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button'));
  }
  expect(screen.getByText(/1.5\/week/));
});
