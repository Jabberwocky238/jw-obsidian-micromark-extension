import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('readme', async function (t) {
    await t.test('default', async function () {
        const str = [
            '[[this is a link]]',
            '![[this is an image.png]]',
            '==this is highlight (mark)==',
            '==robus=tness=='
        ].join('\r\n\r\n')
        assert.equal(
            micromark(str, {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()]
            }),
            [
                '<p><a href="/this is a link.md">this is a link</a></p>',
                '<p><img src="/assets/this is an image.png" alt="/assets/this is an image.png"></img></p>',
                '<p><mark>this is highlight (mark)</mark></p>',
                '<p><mark>robus=tness</mark></p>'
            ].join('\r\n')
        )
    })
})
