import { Daily } from './daily/Daily';
import { Favorites } from './favorites/Favorites';
import { Yearly } from './yearly/Yearly';

describe('generators using DATA_YAML_DEFAULT', () => {
  test.each([
    ['Daily', () => {
      const generator = new Daily({} as any);
      generator.setYaml();
      return generator.yaml;
    }],
    ['Yearly', () => {
      const generator = new Yearly({} as any);
      generator.setYaml(2024);
      return generator.yaml;
    }],
    ['Favorites', () => {
      const generator = new Favorites({} as any);
      generator.setYaml();
      return generator.yaml;
    }],
  ])('%s serializes inherited null duration as an empty value', (_name, serialize) => {
    const durationLine = serialize()
      .split('\n')
      .find((line) => line.startsWith('duration:'));

    expect(durationLine).toBe('duration: ');
  });
});
