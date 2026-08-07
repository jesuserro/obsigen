const mockApp = { name: 'calendar-app' };
const mockUseApp = jest.fn(() => mockApp);
const mockUseCalendarYearLogic = jest.fn();

jest.mock('./../../hooks/useApp', () => ({
  useApp: mockUseApp,
}));
jest.mock('./Month', () => ({
  useCalendarYearLogic: mockUseCalendarYearLogic,
}));
jest.mock('./MonthUI', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import React from 'react';
import CalendarYear from './CalendarYear';
import MonthUI from './MonthUI';

describe('CalendarYear structure and ownership', () => {
  beforeEach(() => {
    mockUseApp.mockClear();
    mockUseCalendarYearLogic.mockReset();
  });

  test('uses one annual owner and renders its 12 prepared months', () => {
    const year = 2026;
    const preparedMonths = Array.from({ length: 12 }, (_, index) => ({
      cssCurrentMonth: index === 7 ? 'obs-current-month' : '',
      daysGrid: [],
      month: index + 1,
      monthNameAndYear: `Month ${index + 1} ${year}`,
      year,
    }));
    mockUseCalendarYearLogic.mockReturnValue({ months: preparedMonths });

    const calendarYear = CalendarYear({ year });
    const container = React.Children.only(
      calendarYear.props.children,
    ) as React.ReactElement<{ children: React.ReactNode }>;
    const months = container.props.children as Array<
      React.ReactElement<(typeof preparedMonths)[number]>
    >;

    expect(mockUseApp).toHaveBeenCalledTimes(1);
    expect(mockUseCalendarYearLogic).toHaveBeenCalledTimes(1);
    expect(mockUseCalendarYearLogic).toHaveBeenCalledWith(mockApp, year);
    expect(months).toHaveLength(12);
    expect(months.map((element) => element.type)).toEqual(
      Array(12).fill(MonthUI),
    );
    expect(months.map((element) => element.props)).toEqual(preparedMonths);
    expect(months.map((element) => element.key)).toEqual(
      Array.from(
        { length: 12 },
        (_, index) => `${year}-${String(index + 1).padStart(2, '0')}`,
      ),
    );
  });
});
