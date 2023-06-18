export interface iYaml {
  aliases: string[];
  title: string;
  date: Date;
  creation: Date; 
  updated: Date;
  url: string;
  author: string; 
  people: string;
  parent: string[];
  tags: string[];
  locations: string[];
  rating: number;
  emotion: number;
} 

export const DATA_YAML: iYaml = {
	aliases: ['alias1', 'alias2'],
	title: 'Note Title',
	date: new Date(),
	creation: new Date(),
	updated: new Date(),
	url: 'https://example.com/note',
	author: 'Paco López',
	people: 'Jane Smithers',
	parent: ['parent1', 'parent2'],
	tags: ['tag1', 'tag2'],
	locations: ['location1', 'location2'],
	rating: 7,
	emotion: 8,
};