export const useDirectiveTemplate = (content: string, directive = "") =>
	directive !== ""
		? `"${directive}";

${content}`
		: content;
