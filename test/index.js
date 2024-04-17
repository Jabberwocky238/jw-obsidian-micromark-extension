import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('![[image]]', async function (t) {
  await t.test('![[Pasted image 20240411144818.png]]', async function () {
    assert.equal(
      micromark('我爱你![[Pasted image 20240411144818.png]]dsgsdfsfc', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml()],
      }),
      '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img>dsgsdfsfc</p>'
    )
  })
})
