import { useState } from "react";
import "./App.css";

const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];

const initialForm = {
  date: "",
  time: "",
  guests: "2",
  name: "",
  email: "",
  phone: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.date || form.date < minDate) {
      newErrors.date = "Please select a valid future date.";
    }

    if (!availableTimes.includes(form.time)) {
      newErrors.time = "Please select a time.";
    }

    if (Number(form.guests) < 1 || Number(form.guests) > 10) {
      newErrors.guests = "Please select between 1 and 10 guests.";
    }

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\+?[\d\s()-]{7,20}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setConfirmed(true);
    }
  }

  function resetBooking() {
    setForm(initialForm);
    setErrors({});
    setConfirmed(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <a href="#home" className="logo" aria-label="Little Lemon home">
            Little <span>Lemon</span>
          </a>

          <nav aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#booking">Reservations</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Enjoy fresh Mediterranean cuisine in a warm and welcoming
              atmosphere. Reserve your table today.
            </p>
            <a href="#booking" className="hero-button">
              Reserve a Table
            </a>
          </div>
        </section>

        <section id="booking" className="booking-section">
          <div className="booking-container">
            {confirmed ? (
              <div className="confirmation" role="status">
                <div className="success-icon" aria-hidden="true">
                  ✓
                </div>

                <h2>Reservation Confirmed!</h2>
                <p>Thank you, {form.name}!</p>
                <p>Your table reservation has been recorded.</p>

                <div className="booking-summary">
                  <p>
                    <strong>Date:</strong> {form.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {form.time}
                  </p>
                  <p>
                    <strong>Guests:</strong> {form.guests}
                  </p>
                  <p>
                    <strong>Email:</strong> {form.email}
                  </p>
                </div>

                <button onClick={resetBooking}>Make Another Reservation</button>
              </div>
            ) : (
              <>
                <div className="section-heading">
                  <h2>Book a Table</h2>
                  <p>
                    Complete the form below to reserve your dining experience.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="date">Choose Date *</label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        min={minDate}
                        value={form.date}
                        onChange={handleChange}
                        aria-invalid={!!errors.date}
                        aria-describedby={
                          errors.date ? "date-error" : undefined
                        }
                        required
                      />
                      {errors.date && (
                        <span id="date-error" className="error" role="alert">
                          {errors.date}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">Choose Time *</label>
                      <select
                        id="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        aria-invalid={!!errors.time}
                        aria-describedby={
                          errors.time ? "time-error" : undefined
                        }
                        required
                      >
                        <option value="">Select a time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <span id="time-error" className="error" role="alert">
                          {errors.time}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests *</label>
                      <select
                        id="guests"
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        required
                      >
                        {Array.from({ length: 10 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        required
                      />
                      {errors.name && (
                        <span id="name-error" className="error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        required
                      />
                      {errors.email && (
                        <span id="email-error" className="error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        required
                      />
                      {errors.phone && (
                        <span id="phone-error" className="error" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="submit-button">
                    Confirm Reservation
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
