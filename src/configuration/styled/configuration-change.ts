import * as vscode from "vscode";

import commands from "./commands";
import { STYLED_COMPONENT_SETTING_KEY } from "./styled-component/constants";
import { TAILWIND_SETTING_KEY } from "./tailwind/constants";
import { CSS_MODULES_SETTING_KEY } from "./css-modules/constants";
import { onDidChangeStyledComponentConfiguration } from "./styled-component";
import { onDidChangeTailwindConfiguration } from "./tailwind";
import { onDidChangeCssModulesConfiguration } from "./css-modules";

const supportedOptions = [
	STYLED_COMPONENT_SETTING_KEY,
	TAILWIND_SETTING_KEY,
	CSS_MODULES_SETTING_KEY,
] as const;

export type StyledOptionKey = (typeof supportedOptions)[number];

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeStyledConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	context: vscode.ExtensionContext,
	initialEnabled: Record<StyledOptionKey, boolean>
) => {
	// Trigger change events for styled options
	await onDidChangeStyledComponentConfiguration(
		vsCode,
		event,
		initialEnabled[STYLED_COMPONENT_SETTING_KEY]
	);

	await onDidChangeTailwindConfiguration(
		vsCode,
		event,
		initialEnabled[STYLED_COMPONENT_SETTING_KEY]
	);

	await onDidChangeCssModulesConfiguration(vsCode, event, initialEnabled[CSS_MODULES_SETTING_KEY]);

	// Add command palette commands
	context.subscriptions.push(...commands);
};

export default onDidChangeStyledConfiguration;
