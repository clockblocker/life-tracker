import z from 'zod/v4';

const keywords = [
	'Sport',
	'Food',
	'Money',
	'Daily',
	'Library',
	'List',
	'Root',
	'Notes',
	'LifeTracker',
	'Plan',
	'Stats',
] as const;

export const KeywordSchema = z.enum(keywords);
export type Keyword = z.infer<typeof KeywordSchema>;
export const Keyword = KeywordSchema.enum;
export const Keywords = KeywordSchema.options;
