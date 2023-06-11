import React from 'react';
import { iYaml } from '../interface/Yaml';

export function Yaml({ data }: { data: iYaml }) {
  // Function body remains unchanged
  return (
    <>
      ---
      title: {data.title}
      aliases:
      {data.aliases.map((alias) => `- ${alias}`).join('\n')}
      date: {data.date.toISOString()}
      --- 
    </>
  );
}
