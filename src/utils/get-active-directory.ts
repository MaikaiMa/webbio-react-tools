import * as vscode from "vscode";
import * as path from "path";

const cleanPath = (path: string): string => {
	const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri
		.fsPath;
	const splitPath = path.split(projectRoot);

	if (path === projectRoot) {
		return "/";
	}

	if (!splitPath[1]) {
		return path;
	}

	return splitPath[1];
};

const getActiveDirectory = (fallback?: string): string => {
	const directory = fallback || "/";

	// Active file
	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor) {
		const fileUri = activeEditor.document.uri;

		if (fileUri.scheme === "file") {
			const directoryPath = path.dirname(fileUri.fsPath);
			return cleanPath(directoryPath);
		}
	}

	// fallback to root
	return cleanPath(directory);
};

export default getActiveDirectory;
