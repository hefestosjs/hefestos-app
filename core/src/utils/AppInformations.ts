import { join } from "node:path";
import { isProd } from "../global";

const AppInformations = {
	isProd,
	path: join(process.cwd(), isProd),
};

export default AppInformations;
