module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files
    },
    moduleFileExtensions: ['js', 'jsx'], // Include JavaScript and JSX extensions
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'], // Ignore specific paths
  };
  