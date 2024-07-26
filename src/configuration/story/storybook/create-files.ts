import createFile from "@/utils/create-file";
import storyFile from "./templates/story-file";
import { STORY_FILE_EXTENSION } from "@/constants/file-extensions";

const createFiles = async (
	directoryWithFileName: string,
	fileName: string,
	componentName: string
) => {
	const STORY_FILE_NAME = [fileName, STORY_FILE_EXTENSION].join("");
	const filePath = (name: string) => [directoryWithFileName, name].join("/");
	await createFile(filePath(STORY_FILE_NAME), storyFile(componentName));
};

export default createFiles;
