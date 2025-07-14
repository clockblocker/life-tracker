import {
	Section,
	structureFromSection,
	RootSchema,
	FILE_PARTS_DELIMETER,
} from '../types/file-structure';
import { Maybe } from '../types/general';

export function getMaybeRootName(
	section: Section,
	pathParts: string[]
): Maybe<string> {
	const shape = structureFromSection[section];

	if (pathParts.length !== shape.pathParts.length) {
		return {
			error: true,
			errorText: `Expected ${shape.pathParts.length} path parts for "${section}", got ${pathParts.length}`,
		};
	}

	for (let i = 0; i < pathParts.length; i++) {
		const schema = shape.pathParts[i];
		const value = pathParts[i];
		const result = schema.safeParse(value);
		if (!result.success) {
			return {
				error: true,
				errorText: `Invalid value "${value}" at index ${i} for section "${section}"`,
			};
		}
	}

	const joined = [section, ...pathParts, RootSchema.value].join(
		FILE_PARTS_DELIMETER
	);
	return { error: false, data: joined };
}
