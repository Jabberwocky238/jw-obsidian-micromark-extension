import {micromark} from 'micromark'
import fs from 'fs'

import {jwObsidian, jwObsidianHtml} from 'jw-micromark-toolbox'

const COMMON = fs.readFileSync('debugf.md', 'utf8')
const rees = micromark(COMMON, {
    extensions: [jwObsidian()],
    htmlExtensions: [jwObsidianHtml({
        linkprefix: 'assets'
    })]
})

console.log(rees)