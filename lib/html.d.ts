/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {Record<string, Handle>} HtmlOptions
 */
/**
 * @typedef JwOptions
 * @property {(token: string) => string} [edit4image]
 * @property {(token: string) => string} [edit4link]
 * @property {(token: string) => string} [edit4mark]
 * @property {string} [baseDir]
 * @property {(token: string) => string} [edit]
 */
/**
 * @param {JwOptions} [options]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options?: JwOptions | undefined): HtmlExtension;
export type CompileContext = import('micromark-util-types').CompileContext;
export type Handle = import('micromark-util-types').Handle;
export type HtmlExtension = import('micromark-util-types').HtmlExtension;
export type Token = import('micromark-util-types').Token;
export type HtmlOptions = Record<string, Handle>;
export type JwOptions = {
    edit4image?: (token: string) => string;
    edit4link?: (token: string) => string;
    edit4mark?: (token: string) => string;
    baseDir?: string;
    edit?: (token: string) => string;
};
