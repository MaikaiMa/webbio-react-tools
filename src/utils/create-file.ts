import * as fs from "fs";
import * as vscode from "vscode";

export const createFile = async (
	filePath: string,
	content: string | NodeJS.ArrayBufferView
): Promise<void> => {
	if (!fs.existsSync(filePath)) {
		await fs.createWriteStream(filePath).close();
		await fs.writeFile(filePath, content, (err) => {
			if (err) {
				vscode.window.showErrorMessage("Maker can't write to file.");
			}
		});
	} else {
		vscode.window.showWarningMessage("File already exists.");
	}
};

export default createFile;
