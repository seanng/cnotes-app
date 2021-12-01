// https://nextjs.org/docs/testing#jest-and-react-testing-library
// https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
// https://github.com/vercel/next.js/blob/canary/examples/with-typescript-eslint-jest/jest.config.js

module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleDirectories: ['node_modules', '.'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '\\.(jpg|jpeg|gif|ttf|eot|svg|png)$':
      '<rootDir>/test/__mocks__/fileMock.js',
  },
}
