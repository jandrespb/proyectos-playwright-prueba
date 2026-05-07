module.exports = {
  default: {
    require: [
      'src/tests/step-definitions/**/*.ts',
      'src/tests/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'allure-cucumberjs/reporter',
      'progress-bar'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    paths: ['src/tests/features/**/*.feature']
  }
}