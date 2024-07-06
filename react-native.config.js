// react-native.config.js
module.exports = {
    dependencies: {
      ...(process.env.CI ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
    },
    project: {
      ios: {},
      android: {},
    },
  };