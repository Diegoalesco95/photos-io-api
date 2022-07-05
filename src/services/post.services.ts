import { IPostResponse, IRequestPost } from '@interfaces/post.interface';
import { PostModel } from '@models/post.model';

class PostService {
	postModel: typeof PostModel;

	constructor(private model: typeof PostModel) {
		this.postModel = model;
	}

	async insert(post: IRequestPost): Promise<IPostResponse> {
		try {
			const postDB = await this.postModel.create(post);
			const newPost = await postDB.populate('user', '-password');

			return {
				status: 200,
				response: newPost,
			};
		} catch (err: any) {
			return {
				status: 500,
				message: err.message as string,
			};
		}
	}

	async getPosts(skip: number): Promise<any> {
		try {
			const posts = await this.postModel
				.find()
				.skip(skip)
				.sort({ _id: -1 })
				.limit(10)
				.populate('user', '-password');

			return {
				status: 200,
				response: posts,
			};
		} catch (err: any) {
			return {
				status: 500,
				message: err.message as string,
			};
		}
	}
}

export default PostService;
