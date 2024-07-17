import * as vscode from "vscode";

import createFile from "./utils/create-file";
import convertToComponentName from "./utils/convert-to-component-name";
import createDirectory from "./utils/create-directory";
import { ElementOptions } from "./utils/constants/options.ts";

// Default
import functionalComponent from "./templates/functional-component-default";
import indexFile from "./templates/index-file";
import testFile from "./templates/test-file";
import storyFile from "./templates/story-file";

// HTML
import functionalComponentHtml from "./templates/functional-component-html";

// Styled Component
import functionalComponentStyled from "./templates/functional-component-styled";
import indexFileStyled from "./templates/index-file-styled";
import styledFile from "./templates/styled-file";

// SCSS
import functionalComponentScss from "./templates/functional-component-scss";
import scssFile from "./templates/scss-file";

interface Props {
	directory?: string;
	styleType?: ElementOptions;
	htmlElement?: ElementOptions;
	useTest?: boolean;
	useStory?: boolean;
}

export default async (
	fileName: string,
	{ directory, htmlElement, styleType, useTest, useStory }: Props
) => {
	const componentName = convertToComponentName(fileName);
	const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri
		.fsPath;

	// Filenames
	const COMPONENT_FILE_NAME = `${fileName}.tsx`;
	const INDEX_FILE_NAME = "index.ts";
	const STYLED_FILE_NAME = `${fileName}.styles.ts`;
	const SCSS_FILE_NAME = `${fileName}.module.scss`;
	const TEST_FILE_NAME = `${fileName}.test.ts`;
	const STORY_FILE_NAME = `${fileName}.stories.ts`;

	if (!directory) {
		directory =
			(await vscode.window.showInputBox({
				value: "/",
				prompt: `Path from root`,
				ignoreFocusOut: true,
				valueSelection: [-1, -1],
			})) || "";
	}

	if (!directory.includes(projectRoot)) {
		directory = projectRoot + directory;
	}

	if (directory[directory.length - 1] !== "/") {
		directory = directory + "/";
	}

	const directoryWithFileName = directory + fileName;
	const filePath = (name: string) => directoryWithFileName + "/" + name;

	createDirectory(directoryWithFileName);

	if (htmlElement && styleType) {
		switch (styleType.value) {
			case "css":
				await createFile(
					filePath(INDEX_FILE_NAME),
					indexFile(fileName)
				);

				await createFile(
					filePath(COMPONENT_FILE_NAME),
					functionalComponentScss(
						fileName,
						componentName,
						htmlElement.value,
						htmlElement.label
					)
				);

				await createFile(filePath(SCSS_FILE_NAME), scssFile());

				break;
			case "sc":
				await createFile(
					filePath(COMPONENT_FILE_NAME),
					functionalComponentStyled(
						fileName,
						componentName,
						htmlElement.value
					)
				);

				await createFile(
					filePath(STYLED_FILE_NAME),
					styledFile(fileName, componentName, htmlElement.label)
				);

				await createFile(
					filePath(INDEX_FILE_NAME),
					indexFileStyled(fileName, componentName)
				);

				break;
			default:
				break;
		}
	} else if (htmlElement) {
		await createFile(filePath(INDEX_FILE_NAME), indexFile(fileName));

		await createFile(
			filePath(COMPONENT_FILE_NAME),
			functionalComponentHtml(
				componentName,
				htmlElement.value,
				htmlElement.label
			)
		);
	} else {
		await createFile(filePath(INDEX_FILE_NAME), indexFile(fileName));

		await createFile(
			filePath(COMPONENT_FILE_NAME),
			functionalComponent(componentName)
		);
	}

	if (!styleType && !htmlElement) {
		await createFile(
			filePath(COMPONENT_FILE_NAME),
			functionalComponent(componentName)
		);
	}

	// Always disabled
	if (useTest) {
		await createFile(filePath(TEST_FILE_NAME), testFile(componentName));
	}

	// Always disabled
	if (useStory) {
		await createFile(filePath(STORY_FILE_NAME), storyFile(componentName));
	}

	setTimeout(() => {
		vscode.workspace
			.openTextDocument(filePath(COMPONENT_FILE_NAME))
			.then((editor) => {
				if (!editor) {
					return;
				}
				vscode.window.showTextDocument(editor);
			});
	}, 50);
};
