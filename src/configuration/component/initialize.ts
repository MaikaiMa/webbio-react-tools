import * as vscode from "vscode";
import { COMPONENT_CASE_OPTION_KEY, COMPONENT_CASE_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<string> => {
	const initialcomponentFileCase = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<string>(COMPONENT_CASE_OPTION_KEY);

	await vsCode.commands.executeCommand(
		"setContext",
		COMPONENT_CASE_SETTING_KEY,
		initialcomponentFileCase
	);

	return initialcomponentFileCase;
};

export default initialize;
