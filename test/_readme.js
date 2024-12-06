import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'

import { micromark } from 'micromark'
import { jwObsidian, jwObsidianHtml } from 'jw-micromark-toolbox'

// node test/_readme.js

test('readme', async function (t) {
    await t.test('default', async function () {
        const content1 = fs.readFileSync('test/_readme.md', 'utf8')
        const content2 = fs.readFileSync('test/_readme.html', 'utf8')
        assert.equal(
            micromark(content1, {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({
                    linkprefix: 'assets'
                })]
            }),
            content2
        )
    })
})
