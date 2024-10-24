import { useContext } from "react";
import { HomeCustomerContext } from "./HomeCustomerContext"; // Đổi tên file ở đây
import { useNavigate } from "react-router-dom";
import "./index.css";

function HomeCustomerPage() {
  const { services, reviews, loading } = useContext(HomeCustomerContext);
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Header Section */}
      <header className="hero">
        <div className="overlay"></div>
        <h1 className="salon-name">Modern Hair Salon</h1>
        <div className="hero-content">
          <h1>The Ultimate Convenience for Busy People</h1>
          <p>Experience the Convenience of In-home Barber Services</p>
          <div className="hero-buttons">
            <a href="#appointment" className="btn-primary">
              Book An Appointment
            </a>
            <a href="#services" className="btn-secondary">
              Browse Services
            </a>
          </div>
          <div className="navbar-contact">
            <button className="contact-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="services-container">
        <h2>Our Services</h2>
        {services.length ? (
          <ul>
            {services.map((service) => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
        ) : (
          <p>No services available.</p>
        )}
      </section>

      {/* Reviews Section */}
      <section className="reviews-container">
        <h2>Customer Reviews</h2>
        {reviews.length ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>{review.comment}</li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomeCustomerPage;
