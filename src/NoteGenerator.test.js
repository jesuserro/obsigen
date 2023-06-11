const { NoteGenerator } = require('./NoteGenerator');

test('should return "Hello, World!"', () => {
  const generator = new NoteGenerator(/* pass the required parameters */);
  const result = generator.getHelloWorld();
  expect(result).toBe('Hello, World!');
});

