export interface TextEaterSettings {
	deepseekApiKey: string;
	googleApiKey: string;
	apiProvider: 'google';
}

export const DEFAULT_SETTINGS: TextEaterSettings = {
	deepseekApiKey: '',
	googleApiKey: '',
	apiProvider: 'google',
};
