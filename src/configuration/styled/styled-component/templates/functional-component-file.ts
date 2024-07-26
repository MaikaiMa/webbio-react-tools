export default (fileName: string, componentName: string, htmlType: string) => {
	return `import React from 'react';
import * as Styles from './${fileName}.styles';

export type ${componentName}Props = ${htmlType} & {};

const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<Styles.Wrapper {...rest}>

		</Styles.Wrapper>
	);
};

export default ${componentName};
  `;
};
