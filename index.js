module.exports = ({ onChange = () => {} }) => {
  const themes = Object.freeze({
    DARK: 'dark',
    LIGHT: 'light',
    NO_PREF: 'no-preference',
    NO_SUPP: 'no-support'
  });
  const darkQuery = window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`);
  const lightQuery = window.matchMedia(`(prefers-color-scheme: ${themes.LIGHT})`);
  const noPrefQuery = window.matchMedia(`(prefers-color-scheme: ${themes.NO_PREF})`);
  const isSupported = darkQuery.matches || lightQuery.matches || noPrefQuery.matches;
  const queryListener = (q, theme) => q.matches && onChange(theme, themes);
  const darkQueryListener = q => queryListener(q, themes.DARK);
  const lightQueryListener = q => queryListener(q, themes.LIGHT);

  if (!isSupported) {
    return onChange(themes.NO_SUPP, themes);
  }

  if (darkQuery.matches) onChange(themes.DARK, themes);
  if (lightQuery.matches) onChange(themes.LIGHT, themes);
  if (noPrefQuery.matches) onChange(themes.NO_PREF, themes);

  darkQuery.addListener(darkQueryListener);
  lightQuery.addListener(lightQueryListener);

  return {
    removeListeners: () => {
      darkQuery.removeListener(darkQueryListener);
      lightQuery.removeListener(lightQueryListener);
    }
  }
};
