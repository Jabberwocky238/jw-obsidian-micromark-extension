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

const output1 = micromark('![[Pasted image 20240411144818.png]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml()]
})
const output2 = micromark('[[OCA 我草泥马————asd_ _]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml()]
})
console.log(output1)
console.log(output2)
```

Yields:

```html
<p><img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img></p>
<p><a href="/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>
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
