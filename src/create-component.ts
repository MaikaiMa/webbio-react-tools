import * as vscode from "vscode";

import convertToComponentName from "./utils/convert-to-component-name";
import createDirectory from "./utils/create-directory";
import getActiveDirectory from "./utils/get-active-directory";
import { ElementOptions } from "./constants/element-options";

import { EXTENSION_KEY } from "./constants/extension-key";
import { JEST_OPTION_KEY } from "./configuration/test/jest/constants";
import { STORYBOOK_OPTION_KEY } from "./configuration/story/storybook/constants";

// Default
import { createComponentFiles } from "./configuration/component";
import { createJestFiles } from "./configuration/test/jest";
import { createStorybookFiles } from "./configuration/story/storybook";

// Styled options
import { createStyledComponentFiles } from "./configuration/styled/styled-component";
import { createCssModulesFiles } from "./configuration/styled/css-modules";
import { createTailwindFiles } from "./configuration/styled/tailwind";

interface Props {
	directory?: string;
	styleType?: ElementOptions;
	htmlElement?: ElementOptions;
}

export default async (
	fileName: string,
	{ directory, htmlElement, styleType }: Props,
	directive?: ElementOptions
) => {
	const componentName = convertToComponentName(fileName);
	const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath;

	// Filenames
	const COMPONENT_FILE_NAME = `${fileName}.tsx`;

	if (!directory) {
		directory = await vscode.window.showInputBox({
			value: getActiveDirectory(directory),
			prompt: `Path from root`,
			ignoreFocusOut: true,
			valueSelection: [-1, -1],
		});
	}

	if (!directory) return;

	if (!directory.includes(projectRoot)) {
		directory = projectRoot + directory;
	}

	if (directory[directory.length - 1] !== "/") {
		directory = directory + "/";
	}

	const directoryWithFileName = directory + fileName;
	const filePath = (name: string) => [directoryWithFileName, name].join("/");

	createDirectory(directoryWithFileName);

	if (htmlElement && styleType) {
		switch (styleType.value) {
			case "css":
				await createCssModulesFiles(
					directoryWithFileName,
					fileName,
					componentName,
					htmlElement,
					directive.value
				);
				break;
			case "sc":
				await createStyledComponentFiles(
					directoryWithFileName,
					fileName,
					componentName,
					htmlElement,
					directive.value
				);
				break;
			case "tw":
				await createTailwindFiles(
					directoryWithFileName,
					fileName,
					componentName,
					htmlElement,
					directive.value
				);
				break;
			default:
				break;
		}
	} else {
		await createComponentFiles(
			directoryWithFileName,
			fileName,
			componentName,
			htmlElement,
			directive.value
		);
	}

	if (vscode.workspace.getConfiguration(EXTENSION_KEY).get<boolean>(JEST_OPTION_KEY)) {
		await createJestFiles(directoryWithFileName, fileName, componentName);
	}

	if (vscode.workspace.getConfiguration(EXTENSION_KEY).get<boolean>(STORYBOOK_OPTION_KEY)) {
		await createStorybookFiles(directoryWithFileName, fileName, componentName);
	}

	setTimeout(() => {
		vscode.workspace.openTextDocument(filePath(COMPONENT_FILE_NAME)).then((editor) => {
			if (!editor) {
				return;
			}
			vscode.window.showTextDocument(editor);
		});
	}, 50);
};
