// // we always make sure 'react-native' gets included first
// import * as ReactNative from 'react-native';

// import '@testing-library/jest-dom';

// // libraries to mock
// jest.doMock('react-native', () => {
//   // Extend ReactNative
//   return Object.setPrototypeOf(
//     {
//       Image: {
//         ...ReactNative.Image,
//         resolveAssetSource: jest.fn(_source => ({
//           height: 100,
//           width: 100,
//           scale: 2.0,
//           uri: 'https://placekitten.com/200/200',
//         })),
//         getSize: jest.fn(
//           (
//             uri: string,
//             success: (width: number, height: number) => void,

//             failure?: (_error: any) => void // eslint-disable-line @typescript-eslint/no-unused-vars
//           ) => success(100, 100)
//         ),
//       },
//     },
//     ReactNative
//   );
// });

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// // jest.mock('i18n-js', () => ({
// //   currentLocale: () => 'en',
// //   t: (key: string, params: Record<string, string>) => {
// //     return `${key} ${JSON.stringify(params)}`;
// //   },
// // }));

// jest.useFakeTimers();
