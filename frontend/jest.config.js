module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  // Remove transformIgnorePatterns to allow all node_modules to be transformed
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
