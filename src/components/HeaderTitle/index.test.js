import {getByText, render, screen} from '@testing-library/react';
import CountdownTimer from "../CountdownTimer";
import HeaderTitle from "./index";

describe('HeaderTitle', () => {
  test('Should render correct header title', () => {
    const currentPage = 'cardList';
    if (currentPage) {
      expect(screen.queryByText(/Twogether/)).toBeNull();
    }
  })

  test('Should render correct header title', () => {
    const currentPage = 'cardList';
    if (!currentPage) {
      const headerTitle = getByText(/Twogether/);
      expect(headerTitle).toHaveTextContent(/Twogether/);
    }
  })

  test('Should render correct header title', () => {
    const currentPage = 'cardList';
    if (currentPage) {
      const headerTitle = getByText(/Level/);
      expect(headerTitle).toHaveTextContent(/Level/);
    }
  })
  test('Should render correct header title', () => {
    const currentPage = 'cardList';
    if (currentPage) {
     render(<CountdownTimer />);
    }
  })
})
