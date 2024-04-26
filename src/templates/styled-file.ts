export default (fileName: string, componentName: string, htmlTag: string) => {
	return `import styled from 'styled-components';
import { ${componentName}Props } from './${fileName}';

export const Wrapper = styled.${htmlTag}<${componentName}Props>\`\`;
  `;
};
