import { codes } from 'micromark-util-symbol';
export const highlightConstruct = {
    name: 'jwObsidianHighlight',
    tokenize: jwObsidianHighlightTokenize,
    partial: true
};
function markdownLineEnding(code) {
    return code === null || code < codes.horizontalTab;
}
export function jwObsidianHighlightTokenize(effects, ok, nok) {
    var equalties = 0;
    var cursor = 0;
    const start = (code) => {
        effects.enter('jwObsidian');
        effects.enter('jwObsidianHighlightMarker');
        return LSB;
    };
    const LSB = (code) => {
        if (code === codes.equalsTo) {
            equalties++;
            effects.consume(code);
        }
        else
            return nok(code);
        if (equalties == 2) {
            effects.exit('jwObsidianHighlightMarker');
            effects.enter('jwObsidianHighlightString');
            // effects.enter('chunkString', {contentType: 'string'});
            return inside;
        }
        else
            return LSB;
    };
    const insideEscape = (code) => {
        if (code === codes.backslash) {
            effects.consume(code);
            return inside;
        }
        return inside(code);
    };
    const inside = (code) => {
        if (markdownLineEnding(code)) {
            return nok(code);
        }
        if (code === codes.backslash) {
            effects.consume(code);
            return insideEscape;
        }
        if (code === codes.equalsTo) {
            return RSB;
        }
        effects.consume(code);
        return inside;
    };
    const RSB = (code) => {
        if (code === codes.equalsTo) {
            cursor++;
            effects.consume(code);
        }
        else if (code !== codes.equalsTo && cursor != 0) {
            cursor = 0;
            return inside;
        }
        else {
            return nok(code);
        }
        if (equalties == cursor) {
            effects.exit('jwObsidianHighlightString');
            effects.exit('jwObsidian');
            return ok(code);
        }
        else {
            return RSB;
        }
    };
    return start;
}
