import { SPACE, WIKI_OPEN, WIKI_CLOSE, PIPE } from '../../../constants/format';

export function cleanMarkdownFormatting(selection: string): string {
	return selection
		.trim()
		.replaceAll('[[', '')
		.replaceAll(']]', '')
		.replaceAll('`', '')
		.replaceAll('=', '')
		.replaceAll('*', '');
}

export function wrapWithSpaces(line: string): string {
	return `${SPACE}${line}${SPACE}`;
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
