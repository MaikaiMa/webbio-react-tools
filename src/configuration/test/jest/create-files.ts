import createFile from "@/utils/create-file";
import storyFile from "./templates/test-file";
import { TEST_FILE_EXTENSION } from "@/constants/file-extensions";

const createFiles = async (
	directoryWithFileName: string,
	fileName: string,
	componentName: string
) => {
	const TEST_FILE_NAME = [fileName, TEST_FILE_EXTENSION].join("");
	const filePath = (name: string) => [directoryWithFileName, name].join("/");
	await createFile(filePath(TEST_FILE_NAME), storyFile(componentName));
};

export default createFiles;
