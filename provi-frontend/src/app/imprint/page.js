import React from 'react';
import Link from 'next/link';
const Imprint = () => {
  return (
    
    <div className="container mx-auto p-8">
      {/*Navigation Bar with admin, about and faq*/}
    <nav className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
    <div className="ml-auto">
      <Link href="/home" className="mx-2 text-gray-600 hover:text-gray-900">Home</Link> 
      <Link href="/admin" className="mx-2 text-gray-600 hover:text-gray-900">Admin</Link>
      <Link href="/about" className="mx-2 text-gray-600 hover:text-gray-900">About</Link>
      <Link href="" className="mx-2 text-gray-600 hover:text-gray-900">FAQ</Link>
    </div>
    </nav>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">Impressum</h1>
      </header>
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Anbieterin</h2>
          <p>Universität Mannheim<br /> Schloss<br /> 68161 Mannheim<br /> Tel. 0621/181-2222</p>
          <p>E-Mail: <a href="mailto:impressum@uni-mannheim.de" className="text-blue-500 hover:underline">impressum@uni-mannheim.de</a><br /> Internet: <a href="https://www.uni-mannheim.de" className="text-blue-500 hover:underline">https://www.uni-mannheim.de</a></p>
          <p>Die Universität Mannheim ist gemäß § 1 Absatz 2 Nummer 1 und § 8 Absatz 1 Satz 1 des Gesetzes über die Hochschulen in Baden-Württemberg eine Körperschaft des öffentlichen Rechts. Sie wird durch den <strong>Rektor</strong> Prof. Dr. Thomas Fetzer gesetzlich vertreten.</p>
          <p>Umsatzsteuer-Identifikations­nummer (§27a des Umsatzsteuergesetzes): DE 143845342</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Inhaltliche Gestaltung und Verantwortlichkeit</h2>
          <p>Die zentralen Webseiten werden von den Abteilungen Marketing und Kommunikation im Rektorat betreut.</p>
          <p>Die Verantwortung für journalistisch-redaktionell gestaltete Inhalte liegt bei:</p>
          <p>Dr. Andreas Margara (Leiter Abteilung Marketing)</p>
          <p>Universität Mannheim<br /> Rektorat, Abteilungen Marketing<br /> Schloss Ostflügel<br /> 68161 Mannheim</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Urheberrechtshinweis</h2>
          <p>Die auf unserer Internetseite vorhandenen Texte, Bilder, Fotos, Videos oder Grafiken sowie das Layout unterliegen in der Regel dem Schutz des Urheberrechts. Die Seiten dürfen ausschließlich zum privaten Gebrauch vervielfältigt werden. Eine darüber hinausgehende Nutzung (insbesondere Verbreitung von Vervielfältigungsstücken oder Bearbeitung) ist untersagt, soweit nicht anders angegeben. Wenn Sie beabsichtigen, die Internetseite oder Teile davon zu verwenden, kontaktieren Sie uns bitte im Voraus unter den obenstehenden Angaben.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Social Media-Profile</h2>
          <ul className="list-disc list-inside">
            <li><em>Instagram</em>: <a href="https://www.instagram.com/uni_mannheim/" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">instagram.com/uni_mannheim</a></li>
            <li><em>TikTok</em>: <a href="https://www.tiktok.com/@uni_mannheim" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">tiktok.com/@uni_mannheim</a></li>
            <li><em>Linkedin</em>: <a href="https://de.linkedin.com/school/university-of-mannheim/" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">linkedin.com/school/university-of-mannheim</a></li>
            <li><em>Facebook</em>: <a href="https://www.facebook.com/UniMannheim" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">facebook.com/UniMannheim</a></li>
            <li><em>Mastodon</em>: <a href="https://bawü.social/@unimannheim" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">bawü.social/@unimannheim</a></li>
            <li><em>YouTube</em>: <a href="https://www.youtube.com/@unimannheim" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">youtube.com/@unimannheim</a></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Technische Betreuung</h2>
          <p>Universität Mannheim<br /> Universitäts-IT<br /> L15, 1–6<br /> 68161 Mannheim<br /> Internet: <a href="https://www.uni-mannheim.de/it" className="text-blue-500 hover:underline">https://www.uni-mannheim.de/it</a></p>
          <h2 className="text-xl font-semibold mb-2 mt-4">Konzeption, Gestaltung, Technische Umsetzung</h2>
          <p>UEBERBIT GmbH<br /> Rheinvorlandstraße 7<br /> 68159 Mannheim<br /><a href="http://www.ueberbit.de/" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">ueberbit.de</a></p>
          <h2 className="text-xl font-semibold mb-2 mt-4">Icons</h2>
          <p><a href="https://icon54.com/" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">icon54.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default Imprint;