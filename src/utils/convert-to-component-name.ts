export const convertToComponentName = (name: string): string => {
	const array = name.split(/-|_/g);
	const capital = array.map(
		(item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
	);
	const capitalString = capital.join("");

	return capitalString;
};

export default convertToComponentName;
