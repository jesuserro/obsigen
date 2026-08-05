jest.mock("./CalendarEvent", () => ({
	CalendarEvent: jest.fn(),
}));

jest.mock("./CalendarIcon", () => ({
	CalendarIcon: {
		getIconByNote: jest.fn(),
	},
}));

import { getCalendarDayProps } from "./Day";

describe("getCalendarDayProps", () => {
	test("returns the internal vault path for the day's main note", () => {
		const notePath = "100 Calendar/2026/2026-08-05.md";
		const app = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
		} as any;

		const result = getCalendarDayProps({
			year: 2026,
			month: 8,
			dayCounter: 5,
			hasNote: notePath,
			anniversaryNote: undefined,
			dayNotes: false,
			app,
		});

		expect(result.notePath).toBe(notePath);
		expect(result.notePath).not.toContain("://");
	});
});
