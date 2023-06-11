import React from 'react';
import { iYaml } from '../interface/Yaml';

export function Yaml({ data }: { data: iYaml }) {
  // Function body remains unchanged
  return (
    <>
      ---{"\n"}
      title: {data.title}{"\n"}
      aliases:{"\n"}
      {data.aliases.map((alias) => `- ${alias}`).join('\n')}{"\n"}
      date: {data.date.toISOString()}{"\n"}
      --- 
    </>
  );
}
