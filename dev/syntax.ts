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

import type { ConstructRecord, Extension } from 'micromark-util-types';

import { codes } from 'micromark-util-symbol';
import { imageConstruct } from '../lib/declare_image.js';
import { linkConstruct } from '../lib/declare_link.js';
import { highlightConstruct } from '../lib/declare_mark.ts';

const text: ConstructRecord = {};
text[codes.exclamationMark] = imageConstruct;
text[codes.leftSquareBracket] = linkConstruct
text[codes.equalsTo] = highlightConstruct;

export function jwObsidian(): Extension {
  return {text};
}

