import { render, screen } from '@testing-library/react';
import Index from '../pages/Index'

test('renders learn react link', () => {
  render(<Index />);
  const linkElement = screen.getByText(/Web base v1.0.0/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders last update', () => {
  render(<Index />);
  const linkElement = screen.getByText(/Latest/i);
  expect(linkElement).toBeInTheDocument();
});
