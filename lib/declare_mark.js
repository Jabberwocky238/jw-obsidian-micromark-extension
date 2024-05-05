
/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Construct} Construct
 */
import { codes } from 'micromark-util-symbol';


/** @type {Construct} */
export const highlightConstruct = {
    name: 'jwObsidianHighlight',
    tokenize: jwObsidianHighlightTokenize,
    partial: true
};

/**
 * @param {Code | null} code
 */
function markdownLineEnding(code) {
    return code === null || code < codes.horizontalTab 
}

/**
 * @param {Effects} effects
 * @param {State} ok
 * @param {State} nok
 */
export function jwObsidianHighlightTokenize(effects, ok, nok) {
    var equalties = 0;
    var cursor = 0;
    return start;

    /** @type {State} */
    function start(code) {
        effects.enter('jwObsidian');
        effects.enter('jwObsidianHighlightMarker');
        return LSB;
    }

    /** @type {State} */
    function LSB(code) {
        if (code === codes.equalsTo) {
            equalties++;
            effects.consume(code);
        } else return nok(code);
        if (equalties == 2) {
            effects.exit('jwObsidianHighlightMarker');
            effects.enter('jwObsidianHighlightString');
            // effects.enter('chunkString', {contentType: 'string'});
            return inside;
        } else return LSB;
    }

    /** @type {State} */
    function inside(code) {
        if (markdownLineEnding(code)) {
            return nok(code);
        }
        if (code === codes.backslash) {
            effects.consume(code);
            return insideEscape;
        }

        /** @type {State} */
        function insideEscape(code) {
            if (code === codes.backslash) {
                effects.consume(code);
                return inside;
            }
            return inside(code);
        }

        if (code === codes.equalsTo) {
            return RSB;
        }

        effects.consume(code);
        return inside;
    }

    /** @type {State} */
    function RSB(code) {
        if (code === codes.equalsTo) {
            cursor++;
            effects.consume(code);
        } else if (code !== codes.equalsTo && cursor != 0){
            cursor = 0;
            return inside;
        } else {
            return nok(code);
        }

        if (equalties == cursor) {
            effects.exit('jwObsidianHighlightString');
            effects.exit('jwObsidian');
            return ok(code);
        } else {
            return RSB;
        }
    }
}

