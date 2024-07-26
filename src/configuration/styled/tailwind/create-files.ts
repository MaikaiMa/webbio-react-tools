import createFile from "@/utils/create-file";
import { COMPONENT_FILE_EXTENSION, INDEX_FILE_EXTENSION } from "@/constants/file-extensions";

import functionalComponentStyled from "./templates/functional-component-file";
import indexFileStyled from "./templates/index-file";

const createFiles = async (
	directoryWithFileName: string,
	fileName: string,
	componentName: string,
	htmlElement: { value: string; label: string },
	directive?: string
) => {
	const INDEX_FILE_NAME = ["index", INDEX_FILE_EXTENSION].join("");
	const COMPONENT_FILE_NAME = [fileName, COMPONENT_FILE_EXTENSION].join("");

	const filePath = (name: string) => [directoryWithFileName, name].join("/");

	await createFile(
		filePath(COMPONENT_FILE_NAME),
		functionalComponentStyled(componentName, htmlElement.value),
		directive
	);

	await createFile(filePath(INDEX_FILE_NAME), indexFileStyled(fileName, componentName));
};

export default createFiles;
