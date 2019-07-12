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

  if (isSupported) {
    if (darkQuery.matches) onChange(themes.DARK, themes);
    if (lightQuery.matches) onChange(themes.LIGHT, themes);
    if (noPrefQuery.matches) onChange(themes.NO_PREF, themes);

    darkQuery.addListener(darkQueryListener);
    lightQuery.addListener(lightQueryListener);
  } else {
    onChange(themes.NO_SUPP, themes);
  }

  return {
    removeListeners: () => {
      if (isSupported) {
        darkQuery.removeListener(darkQueryListener);
        lightQuery.removeListener(lightQueryListener);
      }
    }
  }
};
