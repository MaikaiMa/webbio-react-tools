import { SCSS_FILE_EXTENSION } from "../../../../constants/file-extensions";

export default (fileName: string, componentName: string) => {
	return `export * from './${fileName}';
export * as ${componentName}Styles from './${fileName}${SCSS_FILE_EXTENSION}';
export { default as ${componentName} } from './${fileName}';
export { default } from './${fileName}';
  `;
};
