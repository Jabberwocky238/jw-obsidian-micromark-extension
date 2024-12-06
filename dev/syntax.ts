import type { ConstructRecord, Extension } from 'micromark-util-types'

import { codes } from 'micromark-util-symbol'
import { imageConstruct } from './declare_image.js'
import { linkConstruct } from './declare_link.js'
import { highlightConstruct } from './declare_mark.js'
import { triplecolonConstruct } from './declare_triplecolon.js'

const text: ConstructRecord = {
    [codes.exclamationMark]: imageConstruct,
    [codes.leftSquareBracket]: linkConstruct,
    [codes.equalsTo]: highlightConstruct,
    [codes.colon]: triplecolonConstruct,
}

export function jwObsidian(): Extension {
    return { text }
}
