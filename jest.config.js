/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const tsPreset = require('ts-jest/jest-preset');
const mongoPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...mongoPreset,
  ...tsPreset,
  //preset: 'ts-jest',
  // testEnvironment: 'node',
};
