import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="container mx-auto p-8 text-center">
      <Link href="/imprint" className="text-white-400 hover:underline ml-4">
       About This Site
      </Link> 
      <Link href="/datainformation" className="text-white-400 hover:underline ml-4">
        Data Protection
      </Link>
    </footer>
  );
};

export default Footer;