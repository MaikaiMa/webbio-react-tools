import * as vscode from "vscode";
import { STORYBOOK_OPTION_KEY, STORYBOOK_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<boolean> => {
	const initialEnableStorybook = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(STORYBOOK_OPTION_KEY);

	await vsCode.commands.executeCommand("setContext", STORYBOOK_SETTING_KEY, initialEnableStorybook);

	return initialEnableStorybook;
};

export default initialize;
