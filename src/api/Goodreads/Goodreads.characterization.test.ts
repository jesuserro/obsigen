const mockRequestUrl = jest.fn();

jest.mock('obsidian', () => ({
    requestUrl: (...args: unknown[]) => mockRequestUrl(...args),
}));

jest.mock('./Review', () => ({
    Review: jest.fn(),
}));

import { GoodreadsAuthorApi } from './GoodreadsAuthorApi';
import { GoodreadsBookApi } from './GoodreadsBookApi';
import { GoodreadsReviewsApi } from './GoodreadsReviewsApi';
import { GoodreadsRssItemApi } from './GoodreadsRssItemApi';

const TEST_SETTINGS = {
    mySetting: 'test',
    goodreads_user: 'TEST_GOODREADS_USER',
    goodreads_apikey: 'TEST_API_KEY_DO_NOT_LOG',
};

const TEST_CREDENTIALS = {
    goodreads_user: TEST_SETTINGS.goodreads_user,
    goodreads_apikey: TEST_SETTINGS.goodreads_apikey,
};

class EmptyXmlDocument {
    querySelector() {
        return null;
    }

    querySelectorAll() {
        return [];
    }
}

describe('Goodreads current behavior', () => {
    beforeAll(() => {
        (global as any).DOMParser = class {
            parseFromString() {
                return new EmptyXmlDocument();
            }
        };
    });

    beforeEach(() => {
        mockRequestUrl.mockReset();
    });

    describe('active API paths', () => {
        const app = {};

        test('review-by-id uses explicitly injected credentials without app.setting', async () => {
            mockRequestUrl.mockResolvedValue({ text: '<GoodreadsResponse />' });
            const api = new GoodreadsReviewsApi(app as any, TEST_CREDENTIALS);

            await expect(api.getReviewById('TEST_REVIEW_ID')).resolves.toBeNull();

            expect(mockRequestUrl).toHaveBeenCalledWith(
                'https://www.goodreads.com/review/show/TEST_REVIEW_ID.xml?key=TEST_API_KEY_DO_NOT_LOG'
            );
        });

        test('RSS review lookup uses explicitly injected credentials', async () => {
            mockRequestUrl.mockResolvedValue({ text: '<rss />' });
            const api = new GoodreadsRssItemApi(TEST_CREDENTIALS);

            await expect(api.getReviewRssItemByReviewId('TEST_REVIEW_ID')).resolves.toBeUndefined();

            expect(mockRequestUrl).toHaveBeenCalledWith(
                'https://www.goodreads.com/review/list_rss/TEST_GOODREADS_USER?key=TEST_API_KEY_DO_NOT_LOG&shelf=read&page=1&per_page=100'
            );
        });

        test('book lookup uses explicitly injected credentials', async () => {
            mockRequestUrl.mockResolvedValue({ text: '<GoodreadsResponse />' });
            const api = new GoodreadsBookApi(TEST_CREDENTIALS);

            await expect(api.getBookById('TEST_BOOK_ID')).resolves.toBeNull();

            expect(mockRequestUrl).toHaveBeenCalledWith(
                'https://www.goodreads.com/book/show?format=xml&key=TEST_API_KEY_DO_NOT_LOG&id=TEST_BOOK_ID'
            );
        });

        test('author lookup uses explicitly injected credentials', async () => {
            mockRequestUrl.mockResolvedValue({ text: '<GoodreadsResponse />' });
            const api = new GoodreadsAuthorApi(TEST_CREDENTIALS);

            await expect(api.getAuthorById('TEST_AUTHOR_ID')).resolves.toBeNull();

            expect(mockRequestUrl).toHaveBeenCalledWith(
                'https://www.goodreads.com/author/show.xml?key=TEST_API_KEY_DO_NOT_LOG&id=TEST_AUTHOR_ID'
            );
        });

        test('does not copy an API key from a network error into the console', async () => {
            mockRequestUrl.mockImplementation(async (url: string) => {
                throw new Error(`Request failed for ${url}`);
            });
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
            const api = new GoodreadsRssItemApi(TEST_CREDENTIALS);

            try {
                await api.getReviewRssItemByReviewId('TEST_REVIEW_ID');

                expect(consoleError).not.toHaveBeenCalledWith(
                    expect.stringContaining(TEST_SETTINGS.goodreads_apikey)
                );
            } finally {
                consoleError.mockRestore();
            }
        });

        test('reports a fixed diagnostic when a Goodreads request fails', async () => {
            mockRequestUrl.mockRejectedValue(new Error('request boundary detail'));
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
            const api = new GoodreadsRssItemApi(TEST_CREDENTIALS);

            try {
                await api.getReviewRssItemByReviewId('TEST_REVIEW_ID');

                expect(consoleError).toHaveBeenCalledWith('Goodreads request failed.');
            } finally {
                consoleError.mockRestore();
            }
        });
    });
});
