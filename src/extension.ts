import * as vscode from "vscode";
import createComponent from "./create-component";
import ELEMENT_OPTIONS, { ElementOptions } from "./utils/constants/options.ts";

const EXTENSION_KEY = "webbioReactTools";

const handleCreateComponent = async (args: any, styled?: boolean) => {
	let styleType: ElementOptions;

	const componentName = await vscode.window.showInputBox({
		prompt: `Component name`,
		ignoreFocusOut: true,
		valueSelection: [-1, -1],
	});

	const htmlElement: ElementOptions = await vscode.window.showQuickPick(
		ELEMENT_OPTIONS,
		{
			ignoreFocusOut: true,
			canPickMany: false,
			placeHolder: "Pick an element",
		}
	);

	if (styled) {
		styleType = await vscode.window.showQuickPick(
			[
				{
					label: "CSS Module",
					alwaysShow: true,
					description: "Uses SCSS file as CSS module",
					value: "css",
				},
				{
					label: "Styled component",
					alwaysShow: true,
					description: "Use styled components styling file",
					value: "sc",
				},
			],
			{
				ignoreFocusOut: true,
				canPickMany: false,
				placeHolder: "Use CSS module or styled component?",
			}
		);
	}

	if (!componentName || componentName === "") {
		return;
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
	const OPTION_KEY = "enableStyledComponents";
	const SETTING_KEY = `${EXTENSION_KEY}.${OPTION_KEY}`;

	const initialEnableStyledComponents = await vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(OPTION_KEY);

	await vscode.commands.executeCommand(
		"setContext",
		SETTING_KEY,
		initialEnableStyledComponents
	);

	const disposable = [
		vscode.commands.registerCommand(
			"react-tools.create-component",
			(args) => {
				handleCreateComponent(args);
			}
		),
		vscode.commands.registerCommand(
			"react-tools.create-styled-component",
			(args) => {
				handleCreateComponent(args, true);
			}
		),
	];

	vscode.workspace.onDidChangeConfiguration(async (event) => {
		if (!event.affectsConfiguration(SETTING_KEY)) return;

		const enableStyledComponents = vscode.workspace
			.getConfiguration(EXTENSION_KEY)
			.get<boolean>(OPTION_KEY, initialEnableStyledComponents);

		if (event.affectsConfiguration(SETTING_KEY)) {
			await vscode.commands.executeCommand(
				"setContext",
				SETTING_KEY,
				enableStyledComponents
			);
		}
	});

	context.subscriptions.push(...disposable);
}

export function deactivate() {}
