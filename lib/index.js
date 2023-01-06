const requireIndex = require('requireindex');
const path = require('path');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));

module.exports.configs = {
  recommended: {
    plugins: [
      '@gingerhendrix/react-intl'
    ],
    rules: {
      '@gingerhendrix/react-intl/id-missing': 2,
      '@gingerhendrix/react-intl/id-prefix': [0, []],
      '@gingerhendrix/react-intl/no-default': 2
    },
    settings: {
      localeFiles: ['locales/en-US.json']
    }
  }
};
