import assert from 'node:assert/strict'
import test from 'node:test'
import { micromark } from 'micromark'

import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

test('readme', async function (t) {
    await t.test('default', async function () {
        const str = [
            '[[this is a link]]',
            '![[this is an image.png]]',
            '==this is highlight (mark)==',
            '==robus=tness==',
        ].join('\r\n\r\n')
        assert.equal(
            micromark(str, {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            ['<p><a href="/this is a link.md">this is a link</a></p>',
            '<p><img src="/assets/this is an image.png" alt="/assets/this is an image.png"></img></p>',
            '<p><mark>this is highlight (mark)</mark></p>',
            '<p><mark>robus=tness</mark></p>'
            ].join('\r\n')
        )
    })
})

// 正常运行情况下的测试
test('[[AAAA]]', async function (t) {
    await t.test('default', async function () {
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p><a href="/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('base dir', async function () {
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ baseDir: 'markdown' })],
            }),
            '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('global edit', async function () {
        const edit = (token) => {
            return "/markdown" + token
        }
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ edit })],
            }),
            '<p><a href="/markdown/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('link edit', async function () {
        const _map = new Map([['OCA 我草泥马————asd_ _', ['concepts', 'OCA 我草泥马————asd_ _.md']]])
        const edit4link = (token) => {
            const candidate = _map.get(token)
            if (candidate) {
                token = candidate.join('/')
            }
            return "/markdown/" + token
        }
        // console.log(reflexMap)
        assert.equal(
            micromark('[[OCA 我草泥马————asd_ _]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ edit4link })],
            }),
            '<p><a href="/markdown/concepts/OCA 我草泥马————asd_ _.md">OCA 我草泥马————asd_ _</a></p>'
        )
    })

    await t.test('extract', async function () {
        let _token = ''
        const edit = (token) => {
            token = "/wowow" + token
            _token = token
            return token
        }
        micromark('[[OCA 我草泥马————asd_ _]]', {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml({ edit })],
        })
        assert.equal(_token, "/wowow/OCA 我草泥马————asd_ _.md")
    })
})

test('![[AAAA]]', async function (t) {
    await t.test('default', async function () {
        assert.equal(
            micromark('我爱你![[Pasted image 20240411144818.png]]\r\n\r\ndsgsdfsfc', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>我爱你<img src="/assets/Pasted image 20240411144818.png" alt="/assets/Pasted image 20240411144818.png"></img></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
})

test('==AAAA==', async function (t) {
    await t.test('default', async function () {
        assert.equal(
            micromark('我爱你==Pasted image 20240411144818.png==\r\n\r\ndsgsdfsfc', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>我爱你<mark>Pasted image 20240411144818.png</mark></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
    await t.test('middle =', async function () {
        assert.equal(
            micromark('我爱你==Pasted image 2024041 = 1144 = 818.png==\r\n\r\ndsgsdfsfc', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>我爱你<mark>Pasted image 2024041 = 1144 = 818.png</mark></p>\r\n<p>dsgsdfsfc</p>'
        )
    })
})

