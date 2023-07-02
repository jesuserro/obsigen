export interface iYaml {
  title: string;
  aliases: string[];
  date: Date;
  creation: Date; 
  updated: Date;
  urls: string[];
	icon: string;
	image: string;
  author: string[]; 
  people: string[];
  parent: string[];
  children: string[];
  tags: string[];
  locations: string[];
  rating: number | "";
  emotion: number | "";
} 

export const DATA_YAML_DEFAULT: iYaml = {
	title: '',
  aliases: [],
	date: new Date(),
	creation: new Date(),
	updated: new Date(),
	urls: [],
	icon: '',
	image: '',
	author: [],
	people: [],
	parent: [],
	children: [],
	tags: [],
	locations: [],
	rating: '',
	emotion: ''
};

export const DATA_YAML_SAMPLE: iYaml = {
	title: 'Note Title',
  aliases: ['alias1', 'alias2'],
	date: new Date(),
	creation: new Date(),
	updated: new Date(),
	icon: '',
	image: '',
	urls: ['https://example.com/note'],
	author: ['Paco López'],
	people: ['Jane Smithers'],
	parent: ['parent1', 'parent2'],
	children: ['child1', 'child2'],
	tags: ['tag1', 'tag2'],
	locations: ['location1', 'location2'],
	rating: 0,
	emotion: 10
};