import { render, screen } from '@testing-library/react';
import Asc from './App';

test('renders learn react link', () => {
  render(<Asc />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
