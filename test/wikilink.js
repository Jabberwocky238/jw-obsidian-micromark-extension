import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'

import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

test('[[AAAA]]', async function (t) {
    await t.test('default', common)
    await t.test('global edit', global_edit)
    await t.test('extract', extract)
})

async function common() {
    assert.equal(
        micromark('[[OCA 我草泥马————asd_ _]]', {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml()]
        }),
        '<p><a href="/OCA 我草泥马————asd_ _">OCA 我草泥马————asd_ _</a></p>'
    )
}

async function global_edit() {
    const edit = (token) => {
        return '/markdown' + token
    }
    assert.equal(
        micromark('[[OCA 我草泥马————asd_ _]]', {
            extensions: [jwObsidian()],
            htmlExtensions: [jwObsidianHtml({edit})]
        }),
        '<p><a href="/markdown/OCA 我草泥马————asd_ _">OCA 我草泥马————asd_ _</a></p>'
    )
}


async function extract() {
    let _token = ''
    const edit = (token) => {
        token = '/wowow' + token
        _token = token
        return token
    }
    micromark('[[OCA 我草泥马————asd_ _]]', {
        extensions: [jwObsidian()],
        htmlExtensions: [jwObsidianHtml({edit})]
    })
    assert.equal(_token, '/wowow/OCA 我草泥马————asd_ _')
}
