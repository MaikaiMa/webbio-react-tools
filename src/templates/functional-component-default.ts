export default (componentName: string) => {
	return `import React from 'react';

export type TestComponentProps = React.PropsWithChildren;

const ${componentName}: ReactComponent<${componentName}Props> = () => {
	return (
		<>

		</>
	);
};

export default ${componentName};
  `;
};
