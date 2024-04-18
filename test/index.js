import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-obsidian-micromark-extension'

test('图片', async function (t) {
  await t.test('默认情况', async function () {
    assert.equal(
      micromark('我爱你![[Pasted image 20240411144818.png]]dsgsdfsfc', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml()],
      }),
      '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img>dsgsdfsfc</p>'
    )
  })

  await t.test('指定baseDir', async function () {
    assert.equal(
      micromark('我爱你![[Pasted image 20240411144818.png]]dsgsdfsfc', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({baseDir: 'markdown'})],
      }),
      '<p>我爱你<img src="/markdown/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img>dsgsdfsfc</p>'
    )
  })
})

test('反向链接', async function (t) {
  await t.test('默认情况', async function () {
    assert.equal(
      micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml()],
      }),
      '<p><a href="/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
    )
  })

  await t.test('指定baseDir', async function () {
    assert.equal(
      micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({baseDir: 'markdown'})],
      }),
      '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
    )
  })
  
  await t.test('指定文件夹', async function () {
    assert.equal(
      micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({
          baseDir: 'markdown', 
          reflexMap: new Map([['OCA 我草泥马————asd_ _.md', ['concepts', 'OCA 我草泥马————asd_ _.md']]])
        })],
      }),
      '<p><a href="/markdown/concepts/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
    )
  })

  await t.test('提取链接', async function () {
    let _token = ''
    const _extract = (token) => {
      _token = token
    }
    micromark('[[OCA 我草泥马————asd_ _]]', {
      extensions: [jwObsidian()],
      htmlExtensions: [jwObsidianHtml({baseDir: 'wowow', extract: _extract})],
    })
    assert.equal(_token, "/wowow/OCA 我草泥马————asd_ _.md")
  })
})

