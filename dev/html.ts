import type {
    CompileContext,
    Handle,
    HtmlExtension,
    Token
} from 'micromark-util-types'
import {token} from './utils.js'
// variablesHtml is a function that
// receives an object mapping “variables” to strings and returns an HTML extension.

// The extension hooks two functions to variableString,
// one when it starts, the other when it ends.
// We don’t need to do anything to handle the other tokens as they’re already ignored by default.
// enterVariableString calls buffer, which is a function that “stashes” what would otherwise be emitted.
// exitVariableString calls resume, which is the inverse of buffer and returns the stashed value.
// If the variable is defined, we ensure it’s made safe (with this.encode) and finally output that (with this.raw).

type JwOptions = {
    edit?: (token: string) => string
}

export function jwObsidianHtml(options: JwOptions = {}): HtmlExtension {
    if (options.edit === undefined) options.edit = (token) => token

    const enterVariableString: Handle = function (
        this: CompileContext,
        token: Token
    ) {
        // this.buffer();
    }

    const exitVariableImageString: Handle = function (
        this: CompileContext,
        token: Token
    ) {
        // this.resume();
        let token_str = this.sliceSerialize(token)
        token_str = slashcheck(token_str)
        if (options.edit !== undefined) {
            token_str = options.edit(token_str)
        }
        // console.log(token)
        this.tag('<img src="' + token_str + '" alt="' + token_str + '">')
        this.tag('</img>')
    }

    const exitVariableLinkString: Handle = function (
        this: CompileContext,
        token: Token
    ) {
        // this.resume();
        let token_str = this.sliceSerialize(token)
        token_str = slashcheck(token_str) + '.md'
        if (options.edit !== undefined) {
            token_str = options.edit(token_str)
        }
        this.tag('<a href="' + this.encode(token_str) + '">')
        this.raw(this.sliceSerialize(token))
        this.tag('</a>')
    }

    const exitVariableHighlightString: Handle = function (
        this: CompileContext,
        token: Token
    ) {
        // this.resume();
        let token_str = this.sliceSerialize(token).slice(0, -2)
        this.tag('<mark>')
        this.raw(token_str)
        this.tag('</mark>')
    }

    return {
        enter: {
            [token.jwImageString]: enterVariableString,
            [token.jwLinkString]: enterVariableString,
            [token.jwHighlightString]: enterVariableString
        },
        exit: {
            [token.jwImageString]: exitVariableImageString,
            [token.jwLinkString]: exitVariableLinkString,
            [token.jwHighlightString]: exitVariableHighlightString
        }
    } as HtmlExtension
}

function slashcheck(str: string) {
    if (!str.startsWith('/')) {
        return '/' + str
    }
    return str
}
