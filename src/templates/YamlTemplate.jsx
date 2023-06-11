import React from 'react';

export function YamlTemplate({ data }) {
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

