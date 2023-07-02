import React, { useEffect, useState } from 'react';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [topStyle, setTopStyle] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos === 0) {
      setTopStyle(0);
    } else if (prevScrollPos > currentScrollPos) {
      setTopStyle(0);
    } else {
      setTopStyle(-100); 
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className="top-nav">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/news">News and Events</a>
        <a href="/music">Our Music</a>
      </nav>
      <h1 className="welcome" style={{ transform: `translateY(${topStyle}%)`, transition: 'transform 0.3s' }}>
        Welcome to the Neil Coley Big Band
      </h1>
    </header>
  );
};

export default Header;


{/* Original header code

function Header() {
  return (
    <header>
      <nav className="top-nav">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/news">News and Events</a>
        <a href="/music">Our Music</a>
      </nav>
      <h1 className='welcome'>Welcome to the Neil Coley Big Band</h1>
    </header>
  );
}

export default Header;*/}