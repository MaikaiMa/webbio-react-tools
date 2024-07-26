import { BASE_OPTIONS } from "./base-options";
import { FORM_OPTIONS } from "./form-options";
import { LIST_OPTIONS } from "./list-options";
import { MEDIA_OPTIONS } from "./media-options";
import { META_OPTIONS } from "./meta-options";
import { OTHER_OPTIONS } from "./other-options";
import { SECTION_OPTIONS } from "./section-options";
import { TABLE_OPTIONS } from "./table-options";
import { TYPOGRAPHY_OPTIONS } from "./typography-options";

export type ElementOptions = {
	label: string;
	alwaysShow: true;
	description: string;
	value: string;
};

const ELEMENT_OPTIONS: ElementOptions[] = [
	...BASE_OPTIONS,
	...SECTION_OPTIONS,
	...TYPOGRAPHY_OPTIONS,
	...LIST_OPTIONS,
	...TABLE_OPTIONS,
	...FORM_OPTIONS,
	...MEDIA_OPTIONS,
	...OTHER_OPTIONS,
	...META_OPTIONS,
];

export default ELEMENT_OPTIONS;
