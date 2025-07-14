export function cleanMarkdownFormatting(selection: string): string {
	return selection
		.trim()
		.replaceAll('[[', '')
		.replaceAll(']]', '')
		.replaceAll('`', '')
		.replaceAll('=', '')
		.replaceAll('*', '');
}

export const NAV_BUTTONS_MD = ` \`BUTTON[go-back]\`  \`BUTTON[go-to-today]\`  \`BUTTON[go-to-global-root]\`  |  \`BUTTON[create-new-file-in-this-dir]\`  \`BUTTON[create-new-folder-in-this-dir]\` `;
