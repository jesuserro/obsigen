import React from 'react';
import { iYaml } from './../interface/iYaml';

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
    const year = value.getFullYear().toString();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    const hour = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    const seconds = value.getSeconds().toString().padStart(2, '0');

    // Formatea la fecha como una cadena legible
    const formattedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

    return formattedDate;
  } else if (Array.isArray(value)) {
    return `[${value.join(", ")}]`;
  } else if (value !== undefined) {
    return value.toString();
  }
  return ''; 
  
}