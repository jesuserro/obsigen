import { renderToString } from 'react-dom/server';
import { iYaml } from './../interface/iYaml';
import { Yaml } from './Yaml';

function renderYaml(data: Partial<iYaml>): string {
  const rendered = renderToString(Yaml({ data: data as iYaml }));

  return rendered.replace(/&quot;/g, '"').replace(/<!-- -->/g, '');
}

describe('Yaml', () => {
  test('serializes a string', () => {
    expect(renderYaml({ title: 'Sample note' })).toBe(
      '---\ntitle: Sample note\n---',
    );
  });

  test.each([
    ['zero', 0],
    ['a positive number', 5],
    ['a negative number', -3],
  ])('serializes %s', (_case, value) => {
    expect(renderYaml({ rating: value })).toBe(
      `---\nrating: ${value}\n---`,
    );
  });

  test.each([true, false])('serializes the boolean %s', (value) => {
    expect(renderYaml({ publish: value })).toBe(
      `---\npublish: ${value}\n---`,
    );
  });

  test('serializes a Date using local date and time components', () => {
    const creation = new Date(2024, 0, 2, 3, 4, 5);

    expect(renderYaml({ creation })).toBe(
      '---\ncreation: 2024-01-02T03:04:05\n---',
    );
  });

  test('serializes an array used by YAML tags', () => {
    expect(renderYaml({ tags: ['status/open', 'type/note'] })).toBe(
      '---\ntags: [status/open, type/note]\n---',
    );
  });

  test('serializes undefined as an empty property value', () => {
    expect(renderYaml({ description: undefined })).toBe(
      '---\ndescription: \n---',
    );
  });

  test('serializes an empty string as an empty property value', () => {
    expect(renderYaml({ title: '' })).toBe(
      '---\ntitle: \n---',
    );
  });

  test('serializes null as an empty property value', () => {
    expect(renderYaml({ duration: null })).toBe(
      '---\nduration: \n---',
    );
  });
});
