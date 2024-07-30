export default (fileName: string, componentName: string) => {
	return `export * from './${fileName}';
export { default as ${componentName} } from './${fileName}';
export { default } from './${fileName}';
  `;
};
