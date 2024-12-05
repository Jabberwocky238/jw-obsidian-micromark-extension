import type { HtmlExtension } from 'micromark-util-types';
type JwOptions = {
    edit4image?: (token: string) => string;
    edit4link?: (token: string) => string;
    edit4mark?: (token: string) => string;
    baseDir?: string;
    edit?: (token: string) => string;
};
export declare function jwObsidianHtml(options?: JwOptions): HtmlExtension;
export {};
