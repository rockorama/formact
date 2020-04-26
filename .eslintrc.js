module.exports = {
  extends: [
    'mainframe',
    'mainframe/flow',
    'mainframe/jest',
    'mainframe/react-native-web',
  ],
  rules: {
    'react-native/no-raw-text': 'off',
    'react/no-unescaped-entities': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'default-case': 'off',
  },
  settings: {
    react: {
      version: '16.13.1',
      flowVersion: '0.119.1',
    },
  },
}
