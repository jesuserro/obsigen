
export function YamlTemplate({ data }) {
  return (
`---
title: ${data.title}
aliases:
${data.aliases.map((alias) => `  - ${alias}`).join('\n')}
date: ${data.date.toISOString()}
---`
  );
}