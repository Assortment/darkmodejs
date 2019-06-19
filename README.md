# darkmodejs

<div>

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/assortment/darkmodejs.svg)](https://github.com/assortment/darkmodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/assortment/darkmodejs.svg)](https://github.com/assortment/darkmodejs/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

Utility package for managing Dark Mode on the web.

> Dark Mode is a feature in modern Operating Systems which allows you to change your default UI from a light to dark theme. On the web we can take advantage of this to control the theme of our website.

Utilises the [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API and its listeners, in combination with the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query, in order to fire functions whenever you're in Dark Mode.

## 📝 Prerequisites

Requires an Operating System which supports Dark Mode:

- macOS 10.14
- iOS 13.0
- iPadOS 13.0
- Windows 10
- ... or greater

Also requires support for the `prefers-color-scheme` media query. A complete list of [supported browsers](https://caniuse.com/#search=prefers-color-scheme) can be found on caniuse.

## 🏁 Install

```
$ npm install @assortment/darkmodejs
```

## 🎈 Usage <a name="usage"></a>

```js
import darkmode from '@assortment/darkmodejs';

const config = { onChange: (activeTheme, themes) => {} };

darkmode(config);
```

If you need ES5 support, you can `require` the package instead.

```js
const darkmode = require('@assortment/darkmodejs');
```

An example could be logging to console when a theme is active:

```js
import darkmode from '@assortment/darkmodejs';

const onChange = (activeTheme, themes) => {
  switch (activeTheme) {
    case themes.DARK:
      console.log('darkmode enabled');
      break;
    case themes.LIGHT:
      console.log('lightmode enabled');
      break;
    case themes.NO_PREF:
      console.log('no preference enabled');
      break;
    case themes.NO_SUPP:
      console.log('no support sorry');
      break;
  }
};

darkmode({ onChange });
```

## ⚙ API

`darkmodejs` accepts a `config` object, which in turn accepts a single function of `onChange`.

### `onChange(activeTheme, themes)`

_**Type:** `Function`. **Required:** `No`._

This function is called when `darkmodejs` is executed to check:

- if there is support for `prefers-color-scheme`;
- if the `dark`, `light` or `no-preference` theme is active.

The function is also bound to [MediaQueryList.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener) to listen for changes.

#### `activeTheme`

_**Type:** `String`. **Required:** `No`._

Returns the current active theme.

#### `themes`

_**Type:** `Object{String}`. **Required:** `No`._

Returns all available theme states:

```
{
  DARK: 'dark',
  LIGHT: 'light',
  NO_PREF: 'no-preference',
  NO_SUPP: 'no-support'
}
```

## ✍️ License

MIT © [Luke Whitehouse](https://lukewhitehouse.co.uk)
