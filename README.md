# Google Translation API

## Import Files

```js
const Translate = require('google-translation-api');
// or
import Translate from 'google-translation-api';
```

## Usage

```js
// Translate Text
Translate(text, options).then(data);
// Get language name
let name = Translate.getName(languageISO);
// Get language iso
let iso = Translate.getCode(languageName);
```

## Examples

### Translate
```js
Translate('I Speak Chinese!', { to: 'zh' }).then(data => {
  // Translation Text
  console.log(data.to.text); // 我说中文
  // Translation to language iso
  console.log(data.to.iso); // zh
  // Translation to language name
  console.log(data.to.lang); // Chinese
  // Translation from text
  console.log(data.from.text); // I Speak Chinese!
  // Translation from language iso
  console.log(data.from.iso); // en
  // Translation from language name
  console.log(data.from.lang);
});
```
### Get Language Name

```js
const name = Translate.getName('en');
console.log(name); // English
```

### Get Language ISO

```js
const iso = Translate.getCode('english');
console.log(iso); // English
```

## Methods

```
getCode - Get language iso using language name
getName - Get language name using language iso
getLanguages - Get all languages | name: iso |
```

## Returns

```
to: {
  text: string,
  iso: string,
  lang: string
}
from: {
  text: string
  iso: string,
  lang: string
}
```
