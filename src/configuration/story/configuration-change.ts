import * as vscode from "vscode";
import { STORYBOOK_SETTING_KEY } from "./storybook/constants";
import { onDidChangeStorybookConfiguration } from "./storybook";

const supportedOptions = [STORYBOOK_SETTING_KEY] as const;

export type StoryOptionKey = (typeof supportedOptions)[number];

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeStoryConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnabled: Record<StoryOptionKey, boolean>
) => {
	// Trigger change events for styled options
	await onDidChangeStorybookConfiguration(vsCode, event, initialEnabled[STORYBOOK_SETTING_KEY]);
};

export default onDidChangeStoryConfiguration;
