import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { micromark } from 'micromark'

import { jwObsidian, jwObsidianHtml } from 'jw-obsidian-micromark-extension'

/** @param {String} filepath */
function readFileSync4test(filepath){
    return readFileSync(filepath)
    .toString()
    .replaceAll(/\r/g, '')
    .replaceAll(/\n/g, '')
}

test('test4files', async function (t) {
    await t.test('normal-image', async function () {
        const file1 = readFileSync4test("./test/testfile/normal-image.md")
        const file2 = readFileSync4test("./test/testfile/normal-image.html")
        assert.equal(
            micromark(file1, {
                extensions: [jwObsidian()],
                htmlExtensions: [jwObsidianHtml()],
            }).replaceAll(/\r/g, '').replaceAll(/\n/g, ''),
            file2
        )
    })

})