export default (componentName: string, htmlType: string, htmlTag: string) => {
	return `import React from 'react';

export type ${componentName}Props = ${htmlType};

const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<${htmlTag} {...rest}>

		</${htmlTag}>
	);
};

export default ${componentName};
`;
};
