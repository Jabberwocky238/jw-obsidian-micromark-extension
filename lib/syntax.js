/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 */

import { codes } from 'micromark-util-symbol';
import { imageConstruct } from './declare_asset.js';
import { linkConstruct } from './declare_link.js';

/** @type {ConstructRecord} */
const text = {};
text[codes.exclamationMark] = imageConstruct;
text[codes.leftSquareBracket] = linkConstruct

/**
 * Create an extension for `micromark`
 *
 * @returns {Extension}
 */
export function jwObsidian() {
  return {text};
}

