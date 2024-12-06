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

micromark("your input", {
    extensions: [jwObsidian()],
    htmlExtensions: [jwObsidianHtml({
        linkprefix: "assets"
    })]
})
```


```markdown
[[this is a link]]

![[this is an image.png]]

==this is highlight (mark)==

[modified link](/blog/or/may/be/not/blog)
```

Yields:

```html
<p><a href="/this is a link.md">this is a link</a></p>
<p><img src="/this is an image.png" alt="/this is an image.png"></img></p>
<p><mark>this is highlight (mark)</mark></p>
<p><a href="/assets/blog/or/may/be/not/blog">modified link</a></p>
```

## Thanks

-   [npm](https://docs.npmjs.com/cli/install)
-   [micromark](https://github.com/micromark/micromark)
-   [micromark-extension-wiki-link](https://github.com/landakram/micromark-extension-wiki-link)
-   [micromark-extension-directive](https://github.com/micromark/micromark-extension-directive)

## License

[MIT][license]

