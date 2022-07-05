import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

import { FileUpload } from '@interfaces/file-upload.interface';

class FileSystem {
	constructor() {}

	getImageExist(imagePath: string) {
		return fs.existsSync(imagePath);
	}

	getImagePath(userId: string, imgId: string) {
		const imagePath = path.resolve(
			__dirname,
			'../../uploads/',
			userId,
			'posts',
			imgId,
		);

		return imagePath;
	}

	moveTempFiles(userId: string) {
		const userTempPath = path.resolve(
			__dirname,
			'../../uploads/',
			userId,
			'temp',
		);
		const postPath = path.resolve(
			__dirname,
			'../../uploads/',
			userId,
			'posts',
		);

		if (!fs.existsSync(userTempPath)) {
			return [];
		}

		if (!fs.existsSync(postPath)) {
			fs.mkdirSync(postPath);
		}

		const tempImages = this.getTempImages(userId);

		tempImages.forEach((image) => {
			// fs.renameSync(`${userTempPath}/${image}`, `${postPath}/${image}`);
			fs.renameSync(
				path.resolve(userTempPath, image),
				path.resolve(postPath, image),
			);
		});

		return tempImages;
	}

	saveTempFile(file: FileUpload, userId: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const path = this.createFolder(userId);
			const fileName = this.generateFileName(file.name);

			file.mv(`${path}/${fileName}`, (err: any) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	private createFolder(userId: string) {
		const userPath = path.resolve(__dirname, '../../uploads/', userId);
		const userTempPath = userPath + '/temp';

		const exist = fs.existsSync(userPath);

		if (!exist) {
			fs.mkdirSync(userPath);
			fs.mkdirSync(userTempPath);
		}

		return userTempPath;
	}

	private generateFileName(fileName: string) {
		const fileNameArray = fileName.split('.');
		const fileExtension = fileNameArray[fileNameArray.length - 1];
		const id = uniqid();

		return `${id}.${fileExtension}`;
	}

	private getTempImages(userId: string) {
		const userTempPath = path.resolve(
			__dirname,
			'../../uploads/',
			userId,
			'temp',
		);

		return fs.readdirSync(userTempPath) || [];
	}
}

export default FileSystem;
