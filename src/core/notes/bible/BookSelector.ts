export function scrollToBook(book: string, bookRefs: { [key: string]: HTMLDivElement | null }) {
    const bookElement = bookRefs[book];
    if (bookElement) {
        bookElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
}

export function observeBookInView(bookRefs: { [key: string]: HTMLDivElement | null }, setSelectedBook: (book: string) => void) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const book = entry.target.getAttribute('data-book');
                    if (book) {
                        setSelectedBook(book);
                    }
                }
            });
        },
        { rootMargin: '0px 0px -90% 0px', threshold: 0 }
    );

    Object.values(bookRefs).forEach((bookElement) => {
        if (bookElement) {
            observer.observe(bookElement);
        }
    });

    return () => {
        observer.disconnect();
    };
}