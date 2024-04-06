export interface iYaml {
	title: string,
	aliases: string[],
	date: String,
	creation: Date, 
	updated: Date,
	links: string[],
	urls: string,
	authors: string[],
	locations: string,
	tags: string[],
	publish: boolean,
	permalink: string, 
	description: string,
	image: string,
	cover: string,
	cssclasses: string[],
	rating: number,
	emotion: number,
	favorite: boolean
} 

export const DATA_YAML_DEFAULT: iYaml = {
	title: '',
	aliases: [],
	date: new Date().toISOString(),
	creation: new Date(), 
	updated: new Date(),
	links: [],
	urls: "",
	authors: [],
	locations: "",
	tags: [],
	publish: false,
	permalink: '', 
	description: '',
	image: '',
	cover: '',
	cssclasses: [],
	rating: 0,
	emotion: 0,
	favorite: false
};

export const DATA_YAML_SAMPLE: iYaml = {
	title: 'Sample note',
	aliases: [],
	date: new Date().toISOString(),
	creation: new Date(), 
	updated: new Date(),
	links: [],
	urls: "",
	authors: [],
	locations: "",
	tags: ['status/open'],
	publish: false,
	permalink: '', 
	description: 'Lorem ipsum dolor sit amet.',
	image: '',
	cover: '',
	cssclasses: [],
	rating: 5,
	emotion: 5,
	favorite: false
};

export interface Review {
	title: string,
	aliases: string[],
    guid: string,
    isbn: string[],
	date: String,
	creation: Date, 
	updated: Date,
	links: string[],
	urls: string,
	authors: string[],
	locations: string,
	tags: string[],
	publish: boolean,
	permalink: string, 
	description: string,
	image: string,
	cover: string,
	cssclasses: string[],
	rating: number,
	emotion: number,
	favorite: boolean
}

export const DATA_YAML_REVIEW_DEFAULT: Review = {
	title: '',
    guid: '',
    isbn: [],
	aliases: [],
	date: new Date().toISOString(),
	creation: new Date(), 
	updated: new Date(),
	links: [],
	urls: "",
	authors: [],
	locations: "",
	tags: [],
	publish: false,
	permalink: '', 
	description: '',
	image: '',
	cover: '',
	cssclasses: [],
	rating: 0,
	emotion: 0,
	favorite: false
};

export interface Book {
	title: string,
	aliases: string[],
    id: string,
    isbn: string[],
    asin: string,
	date: String,
	creation: Date, 
	updated: Date,
	links: string[],
	urls: string,
	authors: string[],
	locations: string,
	tags: string[],
	publish: boolean,
	permalink: string, 
	description: string,
	image: string,
	cover: string,
    num_pages: number,
    average_rating: number,
    ratings_count: number,
	cssclasses: string[],
	rating: number,
	emotion: number,
	favorite: boolean
}

export const DATA_YAML_BOOK_DEFAULT: Book = {
	title: '',
    id: '',
    isbn: [],
    asin: '',
	aliases: [],
	date: new Date().toISOString(),
	creation: new Date(), 
	updated: new Date(),
	links: [],
	urls: "",
	authors: [],
	locations: "",
	tags: [],
	publish: false,
	permalink: '', 
	description: '',
	image: '',
	cover: '',
    num_pages: 0,
    average_rating: 0,
    ratings_count: 0,
	cssclasses: [],
	rating: 0,
	emotion: 0,
	favorite: false
};