'use client';

import React, { useState, useEffect } from 'react';

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear());
    };
  }, []);

  return (
    <footer>
      <span className="footer-links">
        <h3>Explore</h3>
        <ul>
          <li>About Us</li>
          <li>News and Events</li>
          <li>Our Music</li>
          <li>Contact Us</li>
        </ul>
      </span>
      <span className="privacy-policy">
        <h3>Privacy Policy</h3>
        <p>
          <a href="mailto:neilcoleybigband@gmail.com">
            neilcoleybigband@gmail.com{' '}
          </a>
          <br />
          &copy; {currentYear} <br />
          Neil Coley Big Band <br />
          All rights reserved
        </p>
      </span>
    </footer>
  );
}

export default Footer;
