import * as vscode from "vscode";
import { EXTENSION_KEY } from "@/constants/extension-key";
import { TAILWIND_OPTION_KEY, TAILWIND_SETTING_KEY } from "./constants";

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeTailwindConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnableTailwind: boolean
) => {
	if (!event.affectsConfiguration(TAILWIND_SETTING_KEY)) return;

	const enableTailwind = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(TAILWIND_OPTION_KEY, initialEnableTailwind);

	// Disable/enable context menu item
	await vsCode.commands.executeCommand("setContext", TAILWIND_SETTING_KEY, enableTailwind);
};

export default onDidChangeTailwindConfiguration;
