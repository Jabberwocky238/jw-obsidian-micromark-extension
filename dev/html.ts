

import type { CompileContext, Handle, HtmlExtension, Token } from 'micromark-util-types'
type HtmlOptions = Record<string, Handle>

// variablesHtml is a function that 
// receives an object mapping “variables” to strings and returns an HTML extension. 

// The extension hooks two functions to variableString, 
// one when it starts, the other when it ends. 
// We don’t need to do anything to handle the other tokens as they’re already ignored by default. 
// enterVariableString calls buffer, which is a function that “stashes” what would otherwise be emitted. 
// exitVariableString calls resume, which is the inverse of buffer and returns the stashed value. 
// If the variable is defined, we ensure it’s made safe (with this.encode) and finally output that (with this.raw).

type JwOptions = {
  edit4image?: (token: string) => string
  edit4link?: (token: string) => string
  edit4mark?: (token: string) => string
  baseDir?: string
  edit?: (token: string) => string
}

export function jwObsidianHtml(options: JwOptions = {}): HtmlExtension {
  if (options.edit4image === undefined) options.edit4image = (token) => ['assets', token].join('/')
  if (options.edit4link === undefined) options.edit4link = (token) => [token, '.md'].join('')
  if (options.edit4mark === undefined) options.edit4mark = (token) => token
  if (options.edit === undefined) options.edit = (token) => token
  if (options.baseDir === undefined) options.baseDir = ''

  /**
   * @this {CompileContext}
   * @returns {undefined}
   */
  function enterVariableString() {
    // this.buffer();
  }

  const exitVariableImageString: Handle = function (this: CompileContext, token: Token) {
    // this.resume();
    let token_str = this.sliceSerialize(token)
    if (options.edit4image !== undefined) {
      token_str = options.edit4image(token_str)
    }
    token_str = [options.baseDir, token_str]
      .filter((item) => item !== '')
      .join('/')
    token_str = slashcheck(token_str)
    if (options.edit !== undefined) {
      token_str = options.edit(token_str)
    }
    // console.log(token)
    this.tag('<img src="' + token_str + '" alt="' + token_str + '">');
    this.tag('</img>');
  }

  const exitVariableLinkString: Handle = function (this: CompileContext, token: Token) {
    // this.resume();
    let token_str = this.sliceSerialize(token)
    if (options.edit4link !== undefined) {
      token_str = options.edit4link(token_str)
    }
    token_str = [options.baseDir, token_str]
      .filter((item) => item !== '')
      .join('/')
      token_str = slashcheck(token_str)
    if (options.edit !== undefined) {
      token_str = options.edit(token_str)
    }
    this.tag('<a href="' + this.encode(token_str) + '">');
    this.raw(this.sliceSerialize(token));
    this.tag('</a>');
  }

  const exitVariableHighlightString: Handle = function (this: CompileContext, token: Token) {
    // this.resume();
    let token_str = this.sliceSerialize(token).slice(0, -2)
    if (options.edit4mark !== undefined) {
      token_str = options.edit4mark(token_str)
    }
    this.tag('<mark>');
    this.raw(token_str);
    this.tag('</mark>');
  }

  return {
    enter: {
      jwObsidianImageString: enterVariableString,
      jwObsidianLinkString: enterVariableString,
      jwObsidianHighlightString: enterVariableString,
    },
    exit: {
      jwObsidianImageString: exitVariableImageString,
      jwObsidianLinkString: exitVariableLinkString,
      jwObsidianHighlightString: exitVariableHighlightString,
    }
  } as HtmlExtension;
}


function slashcheck(str: string) {
  if(!str.startsWith('/')){
    return '/' + str
  }
  return str
}