import * as vscode from "vscode";
import { JEST_SETTING_KEY } from "./jest/constants";
import { onDidChangeJestConfiguration } from "./jest";

const supportedOptions = [JEST_SETTING_KEY] as const;

export type TestOptionKey = (typeof supportedOptions)[number];

// Pass toplevel vscode object to avoid data mismatch
const onDidChangeTestConfiguration = async (
	vsCode: typeof vscode,
	event: vscode.ConfigurationChangeEvent,
	initialEnabled: Record<TestOptionKey, boolean>
) => {
	// Trigger change events for styled options
	await onDidChangeJestConfiguration(vsCode, event, initialEnabled[JEST_SETTING_KEY]);
};

export default onDidChangeTestConfiguration;
