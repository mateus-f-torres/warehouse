module.exports = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/tl.setup.js'],
  testPathIgnorePatterns: ['tl.setup.js'],
  moduleNameMapper: {
    '\\.(css|sass|scss|less)$': '<rootDir>/__mocks__/styleStub.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/imageStub.js',
  },
}
