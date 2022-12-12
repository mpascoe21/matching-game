import { render, screen } from '@testing-library/react';
import Image from "../Image";

test('renders image', () => {
  render(<Image />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
