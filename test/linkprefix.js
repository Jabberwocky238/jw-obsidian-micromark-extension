import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

// node test/linkprefix.js

test('linkprefix', async function (t) {
    await t.test('default', common)
})

const COMMON = `[hello](/world)`
const COMMON_RES = `<p><a href="/assets/world">hello</a></p>`

async function common() {
    assert.equal(
        micromark(COMMON, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml({
                linkprefix: 'assets'
            })]
        }),
        COMMON_RES
    )
}


