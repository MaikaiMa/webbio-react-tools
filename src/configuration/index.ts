import * as vscode from "vscode";

import onDidChangeTestConfiguration, { TestOptionKey } from "./test/configuration-change";
import onDidChangeStyledConfiguration, { StyledOptionKey } from "./styled/configuration-change";
import onDidChangeStoryConfiguration, { StoryOptionKey } from "./story/configuration-change";

export type ConfigurationChangeHandlerProps = {
	vsCode: typeof vscode;
	event: vscode.ConfigurationChangeEvent;
	context: vscode.ExtensionContext;
	initialEnabled: Record<TestOptionKey | StoryOptionKey | StyledOptionKey, boolean>;
};

const globalConfigurationChangeHandler = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	context: vscode.ExtensionContext,
	initialEnabled: Record<TestOptionKey | StoryOptionKey | StyledOptionKey, boolean>
): Promise<void> => {
	await onDidChangeStyledConfiguration(vsCode, event, context, initialEnabled);
	await onDidChangeStoryConfiguration(vsCode, event, initialEnabled);
	await onDidChangeTestConfiguration(vsCode, event, initialEnabled);
};

export default globalConfigurationChangeHandler;
