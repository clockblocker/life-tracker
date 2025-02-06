export interface MyPluginSettings {
    anthropicKey: string;
    googleApiKey: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
    anthropicKey: '',
    googleApiKey: ''
};
