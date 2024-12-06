import {
    Construct,
    TokenizeContext,
    State,
    Previous,
    Extension,
    Effects,
    Event,
    ConstructRecord,
    Code
} from 'micromark-util-types'
import {codes} from 'micromark-util-symbol'
import { token} from './utils.js'
import { markdownLineEnding } from 'micromark-util-character'
export const linkConstruct: Construct = {
    name: 'jwObsidianLink',
    tokenize: jwObsidianLinkTokenize,
}

export function jwObsidianLinkTokenize(
    effects: Effects,
    ok: State,
    nok: State
) {
    var bracket_cnt = 0

    const start: State = (code) => {
        effects.enter(token.jw)
        effects.enter(token.jwLinkMarker)
        return LSB
    }

    const LSB: State = (code) => {
        if (code === codes.leftSquareBracket) {
            bracket_cnt++
            effects.consume(code)
        } else return nok(code)
        if (bracket_cnt == 2) {
            effects.exit(token.jwLinkMarker)
            effects.enter(token.jwLinkString)
            // effects.enter('chunkString', {contentType: 'string'});
            return inside
        } else return LSB
    }

    const insideEscape: State = (code) => {
        if (
            code === codes.backslash ||
            code === codes.rightCurlyBrace /**右大括号*/
        ) {
            effects.consume(code)
            return inside
        }
        return inside(code)
    }
    const inside: State = (code) => {
        if (
            markdownLineEnding(code) ||
            code === codes.leftSquareBracket /**左中括号*/
        ) {
            return nok(code)
        }
        if (code === codes.backslash) {
            effects.consume(code)
            return insideEscape
        }
        if (code === codes.rightSquareBracket) {
            // effects.exit('chunkString');
            effects.exit(token.jwLinkString)
            effects.enter(token.jwLinkMarker)
            return RSB
        }
        if (!markdownLineEnding(code)) {
            effects.consume(code)
            return inside
        } else {
            return nok(code)
        }
    }
    const RSB: State = (code) => {
        if (code === codes.rightSquareBracket) {
            bracket_cnt--
            effects.consume(code)
        } else return nok(code)

        if (bracket_cnt == 0) {
            effects.exit(token.jwLinkMarker)
            effects.exit(token.jw)
            return ok(code)
        } else return RSB
    }

    return start
}
