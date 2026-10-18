# Home Library

A Vue.js app for managing a personal book collection. You search for books with
the Open Library API, add them to your library, mark them as read, rate them
and keep your favorites.

The library is saved in localStorage, so it's still there after a page refresh.

[Initial figma wireframe](https://www.figma.com/design/yBOpA2qJrBV7eMy5RrhZlx/Vue-Library-Readlist-Project?node-id=10-308&t=7Xm9bgs2vYFnJ7a5-0)

## Installation

```bash
git clone https://github.com/karel-ferraa/vue-book-readlist-website
cd vue-book-readlist-website
npm install
npm run dev
```

Then open http://localhost:5173 in your favorite browser.

## API used

[Open Library](https://openlibrary.org/developers/api) (thanks to internet archive)

- Search: `https://openlibrary.org/search.json?q={query}`
- Book details (description, publication date): `https://openlibrary.org/works/{id}.json`
- Covers: `https://covers.openlibrary.org/b/id/{coverId}-M.jpg`

## Pages

| Route | Page |
| --- | --- |
| `/library` | Home: the books in your library |
| `/favorites` | Only favorite books |
| `/explore` | Search Open Library |
| `/library/book/:id`, `/favorites/book/:id`, `/explore/book/:id` | Opens a book in a panel next to the grid |
