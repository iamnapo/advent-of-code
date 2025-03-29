import eslintConfigIamnapo from "eslint-config-iamnapo";

const config = eslintConfigIamnapo.configs.default.map((cfg) => ({
	...cfg,
	files: [eslintConfigIamnapo.filePatterns.default],
}));

export default config;
