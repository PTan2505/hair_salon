import React from "react";
import "./index.css";

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
                  src="https://s3-alpha-sig.figma.com/img/0b0d/ddc5/2ce05b0747ed7d35db5aa1a8b682ecda?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iAxOkdFG9yhFZ1BatnN7DELMtMzUc~tilwMJAMivMn0HTefneqPUIc6B69fF1fUDwoOxfG3CydUiBEGKpbgod-A8UV2LcVScUlJPOLMCJx4h1E24ezfJybMAaPBDHRlpXhnfeBd4qyqTFWSb40xiIkFolIaFCguAXfygIcMzVnrp1vup3PvWGhpcf46euZXEnJZy96ngqMFzK1d2zd4BN6XqdYIuPwmqeIZA0s9rvyYwXlwW0voZkjvDnhzPiy-EZ-ku0s7c0XFW~CISPOIj9FRSOc78dITG4-3TvFYG4BsMBUbCEqu2KGDyJI~eB~aTe5jKMUcCpThDT4-uwg4aMg__"
                  alt="Location"
                />
                <a href="your-location-link" className="contact-link">
                  <p>Location</p>
                </a>
              </div>
              <div className="col">
                <img
                  src="https://s3-alpha-sig.figma.com/img/a788/6c55/528f6e197789a4b7d647dd63cdc250d2?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hTgp-nSML43hBhYre23mteqKlAzjw4MnLduDun4Dci~2y98AvvKhOKut3mlbeK0pK1sW5dvpcPu4PSdGZ-f1HHc5PARPw49-PjW1nMpD5bs4I-yRS6mnKku8h0WEJLwNT~7AxPP1qPg6sF~Xh-~C~m6FycdCp1QJs1cL3Rmz7tpzMA1j2P0BwQn5rkKEKDuuXyPIDxK6TyCbXXTs4obisUwEDSr5GVCR~pOQ8Pwaa-ElBhRP7HSKTDlJqy8LWi0dov4~pdsaKud2Cr3MAQtzW8SIKEJtCXvRbY9SzBsQ5TCJkjwF1JeShVPAVbN5nNDv6TEJcV84A4X5lPsKTLQ0jA__"
                  alt="Phone"
                />
                <a href="tel:your-phone-number" className="contact-link">
                  <p>Phone Number</p>
                </a>
              </div>
              <div className="col">
                <img
                  src="https://s3-alpha-sig.figma.com/img/4212/47a6/4d4ffe9584c9b1f509043b4a63f30000?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=emEw8jmUAF-hiO0NndP5Xbigw0atbiyI8yHIXsI5X88qIQdU1RIe-E5oAQGmqWEipqm9Ofq0ytbSzjL5kNhkcCeIrph4-odegnHGjQ9YJhOeCyoJMyWusaztRw4RTEYcoV1D29-diwt6Re4FNj4RNZhBcI8ZP5Da2JSLaMc7bF-d1NLljN4U-LExumLE11nnU8-H39XCkkCwxSt1nNAb4OWyFDEHaqsqA01vkQr-1Da~x0g-GSNeY4G9rUXdtegGM7NRAMKPf1-DAcdS5Ycg26oCWtQVrK-ac~Wo3bBJIygfVx-CmlWEwOLd7Fyq9hXoqWI10DZqo5s0tGIKysQYSw__"
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
      <section id="services" className="services">
        <div className="container text-center">
          <h2>Our Professional Salon Services</h2>
          <p>
            We provide a wide range of services to cater to your grooming and
            beauty needs. Visit us for an exceptional salon experience.
          </p>

          <div className="row">
            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/5f40/4d69/2679a85df54164abecc5272cd44ac619?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fMfu6X7IJzVECc~UG3Z~GRHXeRjFo39hCh6MsQ81pG6xuAYHm1DQfdkqmsCOAPNAcB3U~xR2OFEJ5YOdI9cFeCngAzoqE0p-HiOO6VB3S3WBA9S3F2ZrEoFUWr3ObzJGuBShg4l9XutY7xGWL1VlzzZyh8AU3ujrF~MFZSw7oRQJU1dbFlKIO0NZTXM7l1k03x7thDhlbnQo41rKZW137ilblDm4Rp5cwr0iEfJcmtvdcuaaLqBu4ypK8qv1dnPGc0FvMs3A1hE7JmjZyGAFdYm1ZAUgU5Q0eh3kZIF69Aj-G95OuGqc6KV0dP5DDFpJTHW5IV70o0Fam1348HOFSA__"
                alt="Haircut"
              />
              <h3>Haircut</h3>
              <p>Stylish cuts tailored to your look</p>
              <p>
                <strong>Price:</strong> $25
              </p>
              <p>
                <strong>Time:</strong> 30 mins
              </p>
            </div>

            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/15b1/687d/75cd43a3e2cd26af0a43b68d0888a88f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EsAC6BRxyr2shhXvJWwHpQf82O37q~zrmYfD1ANPHyJXcoFu6K7OMMdLZ0~zNCvqltW22aXAgzD~TIyuQOA4~WfTqUVI88V6aFQ8Thpa4m1jpMNLVPuJh4DGlQNfrjc~UDzL1VDkYAkgGpFSmFGGlUFWT2dN4SnevjG-YU7L99Q2LWS32~zLscoCZ1WgbHOElz-~vQH6Q6igv1nBX5ZOdfTtV9YqCPrPM05M1pOcDHSOc5MTnNxEhAuJSg4Y4tHhIPAY-SecTkPCZaBsn4sI03mCFSnzEeGcTg89fkFtlFyMG3pnfzmlAh-~i7uP8DCkJ9hKKAXbW~W0WTwshpVDCQ__"
                alt="Shave"
              />
              <h3>Shave</h3>
              <p>Smooth and clean shaving experience</p>
              <p>
                <strong>Price:</strong> $15
              </p>
              <p>
                <strong>Time:</strong> 20 mins
              </p>
            </div>

            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/e46e/54eb/cf5f0ac994c4140c7c32945ff9293186?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=atTBNHnJL1M2ShYX~WiumK-AbUZ625B~N9vb6eFYbh5P1bv0~uZ9BxIBD5g8kmE3GdCR9PkgTnbuv5gvyS6y7VGxdI4bCyqNe38KP6aTkzwiGxgL4BEpdWEwnesPwkPnhdXkVjI7gkhVcL6xXNc-8SxtQ7P6sF6DiPuJBnwT8ZyFf-oUOTPH7kUqT0OWNkNYC5AxXcwBcmaxy163E8M7kfn1L~VFSPgSUBW0rmDJ2ClbqIMIvhvL3zc1xKyk6cBqWQyQfmWp8yzqLzNE39KrakW1WM5ndKYZC132qdPLLVD0ozTkI7O2zdSRbFrZ633oig5df-biauxjFdKM3ous8A__"
                alt="Beard Trim"
              />
              <h3>Beard Trim</h3>
              <p>Perfectly groomed beard trims</p>
              <p>
                <strong>Price:</strong> $20
              </p>
              <p>
                <strong>Time:</strong> 25 mins
              </p>
            </div>

            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/9c23/c022/02d55a4ceb6b377fa4afc458721226e4?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CZ50k1ZH2HJPksZboDFiXm1Ru1OOGnkxumgyg3dsWI-ip-WWKT-msX5~2zi5FqbS91yB0qYo9sCRuYkPW9dubzOkGkOHQzZbFxkhGi7OnVr64sRihc2M9tRccdQ~KEO3RgI9niRQt69d2JTgpv2v-6hFmRr2Fm5xPogGkMFQeM06g8Z~fBSwZUjz8OKtEJqy-CjguiNNOxPxBtgiixPHbvYCRL7Qh9mrXvaSGsiVYKay5o0kL4ihyMyXSeM9jUlhQPQbB47n40Qxk1tPHOXVaoTDqN3jfWCpzc~zel-bEasN3kGCiUaeL41f8Acf66hOQffCLt8f5zbq6I9nhvCq0w__"
                alt="Shampoo"
              />
              <h3>Shampoo</h3>
              <p>Relaxing hair wash and scalp massage</p>
              <p>
                <strong>Price:</strong> $80
              </p>
              <p>
                <strong>Time:</strong> 120 mins
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container text-center">
          <h2>Why Choose Us</h2>
          <div className="row">
            <div className="col">
              <img
                src="https://s3-alpha-sig.figma.com/img/652e/25a2/c56f1b1dd6a9f95b94a6b8951fd38637?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SfYn44pFyTdcdD1RRs5k5Zc3kJE~~ZnJFo~kwArZQEidX-bo69AexlSssn0h5tgTUO6G4hS0txMVNjlnh24pv2zI-ejXwZw-W34V8RI0XF0ec6tOBDPsOdLFStExBg6JZ~oUsBY1fbj-Bm6JVIwhrDAmfuFPBrw8xvtaCvbuufdrCNnNwJl2Pu5S9t3tUrirYEw0l8Y~ct4QPzv0o7W5jBlWID9U~bMkJTf8sSreTtMYHDwLzxl~Do9hTgG0GrpHK3zOIma0TpyjPMzQX8L-NoezpoS7rj8rFvyBaixMGAVNfBuvX-i6PDSd0MkQfKrV7NA2gICHQCNEDhuI6W3nVQ__"
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
                src="https://s3-alpha-sig.figma.com/img/6cef/fccd/104a3c309a84c17057ab6c482c8003d7?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c1XTls7DUxDAWI~b~NSg8hIzaw~~In10I5fQqHDXEdaoFRdEriHLWejo1b4PY0nA6L5dMQZ1uST0VSBQMOwOTk0sf8kC8FwLAcskdeh5s-~4WMAWp6xdOXdInwedMn~M5xwITza3uoYdq89Knj-5z0~dC3AsCqik-CYc5zAg7RoQDpxJwEk8zsvTJMDDEwY-yusmlm4cWM8xl4yPWU2K9g2iGpNYOqbq0NostJISbSuMqwKMa1IzRLdwJjmOhxQzXX553usiR-eyiplV5I7SrNQIkYP9UmA9fCGK0o~DfY24b26HlaUgh97VtR6lKJl4n7QFy2YYvr2xFszVwAhstQ__"
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
                src="https://s3-alpha-sig.figma.com/img/84a3/4ca8/26bc530243f112aee5865ac070c1cc86?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WEawIWg7OlcoqNwAjk0bf5HWSLVA91G1JrQT-9iLXqWjWLhDtKBHJpxYh7wvwN9~SPrePJ7iw3icyqg7jiCeLvjJrajM8MiOPDpDMNlIPvr5hFa4RC627ybXKnp1C3YEfu5sM-QvbZ2eYJ-QWhJY3vV68mZllCstE7pQMKTjzsxvLnzQr25sCYjZZO4YmjhVOttY-S55rR5Qr1PT~zLBYRUmN-63ur69HJ3xjsQ150HnSIB-0r~hrORJaA2oSXTTLwI9-8gh9NGfIghjDTWwKQvtH7qftNgAGToZX5CM~KZzgpOh3LkLOCyxKgEOyCuwt5tmwWPXNjcC6ehFknlndA__"
                alt="Trusted"
              />
              <h4>TRUSTED</h4>
              <p>
                We have a strong online reputation with a 5-star rating from
                over 100 thousand satisfied clients.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="rating">
                <img
                  src="https://www.pngall.com/wp-content/uploads/13/Google-Logo.png"
                  alt="google logo"
                />
                <h4>GOOGLE</h4>
                <h1>4.9</h1>
                <p>196 reviews</p>
              </div>
            </div>
            <div className="col">
              <div className="rating">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.7ZulDOu_l9QD5oVPGl4FOQHaHa&pid=Api&P=0&h=220"
                  alt="google logo"
                />
                <h4>TRIPADVISOR</h4>
                <h1>5.0</h1>
                <p>196 reviews</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="rating">
              <div className="image-wrapper">
                <img
                  src="https://s3-alpha-sig.figma.com/img/845c/0a7e/76a09dd9880480e7c59f7385cde7161f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RrpiaeaB0bYtVsfRJBR9zSYkIyCCqGF-krArQKhdJylbj1caRLcXLMBp237tW~Yk-G9Rn9ome3jAf8IkNhUtZCQgeUKmzImYN4aqxyVW1osVR4fVbBfLrbrlVZpAWyjNVkAZn04Tzeh0ejYr6lnsl-dwq9N1T-RZUQVcggeJ5lFiI~dlJgmKg0ii-fg9hVuhnIoYdRkKb3DtvfOxcEUmtvqPuanyypg7jeKmccYT2SMbp34WHvikHR2Ai6E9Ri5B24iKljrNQyye74zzp8qROZMJcRxItRi2Wc60SDhjGCQJBbQYzKqmx1U21WWZfZsbmeXdW4Zpq~Nub74HAymldQ__"
                  alt="Profile"
                />
              </div>
              <p>
                THE BEST BARBER SERVICES
                <br />
                <small>
                  Et proin ut in dignissim sem non a nullam magna lectus urna et
                  dui quam tellus imperdiet sit purus at fringilla scelerisque
                  diam amet fermentum orci fringilla aliquet nulla lectus erat
                  eu auctor
                </small>
              </p>
              <p>Thomas</p>
              <div className="rating">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a29kCmEBy6k8EiQG5Sf-AQHaFj&pid=Api&P=0&h=220"
                  alt="Star"
                />
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a29kCmEBy6k8EiQG5Sf-AQHaFj&pid=Api&P=0&h=220"
                  alt="Star"
                />
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a29kCmEBy6k8EiQG5Sf-AQHaFj&pid=Api&P=0&h=220"
                  alt="Star"
                />
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a29kCmEBy6k8EiQG5Sf-AQHaFj&pid=Api&P=0&h=220"
                  alt="Star"
                />
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a29kCmEBy6k8EiQG5Sf-AQHaFj&pid=Api&P=0&h=220"
                  alt="Star"
                />
                <p>5.0 / 5</p>
              </div>
            </div>
          </div>
        </div>
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
