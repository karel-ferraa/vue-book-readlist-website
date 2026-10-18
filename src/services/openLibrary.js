// Calls to the Open Library API: https://openlibrary.org/dev/docs/api/search

const API_URL = 'https://openlibrary.org'
const COVERS_URL = 'https://covers.openlibrary.org/b/id'

export function getCoverUrl(coverId, size = 'M') {
  return coverId ? `${COVERS_URL}/${coverId}-${size}.jpg` : null
}

export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    limit: 20,
    fields: 'key,title,author_name,first_publish_year,cover_i,subject',
  })
  const response = await fetch(`${API_URL}/search.json?${params}`)
  if (!response.ok) throw new Error('The search failed, please try again.')

  const data = await response.json()
  return data.docs.map((doc) => ({
    id: doc.key.replace('/works/', ''), // "/works/OL45804W" -> "OL45804W"
    title: doc.title,
    authors: doc.author_name ?? [],
    year: doc.first_publish_year ?? null,
    coverId: doc.cover_i ?? null,
    category: doc.subject?.[0] ?? null,
  }))
}

export async function getBookDetails(id) {
  const response = await fetch(`${API_URL}/works/${id}.json`)
  if (!response.ok) throw new Error('Could not load the book details.')

  const work = await response.json()
  const description = typeof work.description === 'string' ? work.description : work.description?.value
  return {
    title: work.title,
    description: cleanDescription(description ?? ''),
    publishDate: work.first_publish_date ?? null,
  }
}

// Descriptions often contain Markdown links and a "----------" section
// listing other editions: keep only the readable text.
function cleanDescription(text) {
  return text
    .split('----------')[0]
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim()
}
