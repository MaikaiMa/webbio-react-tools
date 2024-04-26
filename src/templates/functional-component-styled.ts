export default (fileName: string, componentName: string, htmlType: string) => {
	return `import { HTMLAttributes } from 'react';
import * as Styles from './${fileName}.styles';

export type ${componentName}Props = HTMLAttributes<${htmlType}>;

const ${componentName}: ReactComponent<${componentName}Props> = ({ ...rest }) => {
	return (
		<Styles.Wrapper {...rest}>

		</Styles.Wrapper>
	);
};

export default ${componentName};
  `;
};
