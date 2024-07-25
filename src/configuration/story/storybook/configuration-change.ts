import * as vscode from "vscode";

import { STORYBOOK_OPTION_KEY, STORYBOOK_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeStorybookConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnableStorybook: boolean
) => {
	if (!event.affectsConfiguration(STORYBOOK_SETTING_KEY)) return;

	const enableStorybook = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(STORYBOOK_OPTION_KEY, initialEnableStorybook);

	// Disable/enable context menu item
	await vsCode.commands.executeCommand("setContext", STORYBOOK_SETTING_KEY, enableStorybook);
};

export default onDidChangeStorybookConfiguration;
