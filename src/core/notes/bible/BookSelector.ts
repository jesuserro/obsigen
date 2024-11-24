export function scrollToBook(book: string, bookRefs: { [key: string]: HTMLDivElement | null }) {
    const bookElement = bookRefs[book];
    if (bookElement) {
        bookElement.scrollIntoView({ behavior: 'smooth' });
    }
}