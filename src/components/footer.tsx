'use client';

import React, { useState, useEffect } from 'react';

const Footer = () => {
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
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            {' '}
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/news">News and Events</a>
          </li>
          <li>
            {' '}
            <a href="/music">Our Music</a>
          </li>
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
};

export default Footer;
