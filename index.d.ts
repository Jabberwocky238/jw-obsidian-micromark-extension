export {jwObsidian} from './lib/syntax.js'
export {jwObsidianHtml} from './lib/html.js'

declare module 'micromark-util-types' {
  // interface Token {
  //   _gfmAutolinkLiteralWalkedInto?: boolean
  // }

  interface TokenTypeMap {
    jwObsidianImage: 'jwObsidianImage'
    jwObsidianImageMarker: 'jwObsidianImageMarker'
    jwObsidianImageString: 'jwObsidianImageString'
  }
}
