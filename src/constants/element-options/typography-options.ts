import { ElementOptions } from ".";

export const TYPOGRAPHY_BASE_OPTIONS: ElementOptions[] = [
	{
		label: "h1",
		alwaysShow: true,
		description: "Heading 1 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "h2",
		alwaysShow: true,
		description: "Heading 2 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "h3",
		alwaysShow: true,
		description: "Heading 3 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "h4",
		alwaysShow: true,
		description: "Heading 4 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "h5",
		alwaysShow: true,
		description: "Heading 5 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "h6",
		alwaysShow: true,
		description: "Heading 6 element (HTMLHeadingElement)",
		value: "React.HTMLAttributes<HTMLHeadingElement>",
	},
	{
		label: "p",
		alwaysShow: true,
		description: "Paragraph element (HTMLParagraphElement)",
		value: "React.HTMLAttributes<HTMLParagraphElement>",
	},
	{
		label: "strong",
		alwaysShow: true,
		description: "Strong element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "small",
		alwaysShow: true,
		description: "Small element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "s",
		alwaysShow: true,
		description: "Strikethrough element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "b",
		alwaysShow: true,
		description: "Bold element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "em",
		alwaysShow: true,
		description: "Emphasis element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "i",
		alwaysShow: true,
		description: "Italic element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "u",
		alwaysShow: true,
		description: "Underline element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "q",
		alwaysShow: true,
		description: "Quote element (HTMLQuoteElement)",
		value: "React.HTMLAttributes<HTMLQuoteElement>",
	},
	{
		label: "mark",
		alwaysShow: true,
		description: "Mark element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "sub",
		alwaysShow: true,
		description: "Subscript element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "sup",
		alwaysShow: true,
		description: "Superscript element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "time",
		alwaysShow: true,
		description: "Time element (HTMLTimeElement)",
		value: "React.TimeHTMLAttributes<HTMLTimeElement>",
	},
	{
		label: "wbr",
		alwaysShow: true,
		description: "Word break opportunity element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "blockquote",
		alwaysShow: true,
		description: "Blockquote element (HTMLQuoteElement)",
		value: "React.BlockquoteHTMLAttributes<HTMLQuoteElement>",
	},
	{
		label: "abbr",
		alwaysShow: true,
		description: "Abbreviation element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "kbd",
		alwaysShow: true,
		description: "Keyboard element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "cite",
		alwaysShow: true,
		description: "Citation element (HTMLQuoteElement)",
		value: "React.HTMLAttributes<HTMLQuoteElement>",
	},
	{
		label: "code",
		alwaysShow: true,
		description: "Code element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "address",
		alwaysShow: true,
		description: "Address element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "br",
		alwaysShow: true,
		description: "Line break element (HTMLBRElement)",
		value: "React.HTMLAttributes<HTMLBRElement>",
	},
	{
		label: "hr",
		alwaysShow: true,
		description: "Horizontal rule element (HTMLHRElement)",
		value: "React.HTMLAttributes<HTMLHRElement>",
	},
	{
		label: "pre",
		alwaysShow: true,
		description: "Preformatted text element (HTMLPreElement)",
		value: "React.HTMLAttributes<HTMLPreElement>",
	},
];

export const TYPOGRAPHY_EXTENDED_OPTIONS: ElementOptions[] = [
	{
		label: "bdi",
		alwaysShow: true,
		description: "Bi-directional isolation element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "bdo",
		alwaysShow: true,
		description: "Bi-directional override element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "dfn",
		alwaysShow: true,
		description: "Definition element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "samp",
		alwaysShow: true,
		description: "Sample element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "var",
		alwaysShow: true,
		description: "Variable element (HTMLElement)",
		value: "React.HTMLAttributes<HTMLElement>",
	},
	{
		label: "ins",
		alwaysShow: true,
		description: "Inserted text element (HTMLModElement)",
		value: "React.InsHTMLAttributes<HTMLModElement>",
	},
	{
		label: "del",
		alwaysShow: true,
		description: "Deleted text element (HTMLModElement)",
		value: "React.DelHTMLAttributes<HTMLModElement>",
	},
];

export const TYPOGRAPHY_OPTIONS: ElementOptions[] = [
	...TYPOGRAPHY_BASE_OPTIONS,
	...TYPOGRAPHY_EXTENDED_OPTIONS,
];
