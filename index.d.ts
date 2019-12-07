declare enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  NO_PREF = 'no-preference',
  NO_SUPP = 'no-support'
}

interface Config {
  onChange: (activeTheme: Theme, themes: typeof Theme) => void;
}

interface DarkModeJS {
  removeListeners: () => void;
}

declare function darkmodejs(config: Config): DarkModeJS;

export = darkmodejs;
