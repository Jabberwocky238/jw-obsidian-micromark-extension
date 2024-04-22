import assert from 'node:assert/strict'
import test from 'node:test'
import { micromark } from 'micromark'
import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

//错误情况下的测试
test('错误情况', async function (t) {
    await t.test('这个是pic套link', async function () {
        assert.equal(
            micromark('这个是pic套link![[AA[[CCCC_ _ ]]AA]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }),
            '<p>这个是pic套link![[AA<a href="/CCCC_ _ .md">CCCC_ _ </a>AA]]</p>'
        )
    })
    await t.test('这个是link套pic', async function () {
        assert.equal(
            micromark('这个是link套pic[[CCC![[AAAA]]C_ _ ]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ baseDir: 'markdown' })],
            }),
            '<p>这个是link套pic[[CCC<img src="/markdown/assets/AAAA" alt="AAAA"></img>C_ _ ]]</p>'
        )
    })
    await t.test('这个是pic套pic', async function () {
        assert.equal(
            micromark('这个是pic套pic![[CCC![[AAAA]]C_ _ ]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ baseDir: 'markdown' })],
            }),
            '<p>这个是pic套pic![[CCC<img src="/markdown/assets/AAAA" alt="AAAA"></img>C_ _ ]]</p>'
        )
    })
    await t.test('这个是link套link', async function () {
        assert.equal(
            micromark('这个是link套link[[CCC[[CCCC_ _ ]]C_ _ ]]', {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml({ baseDir: 'markdown' })],
            }),
            '<p>这个是link套link[[CCC<a href="/CCCC_ _ .md">CCCC_ _ </a>C_ _ ]]</p>'
        )
    })
})