import {
	SPACE,
	WIKI_OPEN,
	WIKI_CLOSE,
	PIPE,
	ZERO_SPACE,
} from '../../../constants/format';
import { NAV_BUTTONS_LINE } from './buttons';

const blockSpliter = `\n---\n\n`.trim();

export function cleanMarkdownFormatting(selection: string): string {
	return selection
		.trim()
		.replaceAll('[[', '')
		.replaceAll(']]', '')
		.replaceAll('`', '')
		.replaceAll('=', '')
		.replaceAll('*', '');
}

export function addSpaceToRight(line: string): string {
	return `${line}${ZERO_SPACE}`;
}

export function addSpaceToLeft(line: string): string {
	return `${ZERO_SPACE}${line}`;
}

export function wrapWithSpaces(line: string): string {
	return addSpaceToRight(addSpaceToLeft(line));
}

export const makeWikilinkMD = ({
	source,
	repr = undefined,
}: {
	source: string;
	repr?: string;
}) => {
	if (!repr) {
		return `${WIKI_OPEN}${source}${WIKI_CLOSE}`;
	}
	return `${WIKI_OPEN}${source}${PIPE}${repr}${WIKI_CLOSE}`;
};

export const getMenuItemRepr = ({
	label,
	emoji,
}: {
	label: string;
	emoji?: string;
}) => {
	const emojiPart = emoji ? `${emoji}${SPACE}` : '';
	return emojiPart + label;
};

export const formatMenuItemsMarkdown = (menuItems: string[]) => {
	return menuItems.map((item) => wrapWithSpaces(item)).join('\n');
};

export const wrapInBlock = (s: string) => s.trim() + blockSpliter;

export const WORKING_BUTTONS_BLOCK = `​\`BUTTON[go-back]\`  \`BUTTON[go-to-today]\`  \`BUTTON[go-to-global-root]\`  |  \`BUTTON[create-new-file-in-this-dir]\`  \`BUTTON[create-new-folder-in-this-dir]\`​ 

---

`;

export const BUTTONS_BLOCK = WORKING_BUTTONS_BLOCK;
