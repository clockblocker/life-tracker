import { BTICK, SPACE2, PIPE } from '../../../constants/format';

const ButtonId = {
	Back: 'go-back',
	Today: 'go-to-today',
	GlobalRoot: 'go-to-global-root',
	NewDir: 'create-new-file-in-this-dir',
	NewFile: 'create-new-folder-in-this-dir',
};

const makeButtonMdFromButtonId = (id: string) => {
	return `${BTICK}BUTTON[${id}]${BTICK}`;
};

const navButtonGroup = [ButtonId.Back, ButtonId.Today, ButtonId.GlobalRoot].map(
	(id) => makeButtonMdFromButtonId(id)
);

const addNewStuffButtonGroup = [ButtonId.NewDir, ButtonId.NewFile].map((id) =>
	makeButtonMdFromButtonId(id)
);

export const NAV_BUTTONS_LINE = `${navButtonGroup.join(SPACE2)}${SPACE2}${PIPE}${SPACE2}${addNewStuffButtonGroup.join(SPACE2)}`;
