import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "../views/components/Footer";

test("Check a Footer component text", () => {
  render(<Footer />);
  const footerText = screen.getByText(/Footer/i);

  expect(footerText).toBeInTheDocument();
});

test("Console Footer component element", () => {
  render(<Footer />);

  const element = screen.getByText("Footer");
  // eslint-disable-next-line testing-library/no-debugging-utils
  // screen.debug(element);
  expect(element).toBeInTheDocument();
});
