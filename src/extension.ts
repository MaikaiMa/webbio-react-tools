import * as vscode from "vscode";
import createComponent from "./create-component";
import ELEMENT_OPTIONS, { ElementOptions } from "./constants/options.ts";

import { STYLED_COMPONENT_SETTING_KEY } from "./configuration/styled/styled-component/constants";
import { CSS_MODULES_SETTING_KEY } from "./configuration/styled/css-modules/constants";
import { STORYBOOK_SETTING_KEY } from "./configuration/story/storybook/constants";
import { JEST_SETTING_KEY } from "./configuration/test/jest/constants";

import { initializeStyledComponentConfiguration } from "./configuration/styled/styled-component";
import { initializeCssModulesConfiguration } from "./configuration/styled/css-modules";
import { initializeStorybookConfiguration } from "./configuration/story/storybook";
import { initializeJestConfiguration } from "./configuration/test/jest";

import globalConfigurationChangeHandler from "./configuration";
import styledOptionCommands from "./configuration/styled/commands";
import styledOptionQuickPick from "./configuration/styled/quick-pick";

export const handleCreateComponent = async (args: any, styled?: boolean) => {
	let styleType: ElementOptions;

	const componentName = await vscode.window.showInputBox({
		prompt: `Component name`,
		ignoreFocusOut: true,
		valueSelection: [-1, -1],
	});

	// Cancel
	if (!componentName || componentName === "") return;

	const htmlElement: ElementOptions = await vscode.window.showQuickPick(ELEMENT_OPTIONS, {
		ignoreFocusOut: true,
		canPickMany: false,
		placeHolder: "Pick an element",
	});

	// Cancel
	if (!htmlElement) return;

	if (styled) {
		styleType = await styledOptionQuickPick();
		if (!styleType) return;
	}

	if (args) {
		const path = args.fsPath;
		createComponent(componentName, {
			directory: path,
			htmlElement,
			styleType,
		});
	} else {
		createComponent(componentName, { htmlElement, styleType });
	}
};

export async function activate(context: vscode.ExtensionContext) {
	// Initialize configurale option context
	const initialEnableStyledComponents = await initializeStyledComponentConfiguration(vscode);
	const initialEnableCssModules = await initializeCssModulesConfiguration(vscode);
	const initialEnableStorybook = await initializeStorybookConfiguration(vscode);
	const initialEnableJest = await initializeJestConfiguration(vscode);

	const initialEnabledOptions = {
		[CSS_MODULES_SETTING_KEY]: initialEnableCssModules,
		[STYLED_COMPONENT_SETTING_KEY]: initialEnableStyledComponents,
		[STORYBOOK_SETTING_KEY]: initialEnableStorybook,
		[JEST_SETTING_KEY]: initialEnableJest,
	};

	// Register (optional) commands
	context.subscriptions.push(
		...[
			vscode.commands.registerCommand("react-tools.create-component", (args) => {
				handleCreateComponent(args);
			}),
			// Only add command if any styled components option is enabled
			...(Object.values(initialEnabledOptions).some((enabled) => enabled)
				? styledOptionCommands
				: []),
		]
	);

	// Add change listners for configuration changes to trigger option context
	vscode.workspace.onDidChangeConfiguration(async (event) => {
		await globalConfigurationChangeHandler(vscode, event, context, initialEnabledOptions);
	});
}

export function deactivate() {}
