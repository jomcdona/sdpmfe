import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Deployments from './Deployments';

test('sees the Deployments header', () => {
  render(<App />);
  const titleElement = screen.getByText(/^Deployments$/);
  expect(titleElement).toBeInTheDocument();
});

test('sees input element with label of "Deployment Date"', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/Deployment Date/);
  expect(labelElement).toBeInTheDocument();
});

test('sees input element with label "Deployment Time"', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/Deployment Time/);
  expect(labelElement).toBeInTheDocument();
});
test('sees a button element with the name of "Add Deployment"', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: 'Add Deployment' });
  expect(buttonElement).toBeInTheDocument();
});

test('enters date 01/02/2021', () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/^Deployment Date$/);
  userEvent.type(inputElement, '2021-10-22');
  expect(inputElement.value).toBe('2021-10-22');
});

test('enters time 010203AM', () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/^Deployment Time$/);
  userEvent.type(inputElement, '01:02');
  expect(inputElement.value).toBe('01:02');
});

test('clicking the button makes the date appear in list', () => {
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  userEvent.type(dateElement, '2021-10-22');
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  userEvent.type(timeElement, '0102');
  userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  expect(screen.getByText('10/22/2021 1:02:00 AM'));
});

test('see "Frequency:" on page', () => {
  render(<App />);
  const frequencyElement = screen.getByText(/Frequency:/);
  expect(frequencyElement).toBeVisible();
});

test('see 4/week after adding 4 deployments on the same day', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 4; i++) {
    userEvent.type(dateElement, '2021-10-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  expect(screen.getByText(/4\/week/));
});

test('see 1.5/week after adding 2 deployments on the same day, 1 deployment 14 days later', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 2; i++) {
    userEvent.type(dateElement, '2021-06-10');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2021-06-24');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  expect(screen.getByText(/1.5\/week/));
});
test('see 1.5/week after adding 2 deployments on the same day, 1 deployment 8 days later', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 2; i++) {
    userEvent.type(dateElement, '2021-06-10');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2021-06-18');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  expect(screen.getByText(/1.5\/week/));
});

test('see 0.1/week after adding 2 deployments one year apart', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2021-06-10');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2022-06-10');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  expect(screen.getByText(/0.1\/week/));
});

test('when a date and time is entered and the button is clicked, and the page is refreshed, the frequency persists', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  userEvent.type(dateElement, '2021-10-22');
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  userEvent.type(timeElement, '0102');
  userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  cleanup();
  render(<App />);
  expect(screen.getByText('10/22/2021 1:02:00 AM'));
});
