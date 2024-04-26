import * as fs from "fs";
import * as path from "path";

export const createDirectory = (targetDirectory: string) => {
	const separator = path.sep;
	const initialDirectory = path.isAbsolute(targetDirectory) ? separator : "";
	const baseDirectory = __dirname;

	return targetDirectory
		.split(separator)
		.reduce((parentDirectory, childDirectory) => {
			const currentDirectory = path.resolve(
				baseDirectory,
				parentDirectory,
				childDirectory
			);

			try {
				fs.mkdirSync(currentDirectory);
			} catch (error: any) {
				if (error.code === "EEXIST") {
					return currentDirectory;
				}

				if (error.code === "ENOENT") {
					throw new Error(
						`EACCES: permission denied, mkdir '${parentDirectory}'`
					);
				}

				const caughtErr =
					["EACCES", "EPERM", "EISDIR"].indexOf(error.code) > -1;

				if (
					!caughtErr ||
					(caughtErr &&
						currentDirectory === path.resolve(targetDirectory))
				) {
					throw error;
				}
			}

			return currentDirectory;
		}, initialDirectory);
};

export default createDirectory;
