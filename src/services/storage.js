const STORAGE_KEY = 'home-library'

export function loadBooks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}
