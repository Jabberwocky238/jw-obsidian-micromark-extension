/**
 * @typedef {import('micromark-util-types').CompileContext} CompileContext
 * @typedef {import('micromark-util-types').Handle} Handle
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {Record<string, Handle>} HtmlOptions
 */
/**
 * @typedef JwOptions
 * @property {string} [baseDir='']
 * @property {(token: string) => void | undefined} [extract]
 * @property {Map<string, string[]> | undefined} [reflexMap]
 */
/**
 * @param {JwOptions | null | undefined} [options]
 * @returns {HtmlExtension}
 */
export function jwObsidianHtml(options?: JwOptions | null | undefined): HtmlExtension;
export type CompileContext = import('micromark-util-types').CompileContext;
export type Handle = import('micromark-util-types').Handle;
export type HtmlExtension = import('micromark-util-types').HtmlExtension;
export type Token = import('micromark-util-types').Token;
export type HtmlOptions = Record<string, Handle>;
export type JwOptions = {
    baseDir?: string;
    extract?: (token: string) => void | undefined;
    reflexMap?: Map<string, string[]> | undefined;
};
