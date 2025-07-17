import { DailyMenuItem, Aspect } from '../types/file-structure-atoms';

export const emojiFromDailyMenuItem: Record<DailyMenuItem, string> = {
	[Aspect.Sport]: '💪',
	[Aspect.Money]: '📉',
	[Aspect.Food]: '🥗',
	Notes: '📝',
};

export const labelFromDailyMenuItem: Record<DailyMenuItem, string> = {
	[Aspect.Sport]: 'Sport',
	[Aspect.Money]: 'Money',
	[Aspect.Food]: 'Food',
	Notes: 'Notes',
};
