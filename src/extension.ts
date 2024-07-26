import * as vscode from "vscode";
import * as changeCase from "change-case";

import createComponent from "./create-component";
import ELEMENT_OPTIONS, { ElementOptions } from "./constants/element-options";

import {
	COMPONENT_CASE_OPTION_KEY,
	DIRECTIVE_SETTING_KEY,
	DIRECTIVE_OPTION_KEY,
} from "./configuration/component/constants";

import { EXTENSION_KEY } from "./constants/extension-key";
import { STYLED_COMPONENT_SETTING_KEY } from "./configuration/styled/styled-component/constants";
import { STORYBOOK_SETTING_KEY } from "./configuration/story/storybook/constants";
import { TAILWIND_SETTING_KEY } from "./configuration/styled/tailwind/constants";
import { CSS_MODULES_SETTING_KEY } from "./configuration/styled/css-modules/constants";
import { JEST_SETTING_KEY } from "./configuration/test/jest/constants";

import { initializeComponentConfiguration } from "./configuration/component";
import { initializeStyledComponentConfiguration } from "./configuration/styled/styled-component";
import { initializeTailwindConfiguration } from "./configuration/styled/tailwind";
import { initializeCssModulesConfiguration } from "./configuration/styled/css-modules";
import { initializeStorybookConfiguration } from "./configuration/story/storybook";
import { initializeJestConfiguration } from "./configuration/test/jest";

import onDidChangeComponentConfiguration from "./configuration/component/configuration-change";
import globalConfigurationChangeHandler from "./configuration";
import styledOptionCommands from "./configuration/styled/commands";
import styledOptionQuickPick from "./configuration/styled/quick-pick";
import DIRECTIVE_OPTIONS from "./constants/directive-options";

export const handleCreateComponent = async (args: any, styled?: boolean) => {
	let styleType: ElementOptions;
	let directive: ElementOptions;
	let componentName: string;

	const useDirective = vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(DIRECTIVE_OPTION_KEY);

	const preferedCase = vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<string>(COMPONENT_CASE_OPTION_KEY);

	const caseTransformer =
		!!changeCase && !!preferedCase && !!changeCase[preferedCase] ? changeCase[preferedCase] : null;

	const name = await vscode.window.showInputBox({
		prompt: `Component name`,
		ignoreFocusOut: true,
		valueSelection: [-1, -1],
	});

	if (name && !!caseTransformer) {
		componentName = caseTransformer(name);
	}

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

	if (useDirective) {
		directive = await vscode.window.showQuickPick(DIRECTIVE_OPTIONS, {
			ignoreFocusOut: true,
			canPickMany: false,
			placeHolder: "Select the file directive",
		});
	}

	if (args) {
		const path = args.fsPath;
		createComponent(
			componentName,
			{
				directory: path,
				htmlElement,
				styleType,
			},
			directive
		);
	} else {
		createComponent(componentName, { htmlElement, styleType }, directive);
	}
};

export async function activate(context: vscode.ExtensionContext) {
	// Initialize configurale option context
	const { componentFileCase, useDirective } = await initializeComponentConfiguration(vscode);
	const initialEnableStyledComponents = await initializeStyledComponentConfiguration(vscode);
	const initialEnableTailwind = await initializeTailwindConfiguration(vscode);
	const initialEnableCssModules = await initializeCssModulesConfiguration(vscode);
	const initialEnableStorybook = await initializeStorybookConfiguration(vscode);
	const initialEnableJest = await initializeJestConfiguration(vscode);

	const initialEnabledOptions = {
		[STYLED_COMPONENT_SETTING_KEY]: initialEnableStyledComponents,
		[DIRECTIVE_SETTING_KEY]: initialEnableStyledComponents,
		[TAILWIND_SETTING_KEY]: initialEnableTailwind,
		[CSS_MODULES_SETTING_KEY]: initialEnableCssModules,
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
		// Default configuration changes
		await onDidChangeComponentConfiguration(vscode, event, componentFileCase, useDirective);
		// Optional configuration changes
		await globalConfigurationChangeHandler(vscode, event, context, initialEnabledOptions);
	});
}

export function deactivate() {}
