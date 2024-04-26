export default (componentName: string) => {
	return `import React from 'react';

export type ${componentName}Props = {};

export const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<div {...rest}>

		</div>
	);
};

export default ${componentName};
  `;
};
