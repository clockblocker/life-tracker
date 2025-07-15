import { DASH } from '../../../../constants/format';
import {
	emojiFromDailyMenuItem,
	labelFromDailyMenuItem,
} from '../../../../constants/mappers';
import {
	Aspect,
	FullDateRepr,
	DailyMenuItem,
	NOTES,
} from '../../../../types/file-structure-atoms';
import { getMenuItemRepr, makeWikilinkMD } from '../general';

export const makeDailyMenuItemsMarkdown = (
	aspects: Aspect[],
	day: FullDateRepr
) => {
	const dailyMenuItems: DailyMenuItem[] = [...aspects, NOTES];

	return dailyMenuItems.map((item) => {
		const source = `${day}${DASH}${item}`;
		const repr = getMenuItemRepr({
			emoji: emojiFromDailyMenuItem[item],
			label: labelFromDailyMenuItem[item],
		});

		return makeWikilinkMD({
			source,
			repr,
		});
	});
};
