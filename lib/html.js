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
 * @property {string} [imagePrefix]
 * @property {string} [linkSuffix]
 * @property {string} [baseDir]
 * @property {(token: string) => string} [replacement]
 */

/**
 * @param {JwOptions} [options]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options = {}) {
  if (options.imagePrefix === undefined) options.imagePrefix = 'assets'
  if (options.linkSuffix === undefined) options.linkSuffix = '.md'
  if (options.replacement === undefined) options.replacement = (token) => token
  if (options.baseDir === undefined) options.baseDir = ''


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
    let token_str = [options.baseDir, options.imagePrefix, id]
      .filter((item) => item !== '')
      .join('/')
    if (options.replacement !== undefined) {
      token_str = options.replacement(token_str)
    }
    // console.log(token)
    this.tag('<img src="' + slashcheck(token_str) + '" alt="' + id + '">');
    this.tag('</img>');
  }

  /**
   * @this {CompileContext}
   * @type {Handle}
   * @returns {undefined}
   */
  function exitVariableLinkString(token) {
    // this.resume();
    let token_str = [options.baseDir, this.sliceSerialize(token) + options.linkSuffix]
      .filter((item) => item !== '')
      .join('/')
    if (options.replacement !== undefined) {
      token_str = options.replacement(token_str)
    }
    this.tag('<a href="' + slashcheck(this.encode(token_str)) + '">');
    this.raw(this.sliceSerialize(token));
    this.tag('</a>');
  }
}

/**
 * @param {string} str
 */
function slashcheck(str) {
  if(!str.startsWith('/')){
    return '/' + str
  }
  return str
}