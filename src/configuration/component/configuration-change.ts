import * as vscode from "vscode";

import { COMPONENT_CASE_OPTION_KEY, COMPONENT_CASE_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeComponentConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialcomponentFileCase: string
) => {
	if (!event.affectsConfiguration(COMPONENT_CASE_OPTION_KEY)) return;

	const enableComponent = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<string>(COMPONENT_CASE_OPTION_KEY, initialcomponentFileCase);

	// Disable/enable context menu item
	await vsCode.commands.executeCommand("setContext", COMPONENT_CASE_SETTING_KEY, enableComponent);
};

export default onDidChangeComponentConfiguration;
