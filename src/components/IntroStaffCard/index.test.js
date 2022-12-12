import {fireEvent, render, screen} from '@testing-library/react';
import Intro from "../Intro";
import IntroStaffCard from "./index";

// test('should navigate to card list when clicked', () => {
//   render(<Intro />);
//   const linkElement = screen.getByText(/LET'S PLAY/i);
//   fireEvent.click(linkElement);
//   expect(linkElement).toHaveAttribute('href', '/card-list');
// });

describe('Staff member', () => {
  // test('should render same name as passed into staff member title', () => {
  //   const { getByTestId} = render(<IntroStaffCard title='Sophie Mitchell' />);
  //   const title = getByTestId()
  //   expect(title).toBeInTheDocument();
  // });

  test('Should render same position as passed into staff position', () => {
    render(<IntroStaffCard position='Project Manager' />);
    const position = screen.getByText(/Project Manager/i);
    expect(position).toHaveTextContent('Project Manager');
  })
})


