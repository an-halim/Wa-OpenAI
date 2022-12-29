import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Web base v1.0.0/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders last update', () => {
  render(<App />);
  const linkElement = screen.getByText(/Latest/i);
  expect(linkElement).toBeInTheDocument();
});
