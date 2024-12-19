import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <Link href="/imprint" className="text-blue-400 hover:underline ml-4">
        Impressum
      </Link> 
      <Link href="/datainformation" className="text-blue-400 hover:underline ml-4">
        Datenschutzerklärung
      </Link>
    </footer>
  );
};

export default Footer;