// src/core/notes/__mocks__/obsidian.ts

export const App = {};

export class Notice {}

export class TFile {
  path: string;

  constructor(path = '') {
    this.path = path;
  }
}
