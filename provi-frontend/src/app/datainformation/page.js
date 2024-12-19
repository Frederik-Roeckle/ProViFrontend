import React from 'react';
import Link from 'next/link';

const DataInformation = () => {
  return (
    <div className="container mx-auto p-8">
      {/* Navigation Bar with admin, about and faq */}
      <nav className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
        <div className="ml-auto">
          <Link href="/home" className="mx-2 text-gray-600 hover:text-gray-900">Home</Link> 
          <Link href="/admin" className="mx-2 text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/about" className="mx-2 text-gray-600 hover:text-gray-900">About</Link>
          <Link href="" className="mx-2 text-gray-600 hover:text-gray-900">FAQ</Link>
        </div>
      </nav>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">Information on Data Protection according to Art. 13, 14 GDPR</h1>
        <h2 className="text-xl font-semibold text-center">for ProVi survey research project</h2>
      </header>
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Controller and data protection officer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-bold mb-1">University of Mannheim</p>
              <p>Schloss</p>
              <p>68161 Mannheim</p>
              <p>Germany</p>
              <a href="mailto:rektor@uni-mannheim.de" className="text-blue-700 hover:underline">rektor@uni-mannheim.de</a>
            </div>
            <div>
              <p className="font-bold mb-1">Jan Morgenstern</p>
              <p>Rechtsanwalt und Fachanwalt für IT-Recht, Datenschutzbeauftragter</p>
              <a href="mailto:datenschutzbeauftragter@uni-mannheim.de" className="text-blue-700 hover:underline">datenschutzbeauftragter@uni-mannheim.de</a>
            </div>
          </div>
        </section>
        <h2 className="mb-4">In the following, you will learn which personal data we process for which purposes, which legal basis allows us to do so, how long we process the data, to whom the data may be disclosed and which rights you can assert.</h2>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Purpose of data processing and possible consequences of failure to provide personal data</h2>
          <p className="mb-1">The personal data will be processed by the University of Mannheim to organize and conduct, including any directly related follow-up work for the ProVi research project.</p>
          <p className="mb-1">The participation is not possible without the data.</p>
          <p className="mb-1">There will be no disadvantages in the event of non-participation. </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Type of data</h2>
          <p>Demographic data (e.g., age or gender), subjective evaluations (e.g., perceived level of difficulty), interaction metrics (e.g., completion time or number of errors), and tracking data (e.g., User Interface tracking)</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Legal basis </h2>
          <p>The processing of personal data by University of Mannheim is based on consent according to Art. 6 paragraph 1(a) of the General Data Protection Regulation (GDPR). </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recipients </h2>
          <p>Your personal data will not be transmitted to third parties.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Duration of storage  </h2>
          <p>In the case of consent, processing will take place until consent is withdrawn but no later than 31.12.2029. </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">You have rights to</h2>
          <ul className="list-disc list-inside">
          <li>Obtain information about your personal data stored by University of Mannheim according to Art. 15 GDPR</li>
            <li>Obtain from the University of Mannheim without undue delay the rectification of inaccurate personal data or have incomplete personal data completed according to Art. 16 GDPR</li>
            <li>Obtain from the University of Mannheim the erasure of your personal data according to Art. 17 GDPR</li>
            <li>Obtain from the University of Mannheim restriction of processing according to Art. 18 GDPR</li>
            <li>Receive your personal data, which you have provided to University of Mannheim, in a structured, commonly used and machine-readable format and to transmit those data to another controller according to Art. 20 GDPR</li>
            <li>Furthermore, in case you gave your consent, you have the right to withdraw consent at any time without giving any reason, without affecting the lawfulness of processing based on consent before its withdrawal</li>
          </ul>
          <p className="mb-4">Please contact us to exercise your rights as data subject: <a href="mailto:haege@uni-mannheim.de" className="text-blue-700 hover:underline">haege@uni-mannheim.de</a> or <a href="mailto:jpmac@uni-mannheim.de" className="text-blue-700 hover:underline">jpmac@uni-mannheim.de</a></p>
          <li>Lodge a complaint with a supervisory authority (The supervisory authority in Baden-Württemberg is the commissioner for data protection and freedom of information of Baden-Württemberg (Der Landesbeauftragte für Datenschutz und Informationsfreiheit Baden-Württemberg) according to Art. 77 GDPR</li>
        </section>
      </div>
    </div>
  );
};

export default DataInformation;