export default (fileName: string, componentName: string) => {
	return `export * from './${fileName}';
export * as ${componentName}Styles from './${fileName}.styles';
export { default as ${componentName} } from './${fileName}';
  `;
};
