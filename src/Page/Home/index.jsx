import React from "react";
import "./index.css";
import "./reviewlist";
import "./servicelist";
import ServicesList from "./servicelist";

function ServiceWebsite() {
  return (
    <div>
      {/* Header Section */}

      <header className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <img src="" alt="Logo" />
            <span>Hair Salon</span>
          </div>
          <h1 className="navbar-menu">
            <a href="#home">HOME</a>
            <a href="#about">ABOUT US</a>
            <a href="#partners">SERVICE</a>
          </h1>
          <div className="navbar-contact">
            <a href="tel:login" className="contact-btn">
              Login
            </a>
          </div>
        </div>
      </header>

      <header className="hero">
        <div className="overlay"></div>
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
        </div>
      </header>

      {/* Contact Info Section */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-box">
            <div className="row">
              <div className="col">
                <img
                  src="https://s3-alpha-sig.figma.com/img/0b0d/ddc5/2ce05b0747ed7d35db5aa1a8b682ecda?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BaqucME9fFAT0zTebpFWYMssJWfgBKHUSc-NOQYhKoBS08sPm2QOwO5vvlb9hePRXl8xR7kcYPEILzPARgv3EAVCuk7yxEOKd9ghSL6O2QxGUXEeCpUYwvIOpVKp1kCvL1INjtPWxscajesOGAiZYqEFwNRDGtuEWB-6X~OcKg255q845BkB8H87RyulvMKrOnhsrT1f-QBEBp8SKdqD8Wun5qbS9fNST4jeJOosZBIR5~jRPhW2Cz9INzR5WkreDgCh3fqibyYrchAeE2x2DQF3NDQJI32ZlJJEB9E7VO7Vx1Qpeu5qfn7KTHUpbcPkPRC7HHM70MPd8vdbH0brHQ__"
                  alt="Location"
                />
                <a href="your-location-link" className="contact-link">
                  <p>Location</p>
                </a>
              </div>
              <div className="col">
                <img
                  src="https://s3-alpha-sig.figma.com/img/a788/6c55/528f6e197789a4b7d647dd63cdc250d2?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PXDM8DN9y7dNCd9o6LYtR4EqHlqsvkWlIujYeTaH6QGmhg3vaRhA4wOWse1Vs88tbaRnYWzHoJXCr3-y3cvycsQTQ9ih3l1ABvmOO87jaDOPZL9Y2zWwN7VG1nrVvSDMkbWebcOc1iVGYx2lj8L6sIjKzAHLITg4s82rcETbp-5yfDQgGk6-hRTq~gntQXrrbWaKWvR1a7w-lNmq43axL9d0WuoRBOiz6gsmGISETtCPT-SohwOrHkaFsf9BcClXL8jVqTpKAPnJWzmYes7nZdzrC6~5A1O0S8dDN8fy0dFpN~piZj4HWDFDq4cKxZ8cDU6JcSoLPHFtxyHiVaw5nQ__"
                  alt="Phone"
                />
                <a href="tel:your-phone-number" className="contact-link">
                  <p>Phone Number</p>
                </a>
              </div>
              <div className="col">
                <img
                  src="https://s3-alpha-sig.figma.com/img/4212/47a6/4d4ffe9584c9b1f509043b4a63f30000?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LNfcnf86pWF6B62~ofax5ghCalSphqWAVcrvumoPE2Jng27v2CzYq~RuHWgHutHBpVGVnD1GNysxBvDFx56ugoqJW5SZVeEjDEogvMcN-MPkwdPM-wevVDV2HBx-XBVGH1aCjwveOOYNx5-fzS-w1Cr~7qLEMrIU-f97uC2tKDwnz96YNT4vBYmmAXXsK-kYNCNzP6Y4fLZapFOn6BZcIDtzjLd3qjnDIUoxoSRYpkDgBcpH92nXmPAHYiXOzLZk5L5~w~OCkbCyyqNBVZemB9KucHhvl9KdpKRjqF1wSbxEmwcc348KvSKyY5q1c-O8IwPcobLZvgBqrG2Gr6qeWg__"
                  alt="Hours"
                />
                <a href="your-hours-link" className="contact-link">
                  <p>Working Hours</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction about the salon */}
      <div className="services-container">
        <div className="contact-box1">
          <div className="text-section">
            <h1>Your Personal Barber Service at Your Home</h1>
            <p>
              Welcome to our at-home barber service! We understand that your
              time is precious, which is why we bring you a convenient and
              comfortable haircut experience right at your doorstep. With our
              team of professional and experienced barbers, we are committed to
              delivering the latest and most stylish haircuts tailored to your
              needs. Whether you're looking for a simple trim or a complete
              transformation, we have the expertise to meet your every
              requirement. We use high-quality products to ensure that your hair
              not only looks great but also feels healthy. Let us take care of
              your appearance, helping you feel more confident in every
              situation!
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-value">99%</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">10+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
            </div>
          </div>
          <div className="image-section">
            <img
              src="https://tocnamdep.com/wp-content/uploads/2020/06/ky-thuat-cat-toc-nam-5.jpg"
              alt="Barber Service"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <servicelist />

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container text-center">
          <h2>Why Choose Us</h2>
          <div className="row">
            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/652e/25a2/c56f1b1dd6a9f95b94a6b8951fd38637?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bejTRhOIhN9pVFgCQnM7J2GH-tvo0TMnmYjvRAJ3L7vrLgNpgouJf2Nnde0T7K~MF6KEN0Xbcm5jd14VZm9c9eA947~9MeblS7i1HthhoaIJjFz4h~QjNv2d45Gsl9nEATmtjP7Io5bn2tonJL-HbNKrb7XCM8u9M24n3zKJzkznBpsrK8TjkgYnPeI4j0zT09M7PSEEdaik5EpFeG-XwKuWJQUbSCuENAC3vrU8QR1pj-ZboW1m-dawXXtPPg~Ehe1jqq~5FdQCnR9ph-g3o78wkWjDrIysRgxhHxvCG4RqukJD8Q6n7cBe0c9AH9eRHUmLdCn2UzQBanHAv~CKYw__"
                alt="Licensed"
              />
              <h4>LICENSED</h4>
              <p>
                Our team of licensed and insured barbers follow strict
                cleanliness and sanitation guidelines for a safe and comfortable
                experience.
              </p>
            </div>
            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/6cef/fccd/104a3c309a84c17057ab6c482c8003d7?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AcvsXd-1EsvE1UoqehLWUpq17GIYlxPX-NS8R75hYgsm7LnRxUkNSf9CTk6asPSNllVDdUp2aXaGdw-mQKD6zSsnPp78P3ITUw0mZ9~XRjgvZaBtw1dmiOZkuRu5tBJCXMuGb74HA9Sl8xPr3Z3REzUfTL35RV282ZoFtiM70tLr08BQbCLLEibwB4Y13r08UICr6S6tc05eVF3I94YIm2PiEqZ~463o17HRlvo1u7Yt3he9WjjZohA~NRJQRnxuTL22JQDj410j9kTE3NyxklYNOJ1yeag9MLxo7SycndmEb~0efLvz70wG73zeZGY5sO1zr20uY2qJtvZZ8-SX3g__"
                alt="Masters"
              />
              <h4>MASTERS</h4>
              <p>
                Our barbers are passionate about their craft and aim to provide
                high-quality haircuts for every client.
              </p>
            </div>
            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/84a3/4ca8/26bc530243f112aee5865ac070c1cc86?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iIQ5B~PWHVoY1wGWR4ArwICBYJpeMpxTD984JJ8~2btMhiA4Z9ZaILcaOIyczuSdikEVwoOFfND2C4O~fcUM-XHPa6Yvxo6YDj-rk7vZGNjj1pYSj3wrQreB88s4FFzj87Ebi8tk0EVclbklpoMdlbjZNjDt7L4wbTKZ9IGrfAp9X-SwvAAW60Iy5RBVmVgSgBCBb7yUFqp1ZAkO5I3aBA5mM2cKfeiCi26ZX8m8dXRM8LZLTtVeo-8b6izpSUkGNdviM9MNTkJcAtfDt3gHA~ihHOP32L-sxm9iBnYzjsoqwvdpBlHig1whFuJZJsCj41-bLbNvm6jEQT20yL0PUg__"
                alt="Trusted"
              />
              <h4>TRUSTED</h4>
              <p>
                We have a strong online reputation with a 5-star rating from
                over 100 thousand satisfied clients.
              </p>
            </div>
          </div>
        </div>
        <reviewlist />
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="appointment">
        <div className="container appointment-wrapper">
          <div className="description">
            <h2>Why Make an Appointment?</h2>
            <p>
              Schedule your appointment with us to get professional advice and
              support at your convenience. We offer personalized services
              tailored to your needs. Whether you need consultation or specific
              guidance, our team is here to assist you.
            </p>
            <ul>
              <li>Professional services</li>
              <li>Personalized recommendations</li>
              <li>Flexible timing</li>
              <li>Dedicated support</li>
            </ul>
          </div>
          <div className="form-container">
            <h2>Make an Appointment</h2>
            <form className="form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />

              {/* Dropdown for stylist selection */}
              <select placeholder="Select a Stylist" required>
                <option value="" disabled selected>
                  Select a Stylist
                </option>
                <option value="stylist1">Stylist 1</option>
                <option value="stylist2">Stylist 2</option>
                <option value="stylist3">Stylist 3</option>
              </select>

              {/* Dropdown for service selection */}
              <select placeholder="Select a Service" required>
                <option value="" disabled selected>
                  Select a Service
                </option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
                <option value="service4">Service 4</option>
              </select>

              {/* Date-time picker for preferred date & time */}
              <input type="datetime-local" required />

              <textarea placeholder="Additional Info"></textarea>
              <button type="submit" className="btn">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h4>About Us</h4>
            <p>
              We are a premier hair salon dedicated to providing exceptional
              services and ensuring customer satisfaction. Your beauty is our
              passion!
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/services" className="footer-link">
              Services
            </a>
            <a href="/about" className="footer-link">
              About Us
            </a>
            <a href="/contact" className="footer-link">
              Contact
            </a>
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              Terms of Service
            </a>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/path/to/facebook-icon.png" alt="Facebook" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/path/to/instagram-icon.png" alt="Instagram" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/path/to/twitter-icon.png" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ServiceWebsite;
