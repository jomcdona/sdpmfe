import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RecoveryTimes from './RecoveryTimes'

test('sees the header', () => {
  render(<RecoveryTimes />)
  const titleElement = screen.getByText(/^Recovery Times$/)
  expect(titleElement).toBeInTheDocument()
})

test('sees the table', () => {
  render(<RecoveryTimes />)
  const startElements = screen.getAllByText(/^Start Time$/)
  expect(startElements.length).toBe(2)
  const startElement = startElements[0]
  const durationElement = screen.getByText(/^Duration \(minutes\)$/)
  expect(startElement).toBeInTheDocument()
  expect(durationElement).toBeInTheDocument()
})

test('sees input element with label of "Start Date"', () => {
  render(<RecoveryTimes />)
  const labelElement = screen.getByLabelText(/^Start Date$/)
  expect(labelElement).toBeInTheDocument()
})

test('sees input element with label of "Start Time"', () => {
  render(<RecoveryTimes />)
  const labelElement = screen.getByLabelText(/^Start Time$/)
  expect(labelElement).toBeInTheDocument()
})

test('sees input element with label of "Duration"', () => {
  render(<RecoveryTimes />)
  const labelElement = screen.getByLabelText(/^Duration$/)
  expect(labelElement).toBeInTheDocument()
})

test('sees button element with label of Add Recovery Time', () => {
  render(<RecoveryTimes />)
  const buttonElement = screen.getByRole('button', { name: 'Add Recovery Time' })
  expect(buttonElement).toBeInTheDocument()
})

test('enters date 01/02/2021', () => {
  render(<RecoveryTimes />)

  const inputElement = screen.getByLabelText(/^Start Date$/)
  userEvent.type(inputElement, '2021-10-22')
  expect(inputElement.value).toBe('2021-10-22')
})

test('enters time 010203AM', () => {
  render(<RecoveryTimes />)

  const inputElement = screen.getByLabelText(/^Start Time$/)
  userEvent.type(inputElement, '01:02')
  expect(inputElement.value).toBe('01:02')
})

test('enters time 23', () => {
  render(<RecoveryTimes />)

  const inputElement = screen.getByLabelText(/^Duration$/)
  userEvent.type(inputElement, '23')
  expect(inputElement.value).toBe('23')
})

test('clicking the button makes the date appear in table', () => {
  render(<RecoveryTimes />)
  userEvent.type(screen.getByLabelText(/^Start Date$/), '2021-10-22')
  userEvent.type(screen.getByLabelText(/^Start Time$/), '01:02')
  userEvent.type(screen.getByLabelText(/^Duration$/), '23')
  userEvent.click(screen.getByRole('button'))

  expect(screen.getByText('10/22/2021 1:02:00 AM'))
  expect(screen.getByText(/^23$/))
})
