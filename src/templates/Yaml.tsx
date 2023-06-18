import React from 'react';
import { iYaml } from '../interface/Yaml';

export function Yaml( data: iYaml ) {
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
  }
  return value.toString();
}

