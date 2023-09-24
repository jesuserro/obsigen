import React from 'react';
import { useApp } from '../../hooks/useApp';
import CalendarMonth from './CalendarMonth';

const CalendarYear: React.FC = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const app = useApp();
  const files = app?.vault.getMarkdownFiles() || [];

  const monthsGrid = Array.from({ length: 12 }, (_, month) => (
    <CalendarMonth key={String(month).padStart(2, '0')} year={currentYear} month={month} app={app} files={files} />
  ));

  return <div>{monthsGrid}</div>;
}

export default CalendarYear;
