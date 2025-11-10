import React from 'react';

interface StructuredDataProps {
  data: object;
}

/**
 * Component to inject JSON-LD structured data into the page
 * @param data - The structured data object (schema)
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0), // Minified JSON for production
      }}
    />
  );
}
