import { fireEvent, render, screen } from '@testing-library/react';
import Register from '../pages/Register'

test('renders learn react link', () => {
  render(<Register />);
  const linkElement = screen.getByText(/Sign In!/i);
  expect(linkElement).toBeInTheDocument();
});
test('Click register', () => {
  render(<Register />);
  const button = screen.getByText(/Create a New Account?/i);
  fireEvent.click(button);
  expect(screen.getByText(/Create Account!/i)).toBeInTheDocument();
});
