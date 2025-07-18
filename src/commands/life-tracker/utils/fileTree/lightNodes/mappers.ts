import { LightNode, PathParts, LightNodeType } from "../../../../../types/project-structure";

export const flattenLightNodeByType = (
	node: LightNode,
	currentPath: PathParts = []
): Record<LightNodeType, PathParts[]> => {
	const result: Record<LightNodeType, PathParts[]> = {
		[LightNodeType.Folder]: [],
		[LightNodeType.RootFile]: [],
		[LightNodeType.LeafFile]: [],
	};

	const walk = (node: LightNode, path: PathParts) => {
		result[node.type].push(path);

		if (node.children && node.type !== LightNodeType.LeafFile) {
			for (const [name, child] of Object.entries(node.children)) {
				walk(child, [...path, name]);
			}
		}
	};

	walk(node, currentPath);
	return result;
};
