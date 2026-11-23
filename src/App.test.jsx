import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Little Lemon Booking Application", () => {
  it("renders the booking form", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /book a table/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it("shows validation errors when the form is empty", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i }),
    );

    expect(
      screen.getByText(/please select a valid future date/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("confirms a valid reservation", () => {
    render(<App />);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const date = [
      futureDate.getFullYear(),
      String(futureDate.getMonth() + 1).padStart(2, "0"),
      String(futureDate.getDate()).padStart(2, "0"),
    ].join("-");

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: date },
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: "18:00" },
    });

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i }),
    );

    expect(
      screen.getByRole("heading", { name: /reservation confirmed/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/thank you, john doe/i)).toBeInTheDocument();
  });

  it("allows the user to make another reservation", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /confirm reservation/i }),
    ).toBeInTheDocument();
  });
});
