/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {Record<string, Handle>} HtmlOptions
 */
/**
 * @typedef JwOptions
 * @property {string} [imagePrefix]
 * @property {string} [linkSuffix]
 * @property {string} [baseDir]
 * @property {(token: string) => string} [replacement]
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
    imagePrefix?: string;
    linkSuffix?: string;
    baseDir?: string;
    replacement?: (token: string) => string;
};
