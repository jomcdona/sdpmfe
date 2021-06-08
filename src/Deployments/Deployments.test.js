import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Deployments from './Deployments'

test('sees the Deployments header', () => {
  render(<Deployments />)
  const titleElement = screen.getByText(/^Deployments$/)
  expect(titleElement).toBeInTheDocument()
})

test('sees input element with label of "Deployment Date"', () => {
  render(<Deployments />)
  const labelElement = screen.getByLabelText(/Deployment Date/)
  expect(labelElement).toBeInTheDocument()
})

test('sees input element with label "Deployment Time"', () => {
  render(<Deployments />)
  const labelElement = screen.getByLabelText(/Deployment Time/)
  expect(labelElement).toBeInTheDocument()
})
test('sees a button element with the name of "Add Deployment"', () => {
  render(<Deployments />)
  const buttonElement = screen.getByRole('button', { name: 'Add Deployment' })
  expect(buttonElement).toBeInTheDocument()
})

test('enters date 01/02/2021', () => {
  render(<Deployments />)

  const dateString = '01/02/2021'
  const inputElement = screen.getByLabelText(/^Deployment Date$/)

  userEvent.clear(inputElement)
  userEvent.type(inputElement, dateString)

  expect(inputElement.value).toBe(dateString)
})
