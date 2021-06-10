import { render, screen } from '@testing-library/react'

import ChangeFailRate from './ChangeFailRate'

test('sees the Change Fail Rate header', () => {
  render(<ChangeFailRate />)
  expect(screen.getAllByText(/Change Fail Rate/).length).toBe(2)
})

test('shows correct result with decimal', () => {
  localStorage.setItem('deploymentsList', JSON.stringify([1, 2, 3, 4, 5, 6, 7]))
  localStorage.setItem('recoveryTimesList', JSON.stringify([1, 2, 3, 4, 5, 6]))
  render(<ChangeFailRate />)
  expect(screen.getByText('0.9%'))
})

test('shows correct result without decimal', () => {
  localStorage.setItem('deploymentsList', JSON.stringify([1, 2, 3]))
  localStorage.setItem('recoveryTimesList', JSON.stringify([1, 2, 3, 4, 5, 6]))
  render(<ChangeFailRate />)
  expect(screen.getByText('2%'))
})
