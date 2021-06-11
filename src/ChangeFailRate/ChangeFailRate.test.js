import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChangeFailRate from './ChangeFailRate';
import App from '../App';

test('sees the Change Fail Rate header', () => {
  render(<ChangeFailRate />);
  expect(screen.getAllByText(/Change Fail Rate/).length).toBe(2);
});

test('shows correct result as whole number', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 1; i++) {
    userEvent.type(dateElement, '2021-10-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '23{enter}');
  expect(screen.getByText('1%'));
});

test('shows correct result with decimal', () => {
  localStorage.clear();
  render(<App />);
  const dateElement = screen.getByLabelText(/^Deployment Date$/);
  const timeElement = screen.getByLabelText(/^Deployment Time$/);
  for (let i = 0; i < 3; i++) {
    userEvent.type(dateElement, '2021-10-22');
    userEvent.type(timeElement, `010${i}`);
    userEvent.click(screen.getByRole('button', { name: 'Add Deployment' }));
  }
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22');
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02');
  userEvent.type(screen.getByLabelText(/^Duration$/), '23{enter}');
  expect(screen.getByText('0.3%'));
});
