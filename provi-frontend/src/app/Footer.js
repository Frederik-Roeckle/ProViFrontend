
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <a href="https://www.uni-mannheim.de/impressum/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
        Impressum
      </a>
      <a href="https://www.uni-mannheim.de/datenschutzerklaerung/" className="text-blue-400 hover:underline ml-4" target="_blank" rel="noopener noreferrer">
        Datenschutzerklärung
      </a>  
    </footer>
  );
};

export default Footer;
