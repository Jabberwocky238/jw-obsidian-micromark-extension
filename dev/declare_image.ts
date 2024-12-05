
/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').TokenTypeMap} TokenTypeMap
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Construct} Construct
 */

import { codes } from 'micromark-util-symbol';
import { asciiAlphanumeric } from 'micromark-util-character';

/** @type {Construct} */
export const imageConstruct = {
    name: 'jwObsidianImage',
    tokenize: jwObsidianImageTokenize,
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
export function jwObsidianImageTokenize(effects, ok, nok) {
    let bracket_cnt = 0;
    return start;

    /** @type {State} */
    function start(code) {
        effects.enter('jwObsidian');
        effects.enter('jwObsidianImageMarker');
        if (code === codes.exclamationMark) {
            effects.consume(code);
            return LSB;
        } else {
            return nok(code);
        }
    }

    /** @type {State} */
    function LSB(code) {
        if (code === codes.leftSquareBracket) {
            bracket_cnt++;
            effects.consume(code);
        } else {
            return nok(code);
        }
        if (bracket_cnt == 2) {
            effects.exit('jwObsidianImageMarker');
            effects.enter('jwObsidianImageString');
            // effects.enter('chunkString', {contentType: 'string'});
            return inside;
        } else return LSB;
    }

    /** @type {State} */
    function inside(code) {
        if (markdownLineEnding(code)
        || code === codes.leftSquareBracket /**左中括号*/) {
            return nok(code);
        }
        if (code === codes.backslash) {
            effects.consume(code);
            return insideEscape;
        }

        /** @type {State} */
        function insideEscape(code) {
            if (code === codes.backslash 
            || code === codes.rightCurlyBrace/**右大括号*/) {
                effects.consume(code);
                return inside;
            }
            return inside(code);
        }
        if (code === codes.rightSquareBracket /**右中括号*/) {
            // effects.exit('chunkString');
            effects.exit('jwObsidianImageString');
            effects.enter('jwObsidianImageMarker');
            return RSB;
        }

        if(asciiAlphanumeric(code)
        || code === codes.space
        || code === codes.dot){
            effects.consume(code);
            return inside;
        }else{
            return nok(code);
        }
    }

    /** @type {State} */
    function RSB(code) {
        if (code === codes.rightSquareBracket) {
            bracket_cnt--;
            effects.consume(code);
        } else return nok(code);

        if (bracket_cnt == 0) {
            effects.exit('jwObsidianImageMarker');
            effects.exit('jwObsidian');
            return ok(code);
        } else return RSB;
    }
}

