module.exports = {
    preset: 'jest-puppeteer',
      testRegex: './*\\.(test|spec)\\.js$',
      setupFilesAfterEnv: [
          "<rootDir>jest.init.js"
      ],
    } 