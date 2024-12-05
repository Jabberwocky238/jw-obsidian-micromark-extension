export {jwObsidian} from './syntax.js'
export {jwObsidianHtml} from './html.js'

declare module 'micromark-util-types' {
    interface TokenTypeMap {
        jwObsidian: 'jwObsidian'
        jwObsidianImageMarker: 'jwObsidianImageMarker'
        jwObsidianImageString: 'jwObsidianImageString'
        jwObsidianLinkMarker: 'jwObsidianLinkMarker'
        jwObsidianLinkString: 'jwObsidianLinkString'
        jwObsidianHighlightMarker: 'jwObsidianHighlightMarker'
        jwObsidianHighlightString: 'jwObsidianHighlightString'
    }
}
