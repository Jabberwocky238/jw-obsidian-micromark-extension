# jw-obsidian-micromark-extension

```sh
npm install jw-obsidian-micromark-extension
```

```js
import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'
```

https://github.com/Jabberwocky238/micromicro

[micromark][] extensions to support Obsidian asset link.


## Use

```js
import { micromark } from 'micromark'
import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

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

```js
import { micromark } from 'micromark'
import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

const output = micromark('![[Pasted image 20240411144818.png]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml({baseDir: 'markdown'})]
})

console.log(output)
```

Yields:

```html
<p><img src="/markdown/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img></p>
```

## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[micromark]: https://github.com/micromark/micromark
