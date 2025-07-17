import {
	LightNode,
	PathParts,
	LightNodeType,
} from '../../../../../types/project-structure';

/**
 * Recursively collects all folder path parts from a LightNode tree.
 *
 * Only nodes with `type: "Folder"` are included.
 * Paths are returned as arrays of strings (`PathParts`), relative to root.
 *
 * @param node - The root LightNode
 * @param currentPath - (internal) accumulated path parts
 * @returns An array of PathParts, one for each folder in the tree
 */
export const getAllFolderPathPartsFromLightNode = (
	node: LightNode,
	currentPath: PathParts = []
): PathParts[] => {
	if (node.type !== LightNodeType.Folder) return [];

	const result: PathParts[] = [currentPath];

	for (const [name, child] of Object.entries(node.children)) {
		const childPath = [...currentPath, name];
		result.push(...getAllFolderPathPartsFromLightNode(child, childPath));
	}

	return result;
};
