import * as vscode from "vscode";
import { EXTENSION_KEY } from "@/constants/extension-key";
import { STYLED_COMPONENT_OPTION_KEY, STYLED_COMPONENT_SETTING_KEY } from "./constants";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeStyledComponentConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnableStyledComponents: boolean
) => {
	if (!event.affectsConfiguration(STYLED_COMPONENT_SETTING_KEY)) return;

	const enableStyledComponents = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(
			STYLED_COMPONENT_OPTION_KEY,
			initialEnableStyledComponents
		);

	// Disable/enable context menu item
	await vsCode.commands.executeCommand(
		"setContext",
		STYLED_COMPONENT_SETTING_KEY,
		enableStyledComponents
	);
};

export default onDidChangeStyledComponentConfiguration;
