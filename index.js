module.exports = (config = {}) => {
  const {
    activateDarkMode = () => {},
    activateLightMode = () => {},
    activateFallback = () => {}
  } = config;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
  const noPrefQuery = window.matchMedia('(prefers-color-scheme: no-preference)');
  const hasNoSupport = !darkQuery.matches && !lightQuery.matches && !noPrefQuery.matches;

  if (darkQuery.matches) activateDarkMode();
  if (lightQuery.matches) activateLightMode();
  if (noPrefQuery.matches || hasNoSupport) activateFallback();

  darkQuery.addListener(e => e.matches && activateDarkMode());
  lightQuery.addListener(e => e.matches && activateLightMode());
};
