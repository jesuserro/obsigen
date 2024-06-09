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
    review_id: string,
    isbn: string,
	date: Date,
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
    review_id: '',
    isbn: '',
	aliases: [],
	date: new Date(),
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
    goodreads_book_id: string,
    isbn: string,
    isbn13: string,
    asin: string,
	date: Date,
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
    text_reviews_count: number,
    country_code: string,
	cssclasses: string[],
	rating: number,
	emotion: number,
	favorite: boolean
}

export const DATA_YAML_BOOK_DEFAULT: Book = {
	title: '',
    goodreads_book_id: '',
    isbn: '',
    isbn13: '',
    asin: '',
	aliases: [],
	date: new Date(),
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
    text_reviews_count: 0,
    country_code: '',
	cssclasses: [],
	rating: 0,
	emotion: 0,
	favorite: false
};

export interface Author {
	title: string,
	aliases: string[],
    goodreads_id: string,
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
    country_code: string,
	cssclasses: string[],
	rating: number,
	emotion: number,
	favorite: boolean
}

export const DATA_YAML_AUTHOR_DEFAULT: Author = {
	title: '',
    goodreads_id: '',
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
    country_code: '',
	cssclasses: [],
	rating: 0,
	emotion: 0,
	favorite: false
};