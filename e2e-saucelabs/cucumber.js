module.exports = {
  default: {
    require: [
      'src/tests/step-definitions/**/*.ts',
      'src/tests/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    paths: ['src/tests/features/**/*.feature']
  }
}