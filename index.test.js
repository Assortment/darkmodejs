import darkmode from '.';

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
    addListener: f => f,
    removeListener: f => f
  }));
});

describe('darkmode', () => {
  afterEach(() => jest.clearAllMocks());

  describe('initial calls', () => {
    test('should call onChange correctly when in dark mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === darkModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.DARK, themes);
    });

    test('should call onChange correctly when in light mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === lightModeQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.LIGHT, themes);
    });

    test('should call onChange correctly when in no preference mode', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === noPrefQuery,
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.NO_PREF, themes);
    });

    test('should call onChange correctly when no prefers-color-scheme support', () => {
      window.matchMedia.mockImplementation(media => ({
        matches: media === '',
        media,
        addListener: f => f,
        removeListener: f => f
      }));
      darkmode({ onChange });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(themes.NO_SUPP, themes);
    });
  });

  describe('listeners', () => {
    test('should call addListener to add both listeners', () => {
      const addListener = jest.fn();
      window.matchMedia.mockImplementation(media => ({
        matches: true,
        media,
        addListener,
        removeListener: f => f
      }));
      darkmode({ onChange });
      expect(addListener).toHaveBeenCalledTimes(2);
    });

    test('should call removeListener to remove both listeners', () => {
      const removeListener = jest.fn();
      window.matchMedia.mockImplementation(media => ({
        matches: true,
        media,
        addListener: f => f,
        removeListener
      }));
      const dmjs = darkmode({ onChange });
      dmjs.removeListeners();
      expect(removeListener).toHaveBeenCalledTimes(2);
    });
  });
});
