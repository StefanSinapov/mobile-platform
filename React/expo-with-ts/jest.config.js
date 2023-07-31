﻿const { defaults: tsjPreset } = require('ts-jest/presets');
/** @type {import('jest').Config} */

const config = {
  ...tsjPreset,
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/test/setup.ts'],
};

module.exports = config;
