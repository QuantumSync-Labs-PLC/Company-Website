module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/scripts/test/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/scripts/test/styleMock.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/scripts/test/fileMock.js",
  },
};
