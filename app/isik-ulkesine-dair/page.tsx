'use client'; // This is necessary if you're using hooks or other client-side features

import { useEffect, useState } from 'react';

// Define the type for the data from xanthos.json
interface XanthosData {
  Title: string;
  DOI: string;
  Author: string;
  Translator: string;
  Keywords: string;
  JournalName: string;
  ISSN: string;
  eISSN: string;
  Publisher: string;
  Year: number;
  Volume: string;
  Number: string;
  Pages: string;
  Abstract: string;
  Reference: string;
  AuthorDetail: string;
  TranslatorDetail: string;
  Subjects: string;
  PrimaryLanguage: string;
  PublicationType: string;
  SubmissionDate: string;
  AcceptanceDate: string;
  SupportingInstitution: string;
  ProjectNumber: string;
}

const IsikUlkesineDairPage = () => {
  const [data, setData] = useState<XanthosData[] | null>(null);

  useEffect(() => {
    // Fetch data from the API route
    fetch('/api/xanthos')
      .then((response) => response.json())
      .then((jsonData: XanthosData[]) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mx-auto max-w-2xl'>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{item.Title}</h2>
          <p><strong>Author:</strong> {item.Author}</p>
          <p><strong>Year:</strong> {item.Year}</p>
          {/* <p><strong>Abstract:</strong> {item.Abstract}</p> */}
          {/* Render other fields as necessary */}
        </div>
      ))}
    </div>
  );
};

export default IsikUlkesineDairPage;