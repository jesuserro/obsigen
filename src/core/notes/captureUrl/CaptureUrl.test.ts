import { CaptureUrl } from './CaptureUrl';

describe('CaptureUrl', () => {
  let captureUrl: CaptureUrl;

  beforeEach(() => {
    // Prepare test data
    const app = {
      vault: {
        create: jest.fn().mockResolvedValue({ path: '/mnt/c/Users/Jesús/Documents/vault/testFile.md' }),
      },
      workspace: {
        openLinkText: jest.fn(),
      },
      keymap: {}, // Add any missing properties from the 'App' type
      scope: {},
      metadataCache: {},
      fileManager: {},
      lastEvent: {},
    };

    captureUrl = new CaptureUrl(app as any); // Use 'as any' to bypass type checking
  });

  test('should sanitize URLs by removing invalid parameters', () => {
    const urls = [
      'https://twitter.com/user/status/123456789?t=1234567890', // Valid Twitter URL with irrelevant 't' parameter beacuse t param is only valid for youtube or other url video sites like vimeo
      'https://twitter.com/user/status/987654321', // Valid Twitter URL without 't' parameter
      'https://mobile.twitter.com/user/status/123456789?t=AB3454xtt5gy', // Valid Twitter URL with invalid 't' parameter
      'https://www.youtube.com/watch?v=abcdefghij&t=1234567890', // Valid YouTube URL with 't' parameter. v param (and t param) is valid for youtube or other url video sites like vimeo.
      'https://www.youtube.com/watch?v=abcdefghij', // Valid YouTube URL without 't' parameter
      'https://www.youtube.com/shorts/abcdefghij', // Valid YouTube Shorts URL
      'https://www.youtube.com/watch?v=abcdefghij&t=AB3454xtt5gy', // Valid YouTube URL with invalid 't' parameter. Remove it
      'https://example.com/blog/post?param1=value1&param2=value2', // Valid blog URL with irrelevant parameters, remove them
      'https://example.com/rss/feed?param1=value1&param2=value2', // Valid RSS URL with irrelevant parameters, just get rid of them
      'https://example.com/page?param1=value1&param2=value2', // Valid URL with irrelevant parameters, just cut the parameters
      'https://www.youtu.be/q57xZG2BDTE?z=300', // Valid YouTube URL with irrelevant 'z' parameter, remove just the parameter
    ];

    const sanitizedURLs = urls.map(url => captureUrl.filterParamsFromUrl(url));

    // Verify the sanitized URLs
    const expectedSanitizedURLs = [
      'https://twitter.com/user/status/123456789',
      'https://twitter.com/user/status/987654321',
      'https://twitter.com/user/status/123456789',
      'https://www.youtube.com/watch?v=abcdefghij',
      'https://www.youtube.com/watch?v=abcdefghij',
      'https://www.youtube.com/shorts/abcdefghij',
      'https://www.youtube.com/watch?v=abcdefghij',
      'https://example.com/blog/post',
      'https://example.com/rss/feed',
      'https://example.com/page',
      'https://www.youtu.be/q57xZG2BDTE'
    ];

    expect(sanitizedURLs).toEqual(expectedSanitizedURLs);
  });
});

