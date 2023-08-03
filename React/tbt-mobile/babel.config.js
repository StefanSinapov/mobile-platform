module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',

      [
        /** Enables baseUrl: "./" option in tsconfig.json to work @see https://github.com/entwicklerstube/babel-plugin-root-import */
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathPrefix: '@/',
              rootPathSuffix: 'src',
            },
          ],
        },
      ],
    ],
  };
};
