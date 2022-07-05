export interface FileUpload {
	data: Buffer;
	encoding: string;
	mimetype: string;
	name: string;
	size: number;
	tempFilePath: string;
	truncated: boolean;
	mv: Function;
}
