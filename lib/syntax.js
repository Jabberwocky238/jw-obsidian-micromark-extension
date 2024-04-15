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

const imageConstruct = {
  name: 'jwObsidianImage',
  tokenize: jwObsidianImageTokenize
};

/** @type {ConstructRecord} */
const text = {};
text[33] = imageConstruct;

/**
 * Create an extension for `micromark` to support GitHub autolink literal
 * syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   autolink literal syntax.
 */
export function jwObsidian() {
  return {
    text
  };
}
function jwObsidianImageTokenize(effects, ok, nok) {
  let bracket_cnt = 0;
  let temp = "";
  return start;
  function start(code) {
    effects.enter('jwObsidianImage');
    effects.enter('jwObsidianImageMarker');
    effects.consume(code);
    temp += String.fromCodePoint(code);
    console.log(temp);
    return LSB;
  }
  function LSB(code) {
    if (code === 91) {
      bracket_cnt++;
      effects.consume(code);
      temp += String.fromCodePoint(code);
      console.log(temp);
    } else return nok(code);
    if (bracket_cnt == 2) {
      effects.exit('jwObsidianImageMarker');
      effects.enter('jwObsidianImageString');
      effects.enter('chunkString', {
        contentType: 'string'
      });
      return inside;
    } else return LSB;
  }
  function inside(code) {
    if (code === -5 || code === -4 || code === -3 || code === null) {
      return nok(code);
    }
    if (code === 92) {
      effects.consume(code);
      return insideEscape;
    }
    function insideEscape(code) {
      if (code === 92 || code === 125) {
        effects.consume(code);
        return inside;
      }
      return inside(code);
    }
    if (code === 93) {
      effects.exit('chunkString');
      effects.exit('jwObsidianImageString');
      effects.enter('jwObsidianImageMarker');
      return RSB;
    }
    effects.consume(code);
    temp += String.fromCodePoint(code);
    console.log(temp);
    return inside;
  }
  function RSB(code) {
    if (code === 93) {
      bracket_cnt--;
      effects.consume(code);
      temp += String.fromCodePoint(code);
      console.log(temp);
    } else return nok(code);
    if (bracket_cnt == 0) {
      effects.exit('jwObsidianImageMarker');
      effects.exit('jwObsidianImage');
      return ok(code);
    } else return RSB;
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