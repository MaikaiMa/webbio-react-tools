export default (componentName: string) => {
	return `export * from './${componentName}';
export { default } from './${componentName}';
  `;
};
