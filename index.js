module.exports = ({ onChange }) => {
  const themes = Object.freeze({
    DARK: 'dark',
    LIGHT: 'light',
    NO_PREF: 'no-preference',
    NO_SUPP: 'no-support'
  });
  const darkQuery = window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`);
  const lightQuery = window.matchMedia(`(prefers-color-scheme: ${themes.LIGHT})`);
  const noPrefQuery = window.matchMedia(`(prefers-color-scheme: ${themes.NO_PREF})`);
  const hasNoSupport = !darkQuery.matches && !lightQuery.matches && !noPrefQuery.matches;

  if (hasNoSupport) {
    return onChange(themes.NO_SUPP, themes);
  }

  if (darkQuery.matches) onChange(themes.DARK, themes);
  if (lightQuery.matches) onChange(themes.LIGHT, themes);
  if (noPrefQuery.matches) onChange(themes.NO_PREF, themes);

  darkQuery.addListener(e => e.matches && onChange(themes.DARK, themes));
  lightQuery.addListener(e => e.matches && onChange(themes.LIGHT, themes));
};
