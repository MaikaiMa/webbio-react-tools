import * as vscode from "vscode";

import { CSS_MODULES_OPTION_KEY, CSS_MODULES_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeCssModulesConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnableCssModules: boolean
) => {
	if (!event.affectsConfiguration(CSS_MODULES_SETTING_KEY)) return;

	const enableCssModules = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(CSS_MODULES_OPTION_KEY, initialEnableCssModules);

	// Disable/enable context menu item
	await vsCode.commands.executeCommand(
		"setContext",
		CSS_MODULES_SETTING_KEY,
		enableCssModules
	);
};

export default onDidChangeCssModulesConfiguration;
