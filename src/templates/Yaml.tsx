import React from 'react';

export function Yaml({ data }: { data: { title: string; aliases: string[]; date: Date } }) {
  // Function body remains unchanged
  return (
    <>
      ---
      title: {data.title}
      aliases:
      {data.aliases.map((alias) => `  - ${alias}`).join('\n')}
      date: {data.date.toISOString()}
      --- 
    </>
  );
}


