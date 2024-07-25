export default (componentName: string) => {
	return `import React from 'react';
import renderer from 'react-test-renderer';
import ${componentName} from './${componentName}';
  
describe('${componentName}', () => {
	it("renders correctly", () => {
		const tree = renderer.create(<${componentName} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
    `;
};
