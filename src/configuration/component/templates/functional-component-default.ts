export default (componentName: string) => {
	return `import React from 'react';

export type ${componentName}Props = React.PropsWithChildren;

const ${componentName}: ReactComponent<${componentName}Props> = () => {
	return (
		<>

		</>
	);
};

export default ${componentName};
  `;
};
