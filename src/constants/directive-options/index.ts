import { ElementOptions } from "../element-options";

const DIRECTIVE_OPTIONS: ElementOptions[] = [
	{
		label: "None",
		alwaysShow: true,
		description: "Don't add a directive",
		value: "",
	},
	{
		label: "Client",
		alwaysShow: true,
		description: "Client directive (use client)",
		value: "use client",
	},
	{
		label: "Server",
		alwaysShow: true,
		description: "Server directive (use server)",
		value: "use server",
	},
	{
		label: "Strict",
		alwaysShow: true,
		description: "Strict directive (use strict)",
		value: "use strict",
	},
];

export default DIRECTIVE_OPTIONS;
