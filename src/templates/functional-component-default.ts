export default (componentName: string) => {
	return `import React from 'react';

export type ${componentName}Props = {};

const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<{...rest}>

		</>
	);
};

export default ${componentName};
  `;
};
