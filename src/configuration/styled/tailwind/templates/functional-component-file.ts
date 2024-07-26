export default (componentName: string, htmlType: string) => {
	return `import { cn } from '~/lib/utils/cn';
	
export type ${componentName}Props = ${htmlType} & {};

export const ${componentName}: ReactComponent<${componentName}Props> = ({ className, ...rest }) => {
	return (
		<div className={cn('', className)} {...rest}>

		</div>
	);
};

export default ${componentName};
  `;
};
