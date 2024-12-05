import { codes } from 'micromark-util-symbol'
import type {
    Construct,
    TokenizeContext,
    State,
    Code,
    Effects
} from 'micromark-util-types'
import { token } from './utils.js'

export const highlightConstruct = {
    name: 'jwObsidianHighlight',
    tokenize: jwObsidianHighlightTokenize,
    partial: true
} as Construct

function markdownLineEnding(code: Code | null) {
    return code === null || code < codes.horizontalTab
}

export function jwObsidianHighlightTokenize(
    effects: Effects,
    ok: State,
    nok: State
) {
    var equalties = 0
    var cursor = 0

    const start: State = (code) => {
        effects.enter(token.jw)
        effects.enter(token.jwHighlightMarker)
        return LSB
    }

    const LSB: State = (code) => {
        if (code === codes.equalsTo) {
            equalties++
            effects.consume(code)
        } else return nok(code)
        if (equalties == 2) {
            effects.exit(token.jwHighlightMarker)
            effects.enter(token.jwHighlightString)
            // effects.enter('chunkString', {contentType: 'string'});
            return inside
        } else return LSB
    }

    const insideEscape: State = (code) => {
        if (code === codes.backslash) {
            effects.consume(code)
            return inside
        }
        return inside(code)
    }

    const inside: State = (code) => {
        if (markdownLineEnding(code)) {
            return nok(code)
        }
        if (code === codes.backslash) {
            effects.consume(code)
            return insideEscape
        }
        if (code === codes.equalsTo) {
            return RSB
        }
        effects.consume(code)
        return inside
    }

    const RSB: State = (code) => {
        if (code === codes.equalsTo) {
            cursor++
            effects.consume(code)
        } else if (code !== codes.equalsTo && cursor != 0) {
            cursor = 0
            return inside
        } else {
            return nok(code)
        }

        if (equalties == cursor) {
            effects.exit(token.jwHighlightString)
            effects.exit(token.jw)
            return ok(code)
        } else {
            return RSB
        }
    }

    return start
}
