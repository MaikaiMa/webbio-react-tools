export default (
	fileName: string,
	componentName: string,
	htmlType: string,
	htmlTag: string
) => {
	return `import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './${fileName}.module.scss';

export type ${componentName}Props = HTMLAttributes<${htmlType}>;

const ${componentName}: ReactComponent<${componentName}Props> = ({ className, ...rest }) => {
	return (
		<${htmlTag} {...rest} className={clsx(styles.wrapper, className || "")}>

		</${htmlTag}>
	);
};

export default ${componentName};
  `;
};
