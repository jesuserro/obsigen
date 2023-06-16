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
  if (key === "aliases" || key === "tags") {
    return `[${value.join(", ")}]`;
  }
  return value.toString();
}
