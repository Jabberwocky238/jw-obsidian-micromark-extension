# jw-micromark-toolbox

```sh
npm install jw-micromark-toolbox
```

https://github.com/Jabberwocky238/jw-micromark-toolbox

[micromark][] extensions to support Obsidian asset & link.

# Use

```js
import {micromark} from 'micromark'
import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

const str = [
    '[[this is a link]]',
    '![[this is an image.png]]',
    '==this is highlight (mark)==',
].join('\r\n\r\n')

const result = micromark(str, {
    extensions: [jwObsidian()],
    htmlExtensions: [jwObsidianHtml()]
})
```

Yields:

```html
<p><a href="/this is a link.md">this is a link</a></p>
<p><img src="/assets/this is an image.png" alt="/assets/this is an image.png"></img></p>
<p><mark>this is highlight (mark)</mark></p>
```

## Thanks

-   [micromark-extension-wiki-link](https://github.com/landakram/micromark-extension-wiki-link)
-   [micromark-extension-directive](https://github.com/micromark/micromark-extension-directive)

## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install
[license]: license
[micromark]: https://github.com/micromark/micromark
