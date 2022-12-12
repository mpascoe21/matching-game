import { render, screen } from '@testing-library/react';
import Timer from "./index";

//passed
test('renders timer', () => {
  render(<Timer />);
  const time = screen.getByText(/TIME/i);
  expect(time).toBeInTheDocument();
});


//test timer decrements by 1 sec if it is > 0
