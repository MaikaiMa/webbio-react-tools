export default (componentName: string) => {
	return `import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import ${componentName} from './${componentName}';

export default {
	title: 'Components/${componentName}',
	component: ${componentName}
} as Meta;

export const Default = () => <${componentName} />;

Default.parameters = {
	title: '${componentName}',
	subtitle: ''
};
      `;
};
