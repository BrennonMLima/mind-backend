import { Users } from '../models/user.model'
import { Multer } from 'multer';

declare global {
	namespace Express {
		export interface Request {
			user?: Partial<Users>
		}
	}
}

declare global {
	namespace Express {
		interface Request {
			file?: Multer.File;
		}
	}
}