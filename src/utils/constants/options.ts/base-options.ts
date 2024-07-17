import { ElementOptions } from ".";

export const BASE_OPTIONS: ElementOptions[] = [
	{
		label: "fragment",
		alwaysShow: true,
		description: "Typeless fragment",
		value: "",
	},
	{
		label: "div",
		alwaysShow: true,
		description: "Div element (HTMLDivElement)",
		value: "React.HTMLAttributes<HTMLDivElement>",
	},
	{
		label: "span",
		alwaysShow: true,
		description: "Span element (HTMLSpanElement)",
		value: "React.HTMLAttributes<HTMLSpanElement>",
	},
	{
		label: "a",
		alwaysShow: true,
		description: "Anchor element (HTMLAnchorElement)",
		value: "React.AnchorHTMLAttributes<HTMLAnchorElement>",
	},
	{
		label: "button",
		alwaysShow: true,
		description: "Button element (HTMLButtonElement)",
		value: "React.ButtonHTMLAttributes<HTMLButtonElement>",
	},
];
