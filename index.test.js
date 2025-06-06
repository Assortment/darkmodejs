/**
 * @jest-environment jsdom
 */

const darkmode = require('./index');

const themes = {
  DARK: 'dark',
  LIGHT: 'light',
  NO_PREF: 'no-preference',
  NO_SUPP: 'no-support'
};
const onChange = jest.fn();
const darkModeQuery = '(prefers-color-scheme: dark)';
const lightModeQuery = '(prefers-color-scheme: light)';
const noPrefQuery = '(prefers-color-scheme: no-preference)';

beforeAll(() => {
  window.matchMedia = jest.fn(() => ({
    matches: false,
    addEventListener: f => f,
    removeEventListener: f => f
  }));
});

describe('darkmode', () => {
  afterEach(() => jest.clearAllMocks());

  describe('initial calls', () => {
    test('should call onChange correctly when in dark mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === darkModeQuery,
        media,
        addEventListener: f => f,
        removeEventListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.DARK, themes);
    });

    test('should call onChange correctly when in light mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === lightModeQuery,
        media,
        addEventListener: f => f,
        removeEventListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.LIGHT, themes);
    });

    test('should call onChange correctly when in no preference mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === noPrefQuery,
        media,
        addEventListener: f => f,
        removeEventListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.NO_PREF, themes);
    });

    test('should call onChange correctly when no prefers-color-scheme support', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === '',
        media,
        addEventListener: f => f,
        removeEventListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.NO_SUPP, themes);
    });
  });

  describe('listeners', () => {
    test('should call addEventListener to add both listeners', () => {
      const addEventListener = jest.fn();
      window.matchMedia.mockImplementation(media => ({
        matches: true,
        media,
        addEventListener,
        removeEventListener: f => f
      }));
      darkmode({ onChange });
      expect(addEventListener).toHaveBeenCalledTimes(2);
    });

    test('should call removeEventListener to remove both listeners', () => {
      const removeEventListener = jest.fn();
      window.matchMedia.mockImplementation(media => ({
        matches: true,
        media,
        addEventListener: f => f,
        removeEventListener
      }));
      const dmjs = darkmode({ onChange });
      dmjs.removeListeners();
      expect(removeEventListener).toHaveBeenCalledTimes(2);
    });
  });
});
