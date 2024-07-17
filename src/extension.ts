import * as vscode from "vscode";
import createComponent from "./create-component";
import ELEMENT_OPTIONS, { ElementOptions } from "./utils/constants/options.ts";

const handleCreateComponent = async (
	args: any,
	html?: boolean,
	styled?: boolean
) => {
	let htmlElement: ElementOptions;
	let styleType: ElementOptions;

	const componentName = await vscode.window.showInputBox({
		prompt: `Component name`,
		ignoreFocusOut: true,
		valueSelection: [-1, -1],
	});

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

	if (html || styled) {
		htmlElement = await vscode.window.showQuickPick(ELEMENT_OPTIONS, {
			ignoreFocusOut: true,
			canPickMany: false,
			placeHolder: "Use CSS module or styled component?",
		});
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

export function activate(context: vscode.ExtensionContext) {
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
				handleCreateComponent(args, false, true);
			}
		),
		vscode.commands.registerCommand(
			"react-tools.create-html-component",
			(args) => {
				handleCreateComponent(args, true);
			}
		),
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() {}
