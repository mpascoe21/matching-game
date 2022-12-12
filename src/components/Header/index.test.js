import { render, screen} from '@testing-library/react';
import HeaderTitle from "../HeaderTitle";
import Image from "../Image";

describe('Header', () => {
  test('renders headerTitle', () => {
    render(<HeaderTitle />);
  });

  test('Should render correct header title', () => {
    const currentPage = 'cardList';
    if (!currentPage) {
      const headerTitle = render(<HeaderTitle />);
      expect(headerTitle).toHaveTextContent(/Twogether/);
    }
  })

  test('renders header logo', () => {
    render(<Image />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
})
