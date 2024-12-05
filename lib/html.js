export function jwObsidianHtml(options = {}) {
    if (options.edit4image === undefined)
        options.edit4image = (token) => ['assets', token].join('/');
    if (options.edit4link === undefined)
        options.edit4link = (token) => [token, '.md'].join('');
    if (options.edit4mark === undefined)
        options.edit4mark = (token) => token;
    if (options.edit === undefined)
        options.edit = (token) => token;
    if (options.baseDir === undefined)
        options.baseDir = '';
    /**
     * @this {CompileContext}
     * @returns {undefined}
     */
    function enterVariableString() {
        // this.buffer();
    }
    const exitVariableImageString = function (token) {
        // this.resume();
        let token_str = this.sliceSerialize(token);
        if (options.edit4image !== undefined) {
            token_str = options.edit4image(token_str);
        }
        token_str = [options.baseDir, token_str]
            .filter((item) => item !== '')
            .join('/');
        token_str = slashcheck(token_str);
        if (options.edit !== undefined) {
            token_str = options.edit(token_str);
        }
        // console.log(token)
        this.tag('<img src="' + token_str + '" alt="' + token_str + '">');
        this.tag('</img>');
    };
    const exitVariableLinkString = function (token) {
        // this.resume();
        let token_str = this.sliceSerialize(token);
        if (options.edit4link !== undefined) {
            token_str = options.edit4link(token_str);
        }
        token_str = [options.baseDir, token_str]
            .filter((item) => item !== '')
            .join('/');
        token_str = slashcheck(token_str);
        if (options.edit !== undefined) {
            token_str = options.edit(token_str);
        }
        this.tag('<a href="' + this.encode(token_str) + '">');
        this.raw(this.sliceSerialize(token));
        this.tag('</a>');
    };
    const exitVariableHighlightString = function (token) {
        // this.resume();
        let token_str = this.sliceSerialize(token).slice(0, -2);
        if (options.edit4mark !== undefined) {
            token_str = options.edit4mark(token_str);
        }
        this.tag('<mark>');
        this.raw(token_str);
        this.tag('</mark>');
    };
    return {
        enter: {
            jwObsidianImageString: enterVariableString,
            jwObsidianLinkString: enterVariableString,
            jwObsidianHighlightString: enterVariableString,
        },
        exit: {
            jwObsidianImageString: exitVariableImageString,
            jwObsidianLinkString: exitVariableLinkString,
            jwObsidianHighlightString: exitVariableHighlightString,
        }
    };
}
function slashcheck(str) {
    if (!str.startsWith('/')) {
        return '/' + str;
    }
    return str;
}
