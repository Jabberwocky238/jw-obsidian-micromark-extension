# jw-obsidian-micromark-extension

```sh
npm install jw-obsidian-micromark-extension
```

https://github.com/Jabberwocky238/micromicro

[micromark][] extensions to support Obsidian asset & link.

## Use

```js
import { micromark } from 'micromark'
import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

const str = [
  '[[this is a link]]',
  '![[this is an image.png]]',
  '==this is highlight (mark)==',
  '==robus=tness==',
].join('\r\n\r\n')

const result = micromark(str, {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml()],
})
```

Yields:

```html
<p><a href="/this is a link.md">this is a link</a></p>
<p><img src="/assets/this is an image.png" alt="/assets/this is an image.png"></img></p>
<p><mark>this is highlight (mark)</mark></p>
<p><mark>robus=tness</mark></p>
```

## Caution

I am extremely sorry for no doc here. 

but i think the test case is simple enough to make you understand how it works.

after i finalize my education test i will rewrite a doc.

## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[micromark]: https://github.com/micromark/micromark
