import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

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
            '<p>我爱你<img src="/Pasted image 20240411144818.png" alt="/Pasted image 20240411144818.png"></img></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
})
