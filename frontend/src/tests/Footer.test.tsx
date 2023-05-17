import { render, screen } from "@testing-library/react";
import { Footer } from "../views/components/Footer";

test("Check a Footer component text", () => {
  render(<Footer />);
  const footerText = screen.getByText(/Footer/i);

  expect(footerText).toBeInTheDocument();
});
