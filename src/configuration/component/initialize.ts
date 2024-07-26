import * as vscode from "vscode";
import { EXTENSION_KEY } from "@/constants/extension-key";

import {
	COMPONENT_CASE_OPTION_KEY,
	COMPONENT_CASE_SETTING_KEY,
	DIRECTIVE_OPTION_KEY,
	DIRECTIVE_SETTING_KEY,
} from "./constants";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (
	vsCode: typeof vscode
): Promise<{
	componentFileCase: string;
	useDirective: boolean;
}> => {
	const initialComponentFileCase = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<string>(COMPONENT_CASE_OPTION_KEY);

	const initialUseDirective = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(DIRECTIVE_OPTION_KEY);

	await vsCode.commands.executeCommand(
		"setContext",
		COMPONENT_CASE_SETTING_KEY,
		initialComponentFileCase
	);

	await vsCode.commands.executeCommand("setContext", DIRECTIVE_SETTING_KEY, initialUseDirective);

	return {
		componentFileCase: initialComponentFileCase,
		useDirective: initialUseDirective,
	};
};

export default initialize;
