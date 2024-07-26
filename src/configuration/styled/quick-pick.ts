import * as vscode from "vscode";

import { EXTENSION_KEY } from "../../constants/extension-key";
import { STYLED_COMPONENT_OPTION_KEY } from "./styled-component/constants";
import { TAILWIND_OPTION_KEY } from "./tailwind/constants";
import { CSS_MODULES_OPTION_KEY } from "./css-modules/constants";
import { ElementOptions } from "../../constants/element-options/index";

const styledOptionQuickPick = async (): Promise<ElementOptions | undefined | null> => {
	const styleOptions = [];

	const useStyledComponents = await vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(STYLED_COMPONENT_OPTION_KEY);

	const useTailwindComponents = await vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(TAILWIND_OPTION_KEY);

	const useCssModules = await vscode.workspace
		.getConfiguration(EXTENSION_KEY)
		.get<boolean>(CSS_MODULES_OPTION_KEY);

	if (useStyledComponents) {
		styleOptions.push({
			label: "Styled component",
			alwaysShow: true,
			description: "Use styled components styling file",
			value: "sc",
		});
	}

	if (useTailwindComponents) {
		styleOptions.push({
			label: "Tailwind",
			alwaysShow: true,
			description: "Use tailwind styling file",
			value: "tw",
		});
	}

	if (useCssModules) {
		styleOptions.push({
			label: "CSS Module",
			alwaysShow: true,
			description: "Uses SCSS file as CSS module",
			value: "css",
		});
	}

	if (styleOptions.length === 0) {
		return null;
	}

	if (styleOptions.length === 1) {
		return styleOptions[0];
	}

	return await vscode.window.showQuickPick(styleOptions, {
		ignoreFocusOut: true,
		canPickMany: false,
		placeHolder: "Use CSS module or styled component?",
	});
};

export default styledOptionQuickPick;
