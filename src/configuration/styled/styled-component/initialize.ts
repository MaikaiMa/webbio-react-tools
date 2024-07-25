import * as vscode from "vscode";

import {
	STYLED_COMPONENT_OPTION_KEY,
	STYLED_COMPONENT_SETTING_KEY,
} from "./constants";

import { EXTENSION_KEY } from "../../../constants/extension-key";

// Pass toplevel vscode object to avoid data mismatch
const initialize = async (vsCode: typeof vscode): Promise<boolean> => {
	const initialEnableStyledComponents = vsCode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(STYLED_COMPONENT_OPTION_KEY);

	await vsCode.commands.executeCommand(
		"setContext",
		STYLED_COMPONENT_SETTING_KEY,
		initialEnableStyledComponents
	);

	return initialEnableStyledComponents;
};

export default initialize;
