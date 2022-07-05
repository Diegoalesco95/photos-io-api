import { Request, Response } from 'express';

import { PostModel } from '@models/post.model';
import PostService from '@services/post.services';
import { FileUpload } from '@interfaces/file-upload.interface';
import FileSystem from '@helpers/fileSystem';

const postService = new PostService(PostModel);
const fileSystem = new FileSystem();

export async function createPost(req: Request | any, res: Response) {
	const { message, coords } = req.body;
	const { id } = req.user;

	const images = fileSystem.moveTempFiles(id);

	const {
		response,
		status,
		message: messageDB,
	} = await postService.insert({
		coords,
		imgs: images,
		message,
		user: id,
	});

	if (status === 200 && response) {
		res.status(status).json({
			response,
		});
	} else {
		res.status(status).json({ message: messageDB });
	}
}

export async function getImage(req: Request, res: Response) {
	const { userId, imgId } = req.params;
	const imagePath = fileSystem.getImagePath(userId, imgId);
	const imgExist = fileSystem.getImageExist(imagePath);

	if (!imgExist) {
		return res.status(404).json({ message: 'Image not found' });
	}

	res.sendFile(imagePath);
}

export async function getPosts(req: Request | any, res: Response) {
	const { page } = req.query;

	const skip = ((Number(page) || 1) - 1) * 10;

	const { response, status, message } = await postService.getPosts(skip);

	if (status === 200 && response) {
		res.status(status).json({
			count: response.length,
			page: Number(page) || 1,
			posts: response,
		});
	} else {
		res.status(status).json({ message });
	}
}

export async function uploadFile(req: Request | any, res: Response) {
	try {
		const { id } = req.user;
		const { files } = req;

		if (!files) {
			return res.status(400).json({ message: 'No files were uploaded.' });
		}

		const file: FileUpload = files.image;

		if (!file) {
			return res.status(400).json({ message: 'No image was uploaded.' });
		}

		if (!file.mimetype.startsWith('image')) {
			return res
				.status(400)
				.json({ message: 'The uploaded file is not an image.' });
		}

		await fileSystem.saveTempFile(file, id);

		return res.status(200).json({ file: file.name });
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
}
