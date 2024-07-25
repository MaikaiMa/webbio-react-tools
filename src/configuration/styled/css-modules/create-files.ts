import createFile from "../../../utils/create-file";

import functionalComponentScss from "./templates/functional-component-file";
import styledFile from "./templates/styled-file";
import indexFileScss from "./templates/index-file";

import {
	COMPONENT_FILE_EXTENSION,
	INDEX_FILE_EXTENSION,
	SCSS_FILE_EXTENSION,
} from "../../../constants/file-extensions";

const createFiles = async (
	directoryWithFileName: string,
	fileName: string,
	componentName: string,
	htmlElement: { value: string; label: string }
) => {
	const INDEX_FILE_NAME = ["index", INDEX_FILE_EXTENSION].join("");
	const STYLED_FILE_NAME = [fileName, SCSS_FILE_EXTENSION].join("");
	const COMPONENT_FILE_NAME = [fileName, COMPONENT_FILE_EXTENSION].join("");

	const filePath = (name: string) => [directoryWithFileName, name].join("/");

	await createFile(
		filePath(INDEX_FILE_NAME),
		indexFileScss(fileName, componentName)
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

	await createFile(filePath(STYLED_FILE_NAME), styledFile());
};

export default createFiles;
