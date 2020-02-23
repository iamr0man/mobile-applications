module.exports = {
    // config for a library is scoped under "dependency" key
    dependency: {
      platforms: {
        ios: {},
        android: {}, // projects are grouped into "platforms"
      },
      assets: ["resources/fonts"], // stays the same
      // hooks are considered anti-pattern, please avoid them
      'react-native-android-location-enabler':{
        platforms: {
            android: null, // disable Android platform, other platforms will still autolink if provided
        },
      }
    },
  };