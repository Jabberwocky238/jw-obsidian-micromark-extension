import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('==AAAA==', async function (t) {
    await t.test('default', async function () {
        assert.equal(
            micromark(
                '我爱你==Pasted image 20240411144818.png==\r\n\r\ndsgsdfsfc',
                {
                    extensions: [jwObsidian()],
                    htmlExtensions: [jwObsidianHtml()]
                }
            ),
            '<p>我爱你<mark>Pasted image 20240411144818.png</mark></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
    await t.test('middle =', async function () {
        assert.equal(
            micromark(
                '我爱你==Pasted image 2024041 = 1144 = 818.png==\r\n\r\ndsgsdfsfc',
                {
                    extensions: [jwObsidian()],
                    htmlExtensions: [jwObsidianHtml()]
                }
            ),
            '<p>我爱你<mark>Pasted image 2024041 = 1144 = 818.png</mark></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
})
