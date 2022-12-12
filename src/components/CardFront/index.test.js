import {getByRole, getByTestId, render, screen} from '@testing-library/react';

const nameId = 'name';

test('Should render staff title', () => {
  const title = getByTestId('title');
  const name = getByTestId('title')
})

test('renders staff image', () => {
  const staffImg = getByRole(img);
  expect(staffImg).toBeInTheDocument();
  // expect(screen.getByRole('img')).toBeInTheDocument();
});
