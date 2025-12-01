import { defineConfig } from "eslint/config";
import eslintConfigIamnapo from "eslint-config-iamnapo";

const config = defineConfig([
	{
		files: [eslintConfigIamnapo.filePatterns.default],
		extends: [eslintConfigIamnapo.configs.default],
	},
	{
		files: [eslintConfigIamnapo.filePatterns.typescript],
		extends: [eslintConfigIamnapo.configs.typescript],
	},
]);

export default config;
