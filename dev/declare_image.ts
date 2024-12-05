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
import {asciiAlphanumeric} from 'micromark-util-character'

export const imageConstruct: Construct = {
    name: 'jwObsidianImage',
    tokenize: jwObsidianImageTokenize,
    partial: true
}

function markdownLineEnding(code: Code | null) {
    return code === null || code < codes.horizontalTab
}

export function jwObsidianImageTokenize(
    effects: Effects,
    ok: State,
    nok: State
) {
    let bracket_cnt = 0

    const start: State = (code) => {
        effects.enter('jwObsidian')
        effects.enter('jwObsidianImageMarker')
        if (code === codes.exclamationMark) {
            effects.consume(code)
            return LSB
        } else {
            return nok(code)
        }
    }

    /** @type {State} */
    const LSB: State = (code) => {
        if (code === codes.leftSquareBracket) {
            bracket_cnt++
            effects.consume(code)
        } else {
            return nok(code)
        }
        if (bracket_cnt == 2) {
            effects.exit('jwObsidianImageMarker')
            effects.enter('jwObsidianImageString')
            // effects.enter('chunkString', {contentType: 'string'});
            return inside
        } else return LSB
    }

    /** @type {State} */
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
    /** @type {State} */
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

        if (code === codes.rightSquareBracket /**右中括号*/) {
            // effects.exit('chunkString');
            effects.exit('jwObsidianImageString')
            effects.enter('jwObsidianImageMarker')
            return RSB
        }

        if (
            asciiAlphanumeric(code) ||
            code === codes.space ||
            code === codes.dot
        ) {
            effects.consume(code)
            return inside
        } else {
            return nok(code)
        }
    }

    /** @type {State} */
    const RSB: State = (code) => {
        if (code === codes.rightSquareBracket) {
            bracket_cnt--
            effects.consume(code)
        } else return nok(code)

        if (bracket_cnt == 0) {
            effects.exit('jwObsidianImageMarker')
            effects.exit('jwObsidian')
            return ok(code)
        } else return RSB
    }

    return start
}
