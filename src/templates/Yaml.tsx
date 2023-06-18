import React from 'react';
import { iYaml } from '../interface/Yaml';

export function Yaml({ data }: { data: iYaml }) {
  return (
    <>
      ---{"\n"}
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          {key}: {renderPropertyValue(key, value)}{"\n"}
        </React.Fragment>
      ))}
      --- 
    </>
  );
}

function renderPropertyValue(key: string, value: any) {
  if (value instanceof Date) {
    const formattedDate = value.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return formattedDate;
  } else if (Array.isArray(value)) {
    return `[${value.join(", ")}]`;
  } else if (value !== undefined) {
    return value.toString();
  }
  return '';
}


