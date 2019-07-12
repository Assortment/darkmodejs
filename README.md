# darkmodejs

<div>

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![npm](https://img.shields.io/npm/v/@assortment/darkmodejs.svg)](https://www.npmjs.com/package/@assortment/darkmodejs)

</div>

---

Utility package for managing Dark Mode on the web.

> Dark Mode is a feature in modern Operating Systems which allows you to change your default UI from a light to dark theme. On the web we can take advantage of this to control the theme of our website.

Utilises the [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API and its listeners, in combination with the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query, in order to fire functions whenever you're in Dark Mode.

![Example application using darkmodejs in Windows 10 Firefox](https://i.imgur.com/ZR2aGIE.gif)
_Example application using darkmodejs in Windows 10 Firefox_

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
import darkmodejs from '@assortment/darkmodejs';

const config = { onChange: (activeTheme, themes) => {} };

darkmodejs(config);
```

If you need ES5 support, you can `require` the package instead.

```js
const darkmodejs = require('@assortment/darkmodejs');
```

An example could be logging to console when a theme is active:

```js
import darkmodejs from '@assortment/darkmodejs';

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

darkmodejs({ onChange });
```

You can also do a spot of cleanup by calling the `removeListeners` function that is returned from `darkmodejs`. It removes both `DARK` and `LIGHT` query listeners.

```js
const dmjs = darkmodejs({ onChange });

dmjs.removeListeners();
```

This can be useful when unmounting components or pages that use dynamic routing techniques.

## ⚙ API

### config

`darkmodejs` accepts a `config` object, which in turn accepts a single function of `onChange`.

#### `onChange(activeTheme, themes)`

_**Type:** `Function`. **Required:** `No`._

This function is called when `darkmodejs` is executed to check:

- if there is support for `prefers-color-scheme`;
- if the `dark`, `light` or `no-preference` theme is active.

The function is also bound to [MediaQueryList.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener) to listen for changes.

##### `activeTheme`

_**Type:** `String`. **Required:** `No`._

Returns the current active theme.

##### `themes`

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

### returned

Once initiated, you also have access to the `removeListeners` function for cleanup purposes.

#### `removeListeners`

_**Type**: `Function`._

Removes both `DARK` and `LIGHT` query listeners.

## 🎬 Examples

The following examples are taken from `darkmodejs-demo`, a demo application created to show how you can use `@assortment/darkmodejs` in conjunction with [Emotion Theming](https://emotion.sh/docs/theming) to control your website's theme based on a user's OS preference.

- 💻 Code: https://github.com/Assortment/darkmodejs-demo
- 🌐 URL: https://darkmodejs-demo.netlify.com/

### MacOS

#### Safari (supported)

![Supported in MacOS with Safari](https://i.imgur.com/OZLBAV8.gif)

#### Firefox (supported)

![Supported in MacOS with Firefox](https://i.imgur.com/2IBdHYK.gif)

### Windows 10

#### Firefox (supported)

![Supported in Windows 10 with Firefox](https://i.imgur.com/ZR2aGIE.gif)

#### Chrome (not supported until Chrome 76)

![Not supported in Windows 10 with Chrome 75](https://i.imgur.com/C6pyZVr.gif)

### No preference

Special mention to `no-preference`. To my knowledge I don't believe any Operating System currently allows for a no preference option, so there's no current circumstance where this returns true from a `prefers-color-scheme` media query. That said, [as its part of the specification](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) I've included it as an option in the demo app if you ever want to do anything specific.

![Example no preference theme set](https://i.gyazo.com/5555e2439eadfcf80e184b7a4434fbc5.png)

## ✍️ License

MIT © [Luke Whitehouse](https://lukewhitehouse.co.uk)
