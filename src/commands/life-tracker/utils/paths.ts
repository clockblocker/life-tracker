import { DASH, USCORE } from '../../../constants/format';
import { Year, DateParts, DatePartsPeriod } from '../../../types/dates';
import {
	Section,
	YYYYRepr,
	FullDateRepr,
	FullDatePeriodRepr,
	Aspect,
	ROOT,
	NOTES,
} from '../../../types/file-structure-atoms';
import { Maybe } from '../../../types/general';
import {
	PathParts,
	structureFromSection,
} from '../../../types/project-structure';

const makeRootFileNameFromPathParts = (pathParts: PathParts) => {
	return [...pathParts, ROOT].join(DASH);
};

const makeRootFileNameForSection = ({
	section,
	pathParts,
}: {
	section: Section;
	pathParts: PathParts;
}) => {
	return makeRootFileNameFromPathParts([section, ...pathParts]);
};

const unsafeFullDateStyleJoin = (parts: string[]) => {
	return parts.join(USCORE);
};

export function getMaybeRootName({
	section,
	pathParts,
}: {
	section: Section;
	pathParts: PathParts;
}): Maybe<string> {
	const shape = structureFromSection[section];

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

	if (
		section !== Section.Daily ||
		(section === Section.Daily && pathParts.length < 3)
	) {
		return {
			error: false,
			data: makeRootFileNameForSection({ section, pathParts }),
		};
	}

	return {
		error: false,
		data: `${unsafeFullDateStyleJoin(pathParts)}${DASH}${ROOT}`,
	};
}

export const formatYYYY = (year: Year): YYYYRepr => {
	return year.toString().padStart(4, '0');
};

export const reprFromDateParts = ({
	yyyy,
	mm,
	dd,
}: DateParts): FullDateRepr => {
	return unsafeFullDateStyleJoin([yyyy, mm, dd]) as FullDateRepr;
};

/**
 * Converts a DatePeriod into a string representation of the form:
 * `YYYY_MM_DD__to__YYYY_MM_DD`
 *
 * Delegates formatting to `reprFromDate`.
 *
 * @param datePeriod - The DatePeriod to convert
 * @returns A FullDatePeriodRepr string
 */
export const reprFromDatePartsPeriod = (
	datePeriod: DatePartsPeriod
): FullDatePeriodRepr => {
	return `${reprFromDateParts(datePeriod.startIncl)}__to__${reprFromDateParts(datePeriod.endExl)}`;
};

export const getDailyLeafFileNames = ({
	dateParts,
	aspects,
}: {
	dateParts: DateParts;
	aspects: Aspect[];
}): string[] => {
	const dateRepr = reprFromDateParts(dateParts);
	const suffixes = [NOTES, ...aspects];

	return suffixes.map((suffix) => `${dateRepr}${DASH}${suffix}`);
};
