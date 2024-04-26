export default (componentName: string, htmlType: string, htmlTag: string) => {
	return `import { type HTMLAttributes } from 'react';

export type ${componentName}Props = HTMLAttributes<${htmlType}>;

export const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<${htmlTag} {...rest}>

		</${htmlTag}>
	);
};

export default ${componentName};
`;
};
