/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 */

import { codes } from 'micromark-util-symbol'

const imageConstruct = { name: 'jwObsidianImage', tokenize: jwObsidianImageTokenize, partial: true}

/** @type {ConstructRecord} */
const text = {}
text[codes.exclamationMark] = imageConstruct

/**
 * Create an extension for `micromark` to support GitHub autolink literal
 * syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   autolink literal syntax.
 */
export function jwObsidian() {
  return {text}
}


function jwObsidianImageTokenize(effects, ok, nok) {
  let bracket_cnt = 0
  let temp = ""
  return start

  function start(code) {
    effects.enter('jwObsidianImage')
    effects.enter('jwObsidianImageMarker')
    effects.consume(code)
    temp += String.fromCodePoint(code)
    console.log(temp)
    return LSB
  }

  function LSB(code) {
    if (code === codes.leftSquareBracket) {
      bracket_cnt++
      effects.consume(code)
      temp += String.fromCodePoint(code)
      console.log(temp)
    }
    else return nok(code)

    if (bracket_cnt == 2) {
      effects.exit('jwObsidianImageMarker')
      effects.enter('jwObsidianImageString')
      effects.enter('chunkString', { contentType: 'string' })
      return inside
    }
    else return LSB
  }

  function inside(code) {
    if (code === codes.carriageReturn ||
      code === codes.lineFeed ||
      code === codes.carriageReturnLineFeed ||
      code === null) {
      return nok(code)
    }

    if (code === codes.backslash) {
      effects.consume(code)
      return insideEscape
    }

    function insideEscape(code) {
      if (code === codes.backslash || code === codes.rightCurlyBrace) {
        effects.consume(code)
        return inside
      }
      return inside(code)
    }

    if (code === codes.rightSquareBracket) {
      effects.exit('chunkString')
      effects.exit('jwObsidianImageString')
      effects.enter('jwObsidianImageMarker')
      return RSB
    }

    effects.consume(code)
    temp += String.fromCodePoint(code)
    console.log(temp)
    return inside
  }

  function RSB(code) {
    if (code === codes.rightSquareBracket) {
      bracket_cnt--
      effects.consume(code)
      temp += String.fromCodePoint(code)
      console.log(temp)
    }
    else return nok(code)

    if (bracket_cnt == 0) {
      effects.exit('jwObsidianImageMarker')
      effects.exit('jwObsidianImage')
      return ok(code)
    }
    else return RSB
  }
}


// const imageConstruct = { name: 'jwObsidianImage', tokenize: imageTokenize }
// export const jwObsidian = { text: { [codes.exclamationMark]: imageConstruct } }

// let html = variablesHtml({ planet: '1', 'pla}net': '2' })
// let buf = "Hello, {planet}!"
// let out = micromark(buf, { extensions: [variables], htmlExtensions: [html] })
// console.log(out)

// html = variablesHtml({})
// buf = "adfgdags![[Pasted image 20240411144818.png]]sadgasdfs"
// out = micromark(buf, { extensions: [variables], htmlExtensions: [html] })
// console.log(out)

