import * as vscode from "vscode";
import { EXTENSION_KEY } from "@/constants/extension-key";
import { CSS_MODULES_OPTION_KEY, CSS_MODULES_SETTING_KEY } from "./constants";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<boolean> => {
	const initialEnableCssModules = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(CSS_MODULES_OPTION_KEY);

	await vsCode.commands.executeCommand(
		"setContext",
		CSS_MODULES_SETTING_KEY,
		initialEnableCssModules
	);

	return initialEnableCssModules;
};

export default initialize;
