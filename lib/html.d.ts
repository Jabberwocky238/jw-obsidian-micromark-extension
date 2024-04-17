/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 */
/**
 * @typedef {Record<string, Handle>} HtmlOptions
 * @typedef {{baseDir: string}} jwOptions
 * @param {HtmlOptions | jwOptions | null | undefined} [options={}]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options?: HtmlOptions | jwOptions | null | undefined): HtmlExtension;
export type CompileContext = import('micromark-util-types').CompileContext;
export type Handle = import('micromark-util-types').Handle;
export type HtmlExtension = import('micromark-util-types').HtmlExtension;
export type Token = import('micromark-util-types').Token;
export type HtmlOptions = Record<string, Handle>;
export type jwOptions = {
    baseDir: string;
};
