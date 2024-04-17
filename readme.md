# jw-obsidian-micromark-extension

```sh
npm install jw-obsidian-micromark-extension
```

```js
import {jwObsidian, jwObsidianHtml} from 'https://esm.sh/micromark-extension-gfm-autolink-literal@2'
```

https://github.com/Jabberwocky238/micromicro

[micromark][] extensions to support Obsidian asset link.


## Use

```js
import {micromark} from 'micromark'
import {
  gfmAutolinkLiteral,
  gfmAutolinkLiteralHtml
} from 'micromark-extension-gfm-autolink-literal'

const output = micromark('![[Pasted image 20240411144818.png]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml()]
})

console.log(output)
```

Yields:

```html
<p><img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img></p>
```

## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[micromark]: https://github.com/micromark/micromark
