import darkmode from '.';

beforeAll(() => {
  window.matchMedia = jest.fn(() => ({
    matches: false,
    addListener: f => f,
    removeListener: f => f
  }));
});

const addListener = jest.fn();
const activateDarkMode = jest.fn();
const activateLightMode = jest.fn();
const activateFallback = jest.fn();
const darkModeQuery = '(prefers-color-scheme: dark)';
const lightModeQuery = '(prefers-color-scheme: light)';
const noPrefQuery = '(prefers-color-scheme: no-preference)';

describe('darkmode', () => {
  afterEach(() => jest.clearAllMocks());

  describe('initial calls', () => {
    test('should call activateDarkMode when in dark mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === darkModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateDarkMode });
      expect(activateDarkMode).toHaveBeenCalledTimes(1);
      expect(activateLightMode).toHaveBeenCalledTimes(0);
      expect(activateFallback).toHaveBeenCalledTimes(0);
    });

    test('should not call activateDarkMode when not in dark mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === lightModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateDarkMode });
      expect(activateDarkMode).toHaveBeenCalledTimes(0);
      expect(activateLightMode).toHaveBeenCalledTimes(0);
      expect(activateFallback).toHaveBeenCalledTimes(0);
    });

    test('should call activateLightMode when in light mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === lightModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateLightMode });
      expect(activateDarkMode).toHaveBeenCalledTimes(0);
      expect(activateLightMode).toHaveBeenCalledTimes(1);
      expect(activateFallback).toHaveBeenCalledTimes(0);
    });

    test('should not call activateLightMode when not in light mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === darkModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateLightMode });
      expect(activateDarkMode).toHaveBeenCalledTimes(0);
      expect(activateLightMode).toHaveBeenCalledTimes(0);
      expect(activateFallback).toHaveBeenCalledTimes(0);
    });

    test('should call activateFallback when no preference is set', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === noPrefQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateFallback });
      expect(activateDarkMode).toHaveBeenCalledTimes(0);
      expect(activateLightMode).toHaveBeenCalledTimes(0);
      expect(activateFallback).toHaveBeenCalledTimes(1);
    });

    test('should call activateFallback when no matchMedia support', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === '',
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ activateFallback });
      expect(activateDarkMode).toHaveBeenCalledTimes(0);
      expect(activateLightMode).toHaveBeenCalledTimes(0);
      expect(activateFallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('listeners', () => {
    test('should add listeners to matchMedia queries', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: true,
        media,
        addListener,
        removeListener: f => f
      }));
      darkmode();
      expect(addListener).toHaveBeenCalledTimes(2);
    });
  });
});
