export default class ConfigStates {
	private static instance: ConfigStates;
	// private root_path: string = "";

	private constructor() {}

	static getInstance(): ConfigStates {
		if (!ConfigStates.instance) {
			ConfigStates.instance = new ConfigStates();
		}

		return ConfigStates.instance;
	}

	// setRootPath(root_path: string): void {
	//   this.root_path = root_path;
	// }

	// getRootPath(): string {
	//   return this.root_path;
	// }
}
