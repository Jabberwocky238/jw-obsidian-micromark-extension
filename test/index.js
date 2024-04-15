import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('micromark-extension-gfm-autolink-literal', async function (t) {
  await t.test('![[Pasted image 20240411144818.png]]', async function () {
    assert.equal(
      micromark('esdfsdfs![[Pasted image 20240411144818.png]]dsgsdfsfc', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml()],
      }),
      '<p>esdfsdfs<img src="Pasted image 20240411144818.png">Pasted image 20240411144818.png</img>dsgsdfsfc</p>'
    )
  })
})
