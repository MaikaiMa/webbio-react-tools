import * as vscode from "vscode";
import { EXTENSION_KEY } from "@/constants/extension-key";
import { TAILWIND_OPTION_KEY, TAILWIND_SETTING_KEY } from "./constants";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<boolean> => {
	const initialEnableTailwind = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(TAILWIND_OPTION_KEY);

	await vsCode.commands.executeCommand("setContext", TAILWIND_SETTING_KEY, initialEnableTailwind);

	return initialEnableTailwind;
};

export default initialize;
