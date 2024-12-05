import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

test(':::AAAA:::', async function (t) {
    await t.test('default', common)
    await t.test('multline', multline)
    await t.test('with enter', with_enter)
    await t.test('with head', with_head)
    await t.test('one line', one_line)
})

const COMMON = `
:::
你好
:::
`
const COMMON_RES = `
<quote>
<p>你好</p>
</quote>
`

async function common() {
    assert.equal(
        micromark(COMMON, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        COMMON_RES
    )
}

const MULTLINE = `
:::
你好
再见
666树脂
:::
`
const MULTLINE_RES = `
<quote>
<p>你好</p>
<p>再见</p>
<p>666树脂</p>
</quote>
`

async function multline() {
    assert.equal(
        micromark(MULTLINE, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        MULTLINE_RES
    )
}


const WITH_NEXTLINE = `
:::
你好

再见

666树脂
:::
`
const WITH_NEXTLINE_RES = `
<quote>
<p>你好</p>
<br/>
<p>再见</p>
<br/>
<p>666树脂</p>
</quote>
`

async function with_enter() {
    assert.equal(
        micromark(WITH_NEXTLINE, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        WITH_NEXTLINE_RES
    )
}

const WITH_HEAD = `
:::666树脂
你好，再见
:::
`
const WITH_HEAD_RES = `
<quote>
<strong>666树脂</strong>
<p>你好，再见</p>
</quote>
`

async function with_head() {
    assert.equal(
        micromark(WITH_HEAD, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        WITH_HEAD_RES
    )
}

const ONE_LINE = `
:::666树脂:::
`
const ONE_LINE_RES = `
<quote>
<p>666树脂</p>
</quote>
`

async function one_line() {
    assert.equal(
        micromark(ONE_LINE, {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        ONE_LINE_RES
    )
}

