import assert from 'node:assert/strict'
import test from 'node:test'
import { micromark } from 'micromark'

import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'


// 正常运行情况下的测试
test('[[AAAA]]', async function (t) {
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
        const replacement = (token) => {
            return "markdown/" + token
        }
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ replacement })],
            }),
            '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('指定文件夹', async function () {
        const _map = new Map([['OCA 我草泥马————asd_ _.md', ['concepts', 'OCA 我草泥马————asd_ _.md']]])
        const replacement = (token) => {
            const candidate = _map.get(token)
            if(candidate){
                token = candidate.join('/')
            }
            return "markdown/" + token
        }
        // console.log(reflexMap)
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({
                    replacement
                })],
            }),
            '<p><a href="/markdown/concepts/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('提取链接', async function () {
        let _token = ''
        const replacement = (token) => {
            token = "/wowow/" + token
            _token = token
            return token
        }
        micromark('[[OCA 我草泥马————asd_ _]]', {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml({ replacement })],
        })
        assert.equal(_token, "/wowow/OCA 我草泥马————asd_ _.md")
    })
})

test('![[AAAA]]', async function (t) {
    await t.test('默认情况', async function () {
        assert.equal(
            micromark('我爱你![[Pasted image 20240411144818.png]]\r\n\r\ndsgsdfsfc', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
    await t.test('指定baseDir', async function () {
        assert.equal(
            micromark('我爱你![[Pasted image 20240411144818.png]]dsgsdfsfc', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img>dsgsdfsfc</p>'
        )
    })
})