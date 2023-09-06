import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
	/**
	 * Makes env configs available for your app
	 * throughout the app's runtime
	 */
	public static config(){
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const port = process.env.PORT;
		const mongooseUrl = process.env.MONGODB_URL;
		const year = (new Date()).getFullYear();
		const copyright = `Copyright Akshay Jain @ ${year} | All Rights Reserved`;
		const description = process.env.APP_DESCRIPTION;
		const isCORSEnabled = process.env.CORS_ENABLED || true;
		if(!port){
			console.error('Insufficient env params')
			process.exit(1);
		}
		return {
			copyright,
			description,
			isCORSEnabled,
			mongooseUrl,
			port,
		};
	}
}

export default Locals;