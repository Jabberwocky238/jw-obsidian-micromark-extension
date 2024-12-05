import { codes } from 'micromark-util-symbol';
export const linkConstruct = {
    name: 'jwObsidianLink',
    tokenize: jwObsidianLinkTokenize,
    partial: true
};
function markdownLineEnding(code) {
    return code === null || code < codes.horizontalTab;
}
export function jwObsidianLinkTokenize(effects, ok, nok) {
    var bracket_cnt = 0;
    const start = (code) => {
        effects.enter('jwObsidian');
        effects.enter('jwObsidianLinkMarker');
        return LSB;
    };
    const LSB = (code) => {
        if (code === codes.leftSquareBracket) {
            bracket_cnt++;
            effects.consume(code);
        }
        else
            return nok(code);
        if (bracket_cnt == 2) {
            effects.exit('jwObsidianLinkMarker');
            effects.enter('jwObsidianLinkString');
            // effects.enter('chunkString', {contentType: 'string'});
            return inside;
        }
        else
            return LSB;
    };
    const insideEscape = (code) => {
        if (code === codes.backslash
            || code === codes.rightCurlyBrace /**右大括号*/) {
            effects.consume(code);
            return inside;
        }
        return inside(code);
    };
    const inside = (code) => {
        if (markdownLineEnding(code)
            || code === codes.leftSquareBracket /**左中括号*/) {
            return nok(code);
        }
        if (code === codes.backslash) {
            effects.consume(code);
            return insideEscape;
        }
        if (code === codes.rightSquareBracket) {
            // effects.exit('chunkString');
            effects.exit('jwObsidianLinkString');
            effects.enter('jwObsidianLinkMarker');
            return RSB;
        }
        if (!markdownLineEnding(code)) {
            effects.consume(code);
            return inside;
        }
        else {
            return nok(code);
        }
    };
    const RSB = (code) => {
        if (code === codes.rightSquareBracket) {
            bracket_cnt--;
            effects.consume(code);
        }
        else
            return nok(code);
        if (bracket_cnt == 0) {
            effects.exit('jwObsidianLinkMarker');
            effects.exit('jwObsidian');
            return ok(code);
        }
        else
            return RSB;
    };
    return start;
}
