export { jwObsidian } from './syntax.js'
export { jwObsidianHtml } from './html.js'

declare module 'micromark-util-types' {
    export interface TokenTypeMap {
        jw: 'jw'
        jwImageMarker: 'jwImageMarker'
        jwImageString: 'jwImageString'
        jwLinkMarker: 'jwLinkMarker'
        jwLinkString: 'jwLinkString'
        jwHighlightMarker: 'jwHighlightMarker'
        jwHighlightString: 'jwHighlightString'
    }
}
