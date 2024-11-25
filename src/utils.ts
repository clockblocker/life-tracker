export const extractBacklinks = (content: string): string[] => {
    const links = content.split('[[')
        .map(part => part
            .replace(/\\/g, '')
            .split('|')[0]
            .split(']]')[0]
        );
    links.shift();
    return links;
};
