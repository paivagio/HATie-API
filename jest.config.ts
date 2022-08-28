const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  preset: "ts-jest",
  testMatch: ["**/**/*.spec.ts"],
  //moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  moduleDirectories: [
    "<rootDir>",
    "node_modules"
  ],
  globalTeardown: "./src/utils/scripts/databaseCleaner.ts"
};
