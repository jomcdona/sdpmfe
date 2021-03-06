import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RecoveryTimes from './RecoveryTimes';
import App from '../App';

test('sees the header', () => {
  render(<App />);
  const titleElement = screen.getByText(/^Recovery Times$/);
  expect(titleElement).toBeInTheDocument();
});

test('sees the table', () => {
  render(<App />);
  const startElements = screen.getAllByText(/^Start Time$/);
  expect(startElements.length).toBe(2);
  const startElement = startElements[0];
  const durationElement = screen.getByText(/^Duration \(minutes\)$/);
  expect(startElement).toBeInTheDocument();
  expect(durationElement).toBeInTheDocument();
});

test('sees input element with label of "Start Date"', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/^Start Date$/);
  expect(labelElement).toBeInTheDocument();
});

test('sees input element with label of "Start Time"', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/^Start Time$/);
  expect(labelElement).toBeInTheDocument();
});

test('sees input element with label of "Duration"', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/^Duration$/);
  expect(labelElement).toBeInTheDocument();
});

test('sees button element with label of Add Recovery Time', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {
    name: 'Add Recovery Time',
  });
  expect(buttonElement).toBeInTheDocument();
});

test('enters date 01/02/2021', () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/^Start Date$/);
  userEvent.type(inputElement, '2021-10-22');
  expect(inputElement.value).toBe('2021-10-22');
});

test('enters time 010203AM', () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/^Start Time$/);
  userEvent.type(inputElement, '01:02');
  expect(inputElement.value).toBe('01:02');
});

test('enters time 23', () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/^Duration$/);
  userEvent.type(inputElement, '23');
  expect(inputElement.value).toBe('23');
});

test('clicking the button makes the date appear in table', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '23');
  userEvent.click(screen.getByRole('button', { name: 'Add Recovery Time' }));

  expect(screen.getByText('10/22/2021 1:02:00 AM'));
  expect(screen.getByText(/^23$/));

  localStorage.clear();
});

test('pressing enter submits the form', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '23{enter}');
  expect(screen.getByText('10/22/2021 1:02:00 AM'));
  expect(screen.getByText(/^23$/));

  localStorage.clear();
});

test('entering incorrect duration is handled', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Duration$/), 'abc{enter}');
  expect(screen.getByLabelText(/^Duration$/).value).toBe('');
});

test('entering negative value in duration is handled', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Duration$/), '-4{enter}');
  expect(screen.getByLabelText(/^Duration$/).value).toBe('4');
});

test('allow only positive integer for duration', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Duration$/), '0{enter}');
  expect(screen.getByLabelText(/^Duration$/).value).toBe('');
});

test('refreshing page keeps table contents', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '23{enter}');
  cleanup();
  render(<App />);
  expect(screen.getByText('10/22/2021 1:02:00 AM'));
  expect(screen.getByText(/^23$/));

  localStorage.clear();
});

test('MTTR element is on the page', () => {
  render(<App />);
  const titleElement = screen.getByText(/^MTTR:$/);
  expect(titleElement).toBeInTheDocument();
});

test('expect MTTR: to read "1 minute" after placing one recovery time with the duration of 1 minute', () => {
  localStorage.clear();
  render(<App />);
  for (let i = 0; i < 1; i++) {
    userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
    userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
    userEvent.type(screen.getByLabelText(/^Duration$/), '1{enter}');
  }
  expect(screen.getByText(/^1 minute$/));
});

test('expect MTTR: to read "1 minute" after placing three recovery times on the same day with the duration of 1 minute', () => {
  localStorage.clear();
  render(<App />);
  for (let i = 0; i < 3; i++) {
    userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
    userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
    userEvent.type(screen.getByLabelText(/^Duration$/), '1{enter}');
  }
  expect(screen.getByText(/^1 minute$/));
});

test('expect MTTR: to read "1.5 minutes" after placing one recovery time with the duration of 1 minute and one recovery time with the duration of 2 mintutes on the same day', () => {
  localStorage.clear();
  render(<App />);
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '1{enter}');
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '2{enter}');
  expect(screen.getByText(/^1.5 minutes$/));
});

test('expect MTTR: to read "7.5 minutes" after placing three recovery times with the duration of 10 minutes on one day, and one recovery time with the duration of 5 mintutes on a different day', () => {
  localStorage.clear();
  render(<App />);
  for (let i = 0; i < 3; i++) {
    userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
    userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
    userEvent.type(screen.getByLabelText(/^Duration$/), '10{enter}');
  }
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-25');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '5{enter}');
  expect(screen.getByText(/^7.5 minutes$/));
});

test('expect MTTR: to read "7.5 minutes" after placing three recovery times with the duration of 10 minutes on one day, and one recovery time with the duration of 5 mintutes on a different day, and refreshing the page', () => {
  localStorage.clear();
  render(<App />);
  for (let i = 0; i < 3; i++) {
    userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
    userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
    userEvent.type(screen.getByLabelText(/^Duration$/), '10{enter}');
  }
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-25');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '5{enter}');
  expect(screen.getByText(/^7.5 minutes$/));
  cleanup();
  render(<App />);
  expect(screen.getByText(/^7.5 minutes$/));
});
