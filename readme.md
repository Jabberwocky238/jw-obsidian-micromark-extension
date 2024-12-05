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
    '==robus=tness=='
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
<p><mark>robus=tness</mark></p>
```

## Options

there are 5 options for jwObsidianHtml:

-   `baseDir`: string, default `''`
-   `edit`: function, default `(token) => token`
-   `edit4image`: function, default `(token) => ['assets', token].join('/')`
-   `edit4link`: function, default `(token) => [token, '.md'].join('')`
-   `edit4mark`: function, default `(token) => token`

### baseDir

```js
micromark('[[OCA 我草泥马————asd_ _]]', {
    extensions: [jwObsidian()],
    htmlExtensions: [jwObsidianHtml({baseDir: 'markdown'})]
}),
    '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
```

### edit

```js
const edit = (token) => {
    return '/markdown' + token
}
assert.equal(
    micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({edit})]
    }),
    '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
)
```

### edit4link

```js
const _map = new Map([
    ['OCA 我草泥马————asd_ _', ['concepts', 'OCA 我草泥马————asd_ _.md']]
])
const edit4link = (token) => {
    const candidate = _map.get(token)
    if (candidate) {
        token = candidate.join('/')
    }
    return '/markdown/' + token
}
// console.log(reflexMap)
assert.equal(
    micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({edit4link})]
    }),
    '<p><a href="/markdown/concepts/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
)
```

PS: `edit4image` and `edit4mark` are literally the same as `edit4link`

PPS: `edit4sth` run before `edit`, in `edit4sth` you will get directly the raw token, but in `edit` you will get the token after `edit4sth`, which is exact the token filling the slot. So if not necessary, do not use `edit`, maybe dangerous?

PPPS: `edit` will affect every situation!!! I personnally use it for get the token but not edit it.

## Thanks

-   [micromark-extension-wiki-link](https://github.com/landakram/micromark-extension-wiki-link)
-   [micromark-extension-directive](https://github.com/micromark/micromark-extension-directive)

## License

[MIT][license]

[npm]: https://docs.npmjs.com/cli/install
[license]: license
[micromark]: https://github.com/micromark/micromark
