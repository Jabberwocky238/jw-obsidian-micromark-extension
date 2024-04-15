import { codes } from 'micromark-util-symbol';
import { micromark } from 'micromark';
import {
    asciiAlpha,
    asciiAlphanumeric,
    asciiControl,
    markdownLineEndingOrSpace,
    unicodePunctuation,
    unicodeWhitespace
} from 'micromark-util-character'

const variableConstruct = { name: 'variable', tokenize: variableTokenize }
const imageConstruct = { name: 'zqimage', tokenize: imageTokenize }
const variables = { text: { [codes.leftCurlyBrace]: variableConstruct, [codes.exclamationMark]: imageConstruct } }

// In prose, what we have to code looks like this:
function variableTokenize(effects, ok, nok) {
    return start

    // start: 
    // Receive 123 as code, 
    // enter a token for the whole (let’s call it variable), 
    // enter a token for the marker (variableMarker), 
    // consume code, 
    // exit the marker token, 
    // enter a token for the contents (variableString), 
    // switch to begin
    function start(code) {
        effects.enter('variable')
        effects.enter('variableMarker')
        effects.consume(code)
        effects.exit('variableMarker')
        effects.enter('variableString')
        effects.enter('chunkString', { contentType: 'string' })
        return begin
    }

    // begin: 
    // If code is 125, reconsume in nok. 
    // Else, reconsume in inside
    function begin(code) {
        return code === codes.rightCurlyBrace ? nok(code) : inside(code)
    }

    // inside: 
    // If code is -5, -4, -3, or null, reconsume in nok. 
    // Else, 
    // if code is 125, 
    // exit the string token, 
    // enter a variableMarker, 
    // consume code, 
    // exit the marker token, 
    // exit the variable token, 
    // and switch to ok. 
    // Else, 
    // consume, 
    // and remain in inside.
    function inside(code) {
        if (code === codes.carriageReturn ||
            code === codes.lineFeed ||
            code === codes.carriageReturnLineFeed ||
            code === null) {
            return nok(code)
        }

        if (code === codes.backslash) {
            effects.consume(code)
            return insideEscape
        }

        function insideEscape(code) {
            if (code === codes.backslash || code === codes.rightCurlyBrace) {
                effects.consume(code)
                return inside
            }
            return inside(code)
        }

        if (code === codes.rightCurlyBrace) {
            effects.exit('chunkString')
            effects.exit('variableString')
            effects.enter('variableMarker')
            effects.consume(code)
            effects.exit('variableMarker')
            effects.exit('variable')
            return ok
        }

        effects.consume(code)
        return inside
    }
}

function imageTokenize(effects, ok, nok) {
    let bracket_cnt = 0
    let temp = ""
    return start

    function start(code) {
        effects.enter('zqimage')
        effects.enter('variableMarker')
        effects.consume(code)
        temp += String.fromCodePoint(code)
        console.log(temp)
        return LSB
    }

    function LSB(code) {
        if (code === codes.leftSquareBracket) {
            bracket_cnt++
            effects.consume(code)
            temp += String.fromCodePoint(code)
            console.log(temp)
        }
        else return nok(code)

        if (bracket_cnt == 2) {
            effects.exit('variableMarker')
            effects.enter('zqimageString')
            effects.enter('chunkString', { contentType: 'string' })
            return inside
        }
        else return LSB
    }

    function inside(code) {
        if (code === codes.carriageReturn ||
            code === codes.lineFeed ||
            code === codes.carriageReturnLineFeed ||
            code === null) {
            return nok(code)
        }

        if (code === codes.backslash) {
            effects.consume(code)
            return insideEscape
        }

        function insideEscape(code) {
            if (code === codes.backslash || code === codes.rightCurlyBrace) {
                effects.consume(code)
                return inside
            }
            return inside(code)
        }

        if (code === codes.rightSquareBracket) {
            effects.exit('chunkString')
            effects.exit('zqimageString')
            effects.enter('variableMarker')
            return RSB
        }

        effects.consume(code)
        temp += String.fromCodePoint(code)
        console.log(temp)
        return inside
    }

    function RSB(code) {
        if (code === codes.rightSquareBracket) {
            bracket_cnt--
            effects.consume(code)
            temp += String.fromCodePoint(code)
            console.log(temp)
        }
        else return nok(code)

        if (bracket_cnt == 0) {
            effects.exit('variableMarker')
            effects.exit('zqimage')
            return ok(code)
        }
        else return RSB
    }
}
// variablesHtml is a function that 
// receives an object mapping “variables” to strings and returns an HTML extension. 

// The extension hooks two functions to variableString, 
// one when it starts, the other when it ends. 
// We don’t need to do anything to handle the other tokens as they’re already ignored by default. 
// enterVariableString calls buffer, which is a function that “stashes” what would otherwise be emitted. 
// exitVariableString calls resume, which is the inverse of buffer and returns the stashed value. 
// If the variable is defined, we ensure it’s made safe (with this.encode) and finally output that (with this.raw).

function variablesHtml(data = {}) {
    return {
        enter: { variableString: enterVariableString, zqimageString: enterVariableString },
        exit: { variableString: exitVariableString, zqimageString: exitVariableString },
    }

    function enterVariableString() {
        this.buffer()
    }

    function exitVariableString() {
        var id = this.resume()
        
        if (id in data) {
            this.raw(this.encode(data[id]))
        } else {
            console.log("exitVariableString:", id,)
            this.tag('<img src="' + id + '">')
            this.raw(this.encode(id))
            this.tag('</img>')
        }
    }
}

let html = variablesHtml({ planet: '1', 'pla}net': '2' })
let buf = "Hello, {planet}!"
let out = micromark(buf, { extensions: [variables], htmlExtensions: [html] })
console.log(out)

html = variablesHtml({})
buf = "adfgdags![[Pasted image 20240411144818.png]]sadgasdfs"
out = micromark(buf, { extensions: [variables], htmlExtensions: [html] })
console.log(out)

