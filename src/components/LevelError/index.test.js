import {screen} from "@testing-library/react";
import LevelError from "./index";

describe('LevelError', () => {
  test('Should render correct header title', () => {
    const header = screen.getByText(/Level failed!/);
    expect(header).toBeInTheDocument()

  })
}
