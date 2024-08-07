import createFile from "@/utils/create-file";
import { ElementOptions } from "@/constants/element-options";
import { INDEX_FILE_EXTENSION, COMPONENT_FILE_EXTENSION } from "@/constants/file-extensions";

import indexFile from "./templates/index-file";
import functionalComponentFile from "./templates/functional-component-default";
import functionalComponentHtmlFile from "./templates/functional-component-html";

const createFiles = async (
	directoryWithFileName: string,
	fileName: string,
	componentName: string,
	htmlElement: ElementOptions,
	directive: string
) => {
	const INDEX_FILE_NAME = ["index", INDEX_FILE_EXTENSION].join("");
	const COMPONENT_FILE_NAME = [fileName, COMPONENT_FILE_EXTENSION].join("");

	const filePath = (name: string) => [directoryWithFileName, name].join("/");
	await createFile(filePath(INDEX_FILE_NAME), indexFile(fileName, componentName));

	if (!!htmlElement && !!htmlElement.value && htmlElement.value !== "fragment") {
		await createFile(
			filePath(COMPONENT_FILE_NAME),
			functionalComponentHtmlFile(componentName, htmlElement.value, htmlElement.label),
			directive
		);
	} else {
		await createFile(
			filePath(COMPONENT_FILE_NAME),
			functionalComponentFile(componentName),
			directive
		);
	}
};

export default createFiles;
