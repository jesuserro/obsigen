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
    // Ajusta la fecha al huso horario de España/Madrid (GMT+2)
    const madridTimezoneOffset = 0; // 0 horas * 60 minutos/hora
    const localTime = new Date(value.getTime() + madridTimezoneOffset * 60 * 1000);

    // Formatea la fecha como una cadena legible
    const formattedDate = `${localTime.getFullYear()}-${(localTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${localTime.getDate().toString().padStart(2, '0')} ${localTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${localTime.getMinutes().toString().padStart(2, '0')}:${localTime
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  } else if (Array.isArray(value)) {
    return `[${value.join(", ")}]`;
  } else if (value !== undefined) {
    return value.toString();
  }
  return '';
}