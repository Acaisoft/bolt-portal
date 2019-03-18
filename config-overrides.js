/* eslint-disable no-param-reassign */
const path = require('path')

const dirAliases = [
  'assets',
  'components',
  'containers',
  'layout',
  'pages',
  'services',
  'utils',
]

module.exports = {
  jest(config) {
    /**
     * Jest doesn't know about webpack config above,
     * so we need to tell him how to map custom import paths.
     */
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      [`^~(${dirAliases.join('|')})(.*)$`]: '<rootDir>/src/$1$2',
    }

    config.coveragePathIgnorePatterns = [
      '/node_modules/',
      '/src/(index|serviceWorker|setupTests).js',
      '/src/layout/theme.js',
      '/src/(.+)/index.js',
      '.*\\.(styles|mock)\\.js',
    ]

    /**
     * Configures the required coverage threshold.
     * If not satisfied, unit tests fail.
     */
    // config.coverageThreshold = {
    //   global: {
    //     branches: 60,
    //     functions: 60,
    //     lines: 60,
    //     statements: 60,
    //   },
    // }

    return config
  },
  webpack(config) {
    /**
     * Aliases for imports to prevent ../../ hell.
     * Also, makes moving things around effortless.
     */
    const rootDir = path.dirname('')
    const dirs = dirAliases.reduce(
      (acc, dir) => ({
        ...acc,
        [`~${dir}`]: path.resolve(rootDir, `src/${dir}/`),
      }),
      {}
    )

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve || {}).alias,
        ...dirs,
      },
    }
    return config
  },
}
