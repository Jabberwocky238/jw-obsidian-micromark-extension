import assert from 'node:assert/strict'
// Import fs from 'node:fs/promises'
import test from 'node:test'
import {micromark} from 'micromark'
// Import {rehype} from 'rehype'
// import {createGfmFixtures} from 'create-gfm-fixtures'
import {
  gfmAutolinkLiteral,
  gfmAutolinkLiteralHtml
} from 'micromark-extension-gfm-autolink-literal'

test('micromark-extension-gfm-autolink-literal', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(
        await import('micromark-extension-gfm-autolink-literal')
      ).sort(),
      ['gfmAutolinkLiteral', 'gfmAutolinkLiteralHtml']
    )
  })

  await t.test('should support a closing paren at TLD', async function () {
    assert.equal(
      micromark('www.a.)', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p><a href="http://www.a">www.a</a>.)</p>'
    )
  })

  await t.test('should support a no TLD', async function () {
    assert.equal(
      micromark('www.a b', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p><a href="http://www.a">www.a</a> b</p>'
    )
  })

  await t.test('should support a path instead of TLD', async function () {
    assert.equal(
      micromark('www.a/b c', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p><a href="http://www.a/b">www.a/b</a> c</p>'
    )
  })

  await t.test(
    'should support a replacement character in a domain',
    async function () {
      assert.equal(
        micromark('www.�a', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://www.%EF%BF%BDa">www.�a</a></p>'
      )
    }
  )

  await t.test(
    'should support non-ascii characters in a domain (http)',
    async function () {
      assert.equal(
        micromark('http://點看.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://%E9%BB%9E%E7%9C%8B.com">http://點看.com</a></p>'
      )
    }
  )

  await t.test(
    'should *not* support non-ascii characters in atext (email)',
    async function () {
      assert.equal(
        micromark('點看@example.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p>點看@example.com</p>'
      )
    }
  )

  await t.test(
    'should *not* support non-ascii characters in a domain (email)',
    async function () {
      assert.equal(
        micromark('example@點看.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p>example@點看.com</p>'
      )
    }
  )

  await t.test(
    'should support non-ascii characters in a domain (www)',
    async function () {
      assert.equal(
        micromark('www.點看.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://www.%E9%BB%9E%E7%9C%8B.com">www.點看.com</a></p>'
      )
    }
  )

  await t.test(
    'should support non-ascii characters in a path',
    async function () {
      assert.equal(
        micromark('www.a.com/點看', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://www.a.com/%E9%BB%9E%E7%9C%8B">www.a.com/點看</a></p>'
      )
    }
  )

  await t.test('should support a dash to start a domain', async function () {
    assert.equal(
      micromark('www.-a.b', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p><a href="http://www.-a.b">www.-a.b</a></p>'
    )
  })

  await t.test('should support a dollar as a domain name', async function () {
    assert.equal(
      micromark('www.$', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p><a href="http://www.$">www.$</a></p>'
    )
  })

  await t.test(
    'should support adjacent dots in a domain name',
    async function () {
      assert.equal(
        micromark('www.a..b.c', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://www.a..b.c">www.a..b.c</a></p>'
      )
    }
  )

  await t.test(
    'should support named character references in domains',
    async function () {
      assert.equal(
        micromark('www.a&a;', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="http://www.a">www.a</a>&amp;a;</p>'
      )
    }
  )

  await t.test(
    'should support a closing paren and period after a path',
    async function () {
      assert.equal(
        micromark('https://a.bc/d/e/).', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc/d/e/">https://a.bc/d/e/</a>).</p>'
      )
    }
  )

  await t.test(
    'should support a period and closing paren after a path',
    async function () {
      assert.equal(
        micromark('https://a.bc/d/e/.)', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc/d/e/">https://a.bc/d/e/</a>.)</p>'
      )
    }
  )

  await t.test(
    'should support a closing paren and period after a domain',
    async function () {
      assert.equal(
        micromark('https://a.bc).', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc">https://a.bc</a>).</p>'
      )
    }
  )

  await t.test(
    'should support a period and closing paren after a domain',
    async function () {
      assert.equal(
        micromark('https://a.bc.)', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc">https://a.bc</a>.)</p>'
      )
    }
  )

  await t.test(
    'should support a closing paren and period in a path',
    async function () {
      assert.equal(
        micromark('https://a.bc).d', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc).d">https://a.bc).d</a></p>'
      )
    }
  )

  await t.test(
    'should support a period and closing paren in a path',
    async function () {
      assert.equal(
        micromark('https://a.bc.)d', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc.)d">https://a.bc.)d</a></p>'
      )
    }
  )

  await t.test(
    'should support two closing parens in a path',
    async function () {
      assert.equal(
        micromark('https://a.bc/))d', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p><a href="https://a.bc/))d">https://a.bc/))d</a></p>'
      )
    }
  )

  await t.test('should not support ftp links', async function () {
    assert.equal(
      micromark('ftp://a/b/c.txt', {
        extensions: [gfmAutolinkLiteral()],
        htmlExtensions: [gfmAutolinkLiteralHtml()]
      }),
      '<p>ftp://a/b/c.txt</p>'
    )
  })

  // Note: GH comments/issues/PRs do not link this, but Gists/readmes do.
  // await t.test(
  //   'should support www links after Unicode punctuation',
  //   async function () {
  //     assert.equal(
  //       micromark('，www.example.com', {
  //         extensions: [gfmAutolinkLiteral()],
  //         htmlExtensions: [gfmAutolinkLiteralHtml()]
  //       }),
  //       '<p>，<a href="http://www.example.com">www.example.com</a></p>'
  //     )
  //   }
  // )

  await t.test(
    'should support http links after Unicode punctuation',
    async function () {
      assert.equal(
        micromark('，https://example.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p>，<a href="https://example.com">https://example.com</a></p>'
      )
    }
  )

  await t.test(
    'should support email links after Unicode punctuation',
    async function () {
      assert.equal(
        micromark('，example@example.com', {
          extensions: [gfmAutolinkLiteral()],
          htmlExtensions: [gfmAutolinkLiteralHtml()]
        }),
        '<p>，<a href="mailto:example@example.com">example@example.com</a></p>'
      )
    }
  )

  await t.test(
    'should not link character reference for `:`',
    async function () {
      assert.equal(
        micromark(
          'http&#x3A;//user:password@host:port/path?key=value#fragment',
          {
            extensions: [gfmAutolinkLiteral()],
            htmlExtensions: [gfmAutolinkLiteralHtml()]
          }
        ),
        '<p>http://user:password@host:port/path?key=value#fragment</p>'
      )
    }
  )

  await t.test(
    '![[Pasted image 20240411144818.png]]',
    async function () {
      assert.equal(
        micromark(
          '![[Pasted image 20240411144818.png]]',
          {
            extensions: [gfmAutolinkLiteral()],
            htmlExtensions: [gfmAutolinkLiteralHtml()]
          }
        ),
        '<img src="Pasted image 20240411144818.png" alt="Pasted image 20240411144818.png"></img>'
      )
    }
  )
})
