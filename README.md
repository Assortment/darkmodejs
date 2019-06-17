# darkmodejs

<div>

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/lukewhitehouse/darkmodejs.svg)](https://github.com/lukewhitehouse/darkmodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/lukewhitehouse/darkmodejs.svg)](https://github.com/lukewhitehouse/darkmodejs/pulls)
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
$ npm install darkmodejs
```

## 🎈 Usage <a name="usage"></a>

```js
import darkmode from 'darkmodejs';

const config = {
  activateDarkMode: () => {},
  activateLightMode: () => {},
  activateFallback: () => {}
};

darkmode(config);
```

If you need ES5 support, you can `require` the package instead.

```js
const darkmode = require('darkmodejs');
```

## ⚙ API

`darkmodejs` accepts a `config` object of functions.

#### activateDarkMode

**Type:** `Function`. **Required:** `No`.

This function will be run whenever `(prefers-color-scheme: dark)` returns `true`. Both initially and using a [MediaQueryList.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener) to listen for changes to your theme.

#### activateLightMode

**Type:** `Function`. **Required:** `No`.

This function will be run whenever `(prefers-color-scheme: light)` returns `true`. Both initially and using a [MediaQueryList.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener) to listen for changes to your theme.

#### activateFallback

**Type:** `Function`. **Required:** `No`.

This function will be run either when `(prefers-color-scheme: no-preference)` returns `true`, or there is no Browser Support for `prefers-color-scheme`. Only runs once.

## ✍️ License

MIT © [Luke Whitehouse](https://lukewhitehouse.co.uk)
