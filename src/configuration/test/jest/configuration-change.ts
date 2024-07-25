import * as vscode from "vscode";

import { JEST_OPTION_KEY, JEST_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeJestConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnableJest: boolean
) => {
	if (!event.affectsConfiguration(JEST_SETTING_KEY)) return;
	const enableJest = vsCode.workspace.getConfiguration(EXTENSION_KEY).get<boolean>(JEST_OPTION_KEY, initialEnableJest);
	// Disable/enable context menu item
	await vsCode.commands.executeCommand("setContext", JEST_SETTING_KEY, enableJest);
};

export default onDidChangeJestConfiguration;
