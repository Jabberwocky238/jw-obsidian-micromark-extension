import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('![[AAAA]]', async function (t) {
    await t.test('default', async function () {
        assert.equal(
            micromark(
                '我爱你![[Pasted image 20240411144818.png]]\r\n\r\ndsgsdfsfc',
                {
                    extensions: [jwObsidian()],
                    htmlExtensions: [jwObsidianHtml()]
                }
            ),
            '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="/assets/Pasted image 20240411144818.png"></img></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
})
