export default (componentName: string) => {
	return `export * from './${componentName}';
export { default as ${componentName} } from './${componentName}';
  `;
};
