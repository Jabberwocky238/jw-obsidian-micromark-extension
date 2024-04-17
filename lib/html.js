/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
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
 * @typedef {Record<string, Handle> & {assetsDir: string}} HtmlOptions
 * @param {HtmlOptions | null | undefined} [options={}]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options) {
  return {
    enter: {
      jwObsidianImageString: enterVariableString
    },
    exit: {
      jwObsidianImageString: exitVariableString
    }
  };

  /**
   * @this {CompileContext}
   * @returns {undefined}
   */
  function enterVariableString() {
    this.buffer();
  }

  /**
   * @this {CompileContext}
   * @returns {undefined}
   */
  function exitVariableString() {
    let assetsDir = options?.assetsDir
    if (assetsDir === undefined) {
      assetsDir = 'assets'
    }
    var id = this.resume();
    this.tag('<img src="/' + assetsDir + '/' + id + '" alt="'+ id + '"></img>');
  }
}