export interface MyPluginSettings {
    deepseekApiKey: string;
    googleApiKey: string;
    apiProvider: 'deepseek' | 'google';
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
    deepseekApiKey: '',
    googleApiKey: '',
    apiProvider: 'google'
};
