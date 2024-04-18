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

## Options
```js
export type JwOptions = {
  baseDir?: string;
  extract?: (token: string) => void | undefined;
  reflexMap?: Map<string, string[]> | undefined;
};
```

### baseDir

```js
micromark('[[OCA 我草泥马————asd_ _]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml({baseDir: 'markdown'})],
})
```

```html
<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>
```

ps: work fine for image too

### extract

```js
let _token = ''
const _extract = (token) => {
  _token = token
}
micromark('[[OCA 我草泥马————asd_ _]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml({baseDir: 'wowow', extract: _extract})],
})
assert.equal(_token, "/wowow/OCA 我草泥马————asd_ _.md")
```

ps: this will not change token inside the state machine

### reflexMap

```js
micromark('[[OCA 我草泥马————asd_ _]]', {
  extensions: [jwObsidian()],
  htmlExtensions: [jwObsidianHtml({
    baseDir: 'markdown', 
    reflexMap: new Map([['OCA 我草泥马————asd_ _.md', ['concepts', 'OCA 我草泥马————asd_ _.md']]])
  })],
})
```

```html
<p><a href="/markdown/concepts/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>
```

ps: do NOT work for picture yet


## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[micromark]: https://github.com/micromark/micromark
