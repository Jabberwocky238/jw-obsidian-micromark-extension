import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { micromark } from 'micromark'

import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

export default test4file

/** @param {String} filepath */
function readFileSync4test(filepath){
    return readFileSync(filepath)
    .toString()
    .replaceAll(/\r/g, '')
    .replaceAll(/\n/g, '')
}

function defaultCheck(filepath){
    const file1 = readFileSync4test(filepath+".md")
    const file2 = readFileSync4test(filepath+".html")
    assert.equal(
        micromark(file1, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()],
        }).replaceAll(/\r/g, '').replaceAll(/\n/g, ''),
        file2
    )
}

function test4file() {
    test('test4files', async function (t) {
        await t.test('normal-image', async function () {
            defaultCheck("./test/testfile/normal-image")
        })
        await t.test('cross', async function () {
            defaultCheck("./test/testfile/cross")
        })
    })
}
test4file()