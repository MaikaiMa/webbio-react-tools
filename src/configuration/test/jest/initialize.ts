import * as vscode from "vscode";
import { JEST_OPTION_KEY, JEST_SETTING_KEY } from "./constants";
import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<boolean> => {
	const initialEnableJest = vsCode.workspace.getConfiguration(EXTENSION_KEY).get<boolean>(JEST_OPTION_KEY);
	await vsCode.commands.executeCommand("setContext", JEST_SETTING_KEY, initialEnableJest);
	return initialEnableJest;
};

export default initialize;
