import * as fs from "fs";
import * as vscode from "vscode";
import { useDirectiveTemplate } from "./template-snippets";

export const createFile = async (
	filePath: string,
	content: string | NodeJS.ArrayBufferView,
	directive?: string
): Promise<void> => {
	const template = useDirectiveTemplate(content.toString(), directive);

	if (!fs.existsSync(filePath)) {
		await fs.createWriteStream(filePath).close();
		await fs.writeFile(filePath, template, (err) => {
			if (err) {
				vscode.window.showErrorMessage("Maker can't write to file.");
			}
		});
	} else {
		vscode.window.showWarningMessage("File already exists.");
	}
};

export default createFile;
