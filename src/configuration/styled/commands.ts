import * as vscode from "vscode";
import { handleCreateComponent } from "../../extension";

const commands = [
	vscode.commands.registerCommand("react-tools.create-styled-component", (args) => {
		handleCreateComponent(args, true);
	}),
];

export default commands;
