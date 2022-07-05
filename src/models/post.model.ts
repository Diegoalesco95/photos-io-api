import { model, Schema } from 'mongoose';
import { IPost } from '@interfaces/post.interface';

const postSchema = new Schema({
	createdAt: {
		type: Date,
	},
	message: {
		type: String,
	},
	imgs: [
		{
			type: String,
		},
	],
	coords: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required'],
	},
});

postSchema.pre('save', function (next) {
	this.createdAt = new Date();
	next();
});

export const PostModel = model<IPost>('Post', postSchema);
