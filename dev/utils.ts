import { codes } from 'micromark-util-symbol'
import { Code, TokenTypeMap } from 'micromark-util-types'

type jwImage = Pick<TokenTypeMap, 'jwImageMarker' | 'jwImageString'>
type jwLink = Pick<TokenTypeMap, 'jwLinkMarker' | 'jwLinkString'>
type jwHighlight = Pick<TokenTypeMap, 'jwHighlightMarker' | 'jwHighlightString'>
type jwToken = Pick<TokenTypeMap, 'jw'> & jwImage & jwLink & jwHighlight

export const token: jwToken = {
    jw: 'jw',
    jwImageMarker: 'jwImageMarker',
    jwImageString: 'jwImageString',
    jwLinkMarker: 'jwLinkMarker',
    jwLinkString: 'jwLinkString',
    jwHighlightMarker: 'jwHighlightMarker',
    jwHighlightString: 'jwHighlightString'
}

export function markdownLineEnding(code: Code | null) {
    return code === null || code < codes.horizontalTab
}