/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {Record<string, Handle>} HtmlOptions
 */

// variablesHtml is a function that 
// receives an object mapping “variables” to strings and returns an HTML extension. 



// The extension hooks two functions to variableString, 
// one when it starts, the other when it ends. 
// We don’t need to do anything to handle the other tokens as they’re already ignored by default. 
// enterVariableString calls buffer, which is a function that “stashes” what would otherwise be emitted. 
// exitVariableString calls resume, which is the inverse of buffer and returns the stashed value. 
// If the variable is defined, we ensure it’s made safe (with this.encode) and finally output that (with this.raw).

/**
 * @typedef JwOptions
 * @property {string} [baseDir='']
 * @property {(token: string) => void | undefined} [extract]
 * @property {Map<string, string[]> | undefined} [reflexMap]
 */

/**
 * @param {JwOptions | null | undefined} [options]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options) {
  const hasOptions = options !== undefined && options !== null
  return {
    enter: {
      jwObsidianImageString: enterVariableString,
      jwObsidianLinkString: enterVariableString,
    },
    exit: {
      jwObsidianImageString: exitVariableImageString,
      jwObsidianLinkString: exitVariableLinkString,
    }
  };

  /**
   * @this {CompileContext}
   * @returns {undefined}
   */
  function enterVariableString() {
    // this.buffer();
  }

  /**
   * @this {CompileContext}
   * @type {Handle}
   * @returns {undefined}
   */
  function exitVariableImageString(token) {
    // this.resume();
    const id = this.sliceSerialize(token)
    const src = (hasOptions ? '/' + options.baseDir : '') + '/assets/' + id
    // console.log(token)
    this.tag('<img src="' + src + '" alt="'+ id + '">');
    this.tag('</img>');
  }

  /**
   * @this {CompileContext}
   * @type {Handle}
   * @returns {undefined}
   */
  function exitVariableLinkString(token) {
    // this.resume();
    let token_str = this.encode(this.sliceSerialize(token))
    let real_url = token_str
    if(hasOptions && options.reflexMap !== undefined) {
      console.log(options.reflexMap)
      const real_url_candidate = options.reflexMap.get(token_str)
      if(real_url_candidate !== undefined){
        real_url = real_url_candidate.join('/')
      }
    }
    const href = (hasOptions ? '/' + options.baseDir : '') + '/' + real_url + '.md'
    // console.log(token)
    if(hasOptions && options.extract !== undefined){
      options.extract(href)
    }
    
    this.tag('<a href="' + href + '">');
    this.raw(token_str);
    this.tag('</a>');
  }
}